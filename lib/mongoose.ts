import mongoose from 'mongoose'
import log from './log'
import config from '../configuration'

export async function setupDb () {

  const db = mongoose.connection

  db.on('error', (error: Error) => {
    log.error(error)
  })

  db.once('open', () => {
    log.success('Mongoose connected.')
  })

  await mongoose.connect(config.dbUrl,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
}
