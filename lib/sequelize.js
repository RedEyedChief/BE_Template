import Sequelize    from 'sequelize';
import config       from './config.js';

const dbMode = process.env.MODE === 'test' ? "test" : "development";
const { [dbMode]: credentials } = config;

const sequelize = new Sequelize({
    ...credentials,
    logging        : false,
    dialectOptions : {
        ssl            : !!process.env.LAMBDA,
        connectTimeout : 10000
    },
    pool : {
        min     : 0,
        max     : 10,
        idle    : 10000, // The maximum time, in milliseconds, that a connection can be idle before being released.
        acquire : 30000 // ..., that pool will try to get connection before throwing error
    },
    retry : { // Set of flags that control when a query is automatically retried.
        match : [
            /SequelizeConnectionError/,
            /SequelizeConnectionRefusedError/,
            /SequelizeHostNotFoundError/,
            /SequelizeHostNotReachableError/,
            /SequelizeInvalidConnectionError/,
            /SequelizeConnectionTimedOutError/,
            /TimeoutError/
        ],
        max : 4 // How many times a failing query is automatically retried.
    }
});

sequelize.Op = Sequelize.Op;
sequelize.DT = Sequelize.DataTypes;

export const DT = sequelize.DT;
export const Op = sequelize.Op;

export default sequelize;
