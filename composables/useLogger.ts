import { type ConsolaInstance, type ConsolaReporter, LogLevels, createConsola } from 'consola'

function timeReporter(time = Date.now()): ConsolaReporter {
  return {
    log: (msg) => {
      const timeSpent = Date.now() - time
      const message = timeSpent === 0 ? msg.args[0] : `${msg.args[0]} in ${timeSpent}ms`

      // eslint-disable-next-line no-console
      console.log(message)
    },
  }
}

export function useLogger(namaspace: string, useTimeReporter = false): ConsolaInstance {
  const logger = createConsola({
    level: LogLevels.info,
  }).withTag(namaspace)

  // INFO: experimental feature, it may be removed in the future
  if (useTimeReporter)
    logger.addReporter(timeReporter())

  return logger
}
