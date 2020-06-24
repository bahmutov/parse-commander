const commander = require('commander')
const program = new commander.Command()

const descriptions = {
  browser: 'browser name',
  ciBuildId: 'ci build id',
  config: 'config values'
}

const text = (description) => {
  if (!descriptions[description]) {
    throw new Error(`Could not find description for: ${description}`)
  }

  return descriptions[description]
}

// bug in commander not printing name
// in usage help docs
program._name = 'demo'

program.usage('<command> [options]')

program
.command('help')
.description('Shows CLI help and exits')
.action(() => {
  program.help()
})

program
.command('run')
.usage('[options]')
.description('Runs the demo')
.option('-b, --browser <browser-name-or-path>', text('browser'))
.option('--ci-build-id <id>', text('ciBuildId'))
.option('-c, --config <config>', text('config'))
.action((...fnArgs) => {
  console.log('running Cypress with args %o', fnArgs[0].browser)
})

program.parse(process.argv)
