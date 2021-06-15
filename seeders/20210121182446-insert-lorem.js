module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tests', [
        {
            id: '71fc522d-d6ad-4fc5-894a-4502d3a6285c',
            name: 'LOREM',
            description: 'ipsum',
            price: 42,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: '71fc522d-d6ad-4fc5-894a-4502d3a6285a',
            name: 'qwe',
            description: 'zxc',
            price: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tests', null, {});
  }
};
