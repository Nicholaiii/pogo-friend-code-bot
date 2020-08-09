import Code from './code'
import { Command as AbstractCommand } from '../lib/command'

export const commands: Map<String, AbstractCommand> = new Map([Code].flatMap(
    (command: AbstractCommand) => command.aliases.map((alias: string) => [alias, command])
))
