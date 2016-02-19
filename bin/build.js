import program from 'commander'
import path from 'path'

import packageJson from '../package.json'

// Use compiled version of code when installed globally, otherwise use
// babelscript version.
let build
if (require('./published')) {
  build = require('../dist/utils/build')
} else {
  build = require('../lib/utils/build')
}

program
  .version(packageJson.version)
  .option('--prefix-links', 'Build site with links prefixed (set prefix in your config).')
  .parse(process.argv)

let relativeDirectory = program.args[0]
if (!relativeDirectory) {
  relativeDirectory = '.'
}
const directory = path.resolve(relativeDirectory)

program.directory = directory
program.relativeDirectory = relativeDirectory

build(program, (err) => {
  if (err) {
    throw err
  } else {
    console.log('Done')
  }
})
