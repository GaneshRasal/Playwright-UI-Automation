import winston from "winston";

const customFormat = winston.format.combine(
   winston.format.colorize(),
   winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
   winston.format.printf(({ timestamp, level, message}) =>{
     return `[${timestamp}] ${level}: ${message}`;
   })
);

export const logger = winston.createLogger({
  level:'info',
  format:customFormat,
  transports:[
    new winston.transports.Console()
]
});