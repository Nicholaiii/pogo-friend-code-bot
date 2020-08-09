import { Command } from '../lib/command'
import { makeQR } from '../lib/qr'
import { Message, Client, MessageAttachment, MessageEmbed, User as DiscordUser } from 'discord.js'
import User from '../models/user'

const ball = 'https://emoji.gg/assets/emoji/pokeball_light.png'
const prettifyCode = (code: string) => `${code.slice(0,4)} ${code.slice(4,8)} ${code.slice(8, 12)}`

class Code extends Command {
  aliases = ['code']
  async execute (message: Message, client: Client): Promise<void> {
    if (message.mentions.users.size > 0) return await this.getCode(message)
    if (message.content.trim().split(' ').slice(1).length === 0) return await this.help(message)
    await this.setCode(message)
  }

  async getCode (message: Message): Promise<void> {
    const mentionedUser = message.mentions.users.first()
    const user = await User.findByUid(mentionedUser.id)

    if (!user) {
      message.channel.send([`${message.mentions.users.first().toString()} hasn't set their code yet!`, 'They can do this by typing `!code XXXX XXXX XXXX`'])
      return
    }

    const code = '123412341234'

    const qr = await makeQR(code)
    await message.channel.send(`${code} <@${message.author.id}>`, this.makeEmbed(code, qr, mentionedUser, message.author))
  }

  async setCode (message: Message): Promise<void>  {
    const parts = message.content.split(' ')
    const code = parts.slice(1).join('')

    if (code.length !== 12) {
      await message.channel.send('Woops! That\'s not a proper code. Please make sure to use exactly 12 numbers.')
      return
    }

    await User.setCode(message.author.id, code)
    await message.channel.send(`Your code is now saved as ${prettifyCode(code)}!`)
  }

  makeEmbed (code: string, qr: string, user: DiscordUser, requester: DiscordUser) {
    const attachment = new MessageAttachment(Buffer.from(qr.split(',')[1], 'base64'), `${code}.png`)
    const prettyCode = prettifyCode(code)

    const embed = new MessageEmbed()
      .setColor('BLUE')
      .attachFiles([attachment])
      .setImage(`attachment://${code}.png`)
      .setTitle(prettyCode)
      .setAuthor(user.username, user.avatarURL())
      .setFooter(`Requested by ${requester.tag}`, requester.avatarURL())
      .setDescription('You can copy the code and paste it into Pokemon GO, or scan this QR to add the player.')

    return embed
  }

  async help (message: Message) {
    await message.channel.send([
      'Set your code by typing `!code XXXX XXXX XXXX`',
      'Get someone\'s code by typing `!code @discord_name`'
    ])
  }
}

export default new Code()
