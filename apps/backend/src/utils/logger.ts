//pino logger singleton with pretty print, and dev/prod modes
import pino from 'pino';

const isProduction = process.env.NODE_ENV === 'production';

const logger = pino({
  level: isProduction ? 'info' : 'debug',
  transport: isProduction
    ? undefined
    : {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
        },
      },
});

export { logger };
