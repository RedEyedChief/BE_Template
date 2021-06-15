import Sequelize from 'sequelize'

export default class Base extends Sequelize.Model {
    static init (sequelize) {
        super.init(this.schema, { ...this.options, sequelize });
    }

    static initRelationsAndHooks() {
        if (this.initRelations) this.initRelations();
        if (this.initHooks) this.initHooks();
    }
}
