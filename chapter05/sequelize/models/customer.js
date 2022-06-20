module.exports = (sequelize, DataTypes) => {
    const newCustomer = sequelize.define("new_customer", {   // define table name
        name: {   // create column
            type: DataTypes.STRING(20),   // define data type
            allowNull: false   // define Null permition
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        sex: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        joined_date: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
    }, {
        timestamps: false
    });
    return newCustomer;
};
