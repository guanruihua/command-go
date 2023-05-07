const __execSync = require('child_process').execSync
const { getGitBranch, getPackage } = require('./util')
const { MultiSelect, Input } = require('enquirer')

const execSync = (command) => {
	console.log('Command: ', command)
	__execSync(command)
}

const defaultVersion = getPackage().version || '0.0.1'

async function GitCommand(version = defaultVersion) {
	try {

		const prompt = await new MultiSelect({
			name: 'Command',
			message: 'Select Commands',
			choices: [
				{ name: 'New Branch', value: 'branch' },
				{ name: 'Add Tag', value: 'tag' },
				{ name: 'Not Commit', value: 'notCommit' },
				{ name: 'Not Add', value: 'notAdd' },
				{ name: 'Not Push', value: 'notPush' },
			],
		})
		// prompt.clear()
		const res = await prompt.run()
		let branchName = getGitBranch() || 'main'
		let tagName = ''

		if (Array.isArray(res)) {

			if (!res.includes('notAdd')) execSync('git add .')

			if (!res.includes('notCommit')) {
				const commitMsg = await new Input({
					message: 'Input Commit Message',
				}).run();
				execSync(`git commit -m "${commitMsg}"`)
			}

			if (res.includes('branch')) {
				branchName = await new Input({
					message: 'Input Branch Name',
					default: version,
					initial: version,
				}).run();
				execSync('git branch -b ' + branchName)
			}

			if (res.includes('tag')) {
				tagName = await new Input({
					message: 'Input Tag Name',
					default: 'v' + version,
					initial: 'v' + version,
				}).run();
				execSync('git tag ' + commitMsg)
			}

			if (!res.includes('notPush')) {
				let command = 'git push -u origin'

				if (branchName !== '') command += ' ' + branchName
				if (tagName !== '') command += ' ' + tagName

				execSync(command)
			}
		}

	} catch (error) {
		console.error(error)
	}
}

module.exports = {
	GitCommand
}