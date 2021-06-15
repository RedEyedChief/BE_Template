import Base     from './Base.js';
import { DT }   from '../sequelize.js';

export default class Test extends Base {
    static schema = {
        id          : { type: DT.UUID, defaultValue: DT.UUIDV4, primaryKey: true, allowNull: false },
        name        : { type: DT.STRING, allowNull: true },
        description : { type: DT.STRING, allowNull: true },
        price       : { type: DT.STRING, allowNull: true }
    };

    static options = {};

    static initRelations() {

    }

    static initHooks() {

    }

}
