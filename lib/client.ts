import Discord from 'discord.js'
import config from '../configuration'
import log from './log'

import { commands } from '../commands'

export function setupClient () {
  const client = new Discord.Client()

  if (!config.token) {
    log.fatal(new Error('No bot token provided'))
    process.exit(1)
  }

  client.on('ready', () => {
    log.success('Discord connected.')
  })

  client.on('message', message => {
    if (message.author.bot) return log.debug('Disregarding bot message.')
    log.info(`Message from ${message.author.username}`)

    const keyword = message.content.split(' ')[0].substr(1)

    const command = commands.get(keyword)
    if (command) return command.execute(message, client)

    log.debug(`No result for ${keyword}`)
  })

  client.login(config.token)
}
