import morgan from 'morgan';
import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';
import fs from 'fs';

const { combine, timestamp, prettyPrint } = format;

const fileRotateTransport = new transports.DailyRotateFile({
  filename: 'logs/combined-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
});

const systemLog = (userEmail?: string) => {
  if (userEmail)
    fs.mkdir(__dirname + `logs/${userEmail}/exceptions.log`, (err: NodeJS.ErrnoException | null) => {
      err ? console.error(err) : null;
    });

  return createLogger({
    level: 'http',

    format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS A' }), prettyPrint()),

    transports: [fileRotateTransport, new transports.File({ filename: 'logs/error.log', level: 'error' })],

    exceptionHandlers: [new transports.File({ filename: userEmail ? `logs/${userEmail}/exceptions.log` : 'logs/exceptions.log' })],
    rejectionHandlers: [new transports.File({ filename: userEmail ? `logs/${userEmail}/rejections.log` : 'logs/rejections.log' })],
  });
};

export const systemLogs =  systemLog();
export const morganMiddleware = morgan(
  function (tokens, req, res) {
    return JSON.stringify({
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: Number(tokens.status(req, res)),
      content_length: Number(tokens.res(req, res, 'content-length')),
      response_time: Number(tokens['response-time'](req, res)),
    });
  },
  {
    stream: {
      write: (message) => {
        const data = JSON.parse(message);
        systemLog().http(`incoming-request`, data);
      },
    },
  }
);
