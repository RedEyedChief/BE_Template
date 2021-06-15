import Test         from './Test.js';
import sequelize    from '../sequelize.js';

export default function initAllModels() {
    const models = {
        Test
    };

    Object.values(models).forEach(model => {
        model.init(sequelize);
        model.initRelationsAndHooks();
    });

    return models;
}
