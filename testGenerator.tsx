import * as ts from 'typescript';
import * as fs from 'fs';
import axios from 'axios';
import path from 'path';

interface FunctionDetails {
  name: string;
  parameters: string[];
  returnType: string;
  sourceCode: string;
}

class TestCaseGenerator {
  private readonly apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private parseTypeScriptFile(filePath: string): FunctionDetails[] {
    const sourceCode = fs.readFileSync(filePath, 'utf-8');
    const sourceFile = ts.createSourceFile(
      filePath, 
      sourceCode, 
      ts.ScriptTarget.Latest, 
      true
    );

    const functionDetails: FunctionDetails[] = [];

    function extractFunctionDetails(node: ts.Node) {
      if (ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node)) {
        const functionName = node.name?.getText() ?? 'UnnamedFunction';
        const parameters = node.parameters.map(param => 
          param.name.getText()
        );

        const returnType = node.type 
          ? node.type.getText() 
          : 'any';

        functionDetails.push({
          name: functionName,
          parameters,
          returnType,
          sourceCode: node.getText()
        });
      }

      ts.forEachChild(node, extractFunctionDetails);
    }

    extractFunctionDetails(sourceFile);
    return functionDetails;
  }

  async generateTestCases(componentPath: string): Promise<string> {
    const functions = this.parseTypeScriptFile(componentPath);

    const prompt = functions.map(func => `
      Generate Jest and React Testing Library test cases for:
      Function Name: ${func.name}
      Parameters: ${func.parameters.join(', ')}
      Return Type: ${func.returnType}
      Source Code:
      ${func.sourceCode}
    `).join('\n\n');

    try {
      const response = await axios.post(
        'https://api.deepseek.com/v1/chat/completions',
        {
          model: "deepseek-chat",
          messages: [
            {
              role: "system", 
              content: "You are an expert in writing Jest and React Testing Library tests."
            },
            { 
              role: "user", 
              content: prompt 
            }
          ]
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  }

  saveTestFile(testCases: string, originalPath: string) {
    const testFilePath = originalPath.replace(/\.tsx?$/, '.test.tsx');
    fs.writeFileSync(testFilePath, testCases);
    console.log(`Test file generated: ${testFilePath}`);
  }
}

async function main() {
  const generator = new TestCaseGenerator(process.env.DEEPSEEK_API_KEY!);
  const componentPath = path.resolve('./src/components/SkillCard.tsx');
  
  try {
    const testCases = await generator.generateTestCases(componentPath);
    generator.saveTestFile(testCases, componentPath);
  } catch (error) {
    console.error('Test generation failed:', error);
  }
}

main();