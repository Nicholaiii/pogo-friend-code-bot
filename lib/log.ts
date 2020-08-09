import Cabin from 'cabin'
import Pino from 'pino'
import signale from 'signale'

const { Signale } = signale

const pino = Pino({
  customLevels: {
    log: 30
  },
  hooks: {
    // <https://github.com/pinojs/pino/blob/master/docs/api.md#logmethod>
    logMethod(inputArgs, method) {
      return method.call(this, {
        // <https://github.com/pinojs/pino/issues/854>
        // message: inputArgs[0],
        msg: inputArgs[0],
        meta: inputArgs[1]
      })
    }
  }
})

export default new Cabin({
  // (optional: your free API key from https://cabinjs.com)
  // key: 'YOUR-CABIN-API-KEY',
  axe: {
    logger: process.env.NODE_ENV === 'production' ? pino : new Signale()
  }
})
