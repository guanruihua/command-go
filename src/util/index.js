const path = require('path')
const { execSync } = require('child_process')

module.exports.getGitHash = function () {
	return execSync('git rev-parse --short HEAD', { logCommand: false, logResult: false }).toString()
}

// 获取当前分支名称
module.exports.getGitBranch = function () {
	return execSync('git rev-parse --abbrev-ref HEAD', { logCommand: false, logResult: false }).toString()
}

module.exports.getPackage = function () {
	try {
		return require(path.resolve(process.cwd(), 'package.json')) || {}
	} catch (error) {
		return {}
	}
}