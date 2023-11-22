const sequelize = require("sequelize");
const connection = require("../database/database");


const Lab = connection.define('labs', {
    name:{
        type: sequelize.STRING,
        allowNull:false
    },
    seats:{
        type: sequelize.INTEGER ,
        allowNull:false

    },
    status:{
        type: sequelize.BOOLEAN,
        defaultValue: false
    },
    tutor:{
        type: sequelize.STRING,
        defaultValue: ""
    }
})

Lab.sync({force:false});




module.exports = Lab;