import {
  NestTransportLogger,
  DefaultTransportConsole,
} from 'nest-logging-transport';

export const customLogger = new NestTransportLogger({
  transports: [new DefaultTransportConsole('ecpc')],
});
