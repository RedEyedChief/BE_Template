import Test         from '../../lib/models/Test';
import sequelize    from '../../lib/sequelize';

class TestFactory {
    constructor() {
        const dbName = sequelize.config.database;
        // Additonal protection against running test on production db

        if (!dbName.match(/test/i)) {
            throw new Error(`DATABASE NAME [${dbName}] DOES NOT HAVE "test" IN ITS NAME`);
        }
    }

    async cleanup() {
        try {
            return await this._dropDatabase();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async _dropDatabase() {
        await Test.destroy({ where: {}, force: true });

        return Promise.resolve();
    }
}

export default new TestFactory();
