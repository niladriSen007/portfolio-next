import { resolve as resolveTs } from 'ts-node/esm'
import * as tsConfigPaths from 'tsconfig-paths'
import { pathToFileURL } from 'url'

const { absoluteBaseUrl, paths } = tsConfigPaths.loadConfig()
const matchPath = tsConfigPaths.createMatchPath(absoluteBaseUrl, paths)

export function resolve(specifier, context, defaultResolver) {
  const matched = matchPath(specifier)
  return matched 
    ? resolveTs(pathToFileURL(`${matched}`).href, context, defaultResolver)
    : resolveTs(specifier, context, defaultResolver)
}

export { load, transformSource } from 'ts-node/esm' 