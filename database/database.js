const sequelize = require('sequelize')

const connection = new sequelize ('av1', 'root', '123', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
})

module.exports = connection