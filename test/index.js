const path = require('path')
const { GitCommand } = require(path.resolve(__dirname, '../src'))
const { version } = require(path.resolve(__dirname, '../package.json'))

GitCommand(version)