import log from './lib/log'
import { setupClient } from './lib/client'
import { setupDb } from './lib/mongoose'
import uncaught from 'uncaught'

uncaught.start()
uncaught.addListener(function (error: Error) {
  log.fatal(`Uncaught error or rejection: ${error.message}`)
  process.exit(1)
})

try {
  await Promise.all([
    setupClient(),
    setupDb()
  ])
} catch (error) {
  log.error(error)
}
