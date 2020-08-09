import { Message, Client } from 'discord.js'

export abstract class Command {
  abstract aliases: String[]
  abstract async execute (message: Message, client: Client): Promise<void>
}
