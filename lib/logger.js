import winston  from 'winston';
import path  from 'path';

const { combine, timestamp, prettyPrint, printf } = winston.format;

const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.File({
            level: 'error',
            filename: './logs/error.log',
            format: combine(
                timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                printf(info => `[${info.timestamp}] ${info.level}: ${JSON.stringify(info.message)}`)
            )
        }),
        new winston.transports.File({
            level: 'info',
            filename: './logs/combined.log',
            format: combine(
                timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                printf(info => `[${info.timestamp}] ${info.level}: ${JSON.stringify(info.message)}`)
            )
        })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        json: true,
        colorize: true,
        format: combine(
            timestamp(),
            prettyPrint()
        )
    }))
}

export default logger;
