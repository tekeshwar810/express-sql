module.exports = (sequelize, DataTypes) => {
    const Comapaney = sequelize.define("companeys", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        companeyName: {
            type: DataTypes.STRING,
        },
        companeyEmail: {
            type: DataTypes.STRING
        },
        companeyPhone: {
            type: DataTypes.STRING
        },
        companeyAddress: {
            type: DataTypes.STRING
        },
        companeyDoc: {
            type: DataTypes.STRING,
            get() {
                const rawValue = this.getDataValue('companeyDoc');
                if (!rawValue) return null;
                return `http://${process.env.HOST}:${process.env.PORT}/${rawValue}`;
            }
        },
        user: {
            type: DataTypes.INTEGER
        },
    },{
        paranoid: true
    });
    return Comapaney;
};