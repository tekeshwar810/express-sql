const { ref } = require("joi");

module.exports = (sequelize, DataTypes) => {
    const companeyUsers = sequelize.define("companeyUser", {
        companeyId:{
            type: DataTypes.INTEGER,
            references:{
                model:"companeys",
                key:"id"
            }
        },
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        image: {
            type: DataTypes.STRING,
            get() {
                const rawValue = this.getDataValue('image');
                if (!rawValue) return null;
                return `http://${process.env.HOST}:${process.env.PORT}/${rawValue}`;
            }
        },
    });
    return companeyUsers;
};