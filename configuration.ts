import nodeConfig from 'config'
import { Snowflake } from 'discord.js'

export interface Config {
  token: string
  dbUrl: string
}

const config: Config = {
  token: nodeConfig.get<string>('token'),
  dbUrl: nodeConfig.get<string>('dbUrl')
}

export default config
