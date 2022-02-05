const { DataTypes } = require('sequelize');

const Tag = async (sequelize) => {
    sequelize.define("Tag", {
        id: {
            type: DataTypes.STRING(30),
            primaryKey: true,
            validate: {
                notEmpty: true
            }
        },
        credits: {
            type: DataTypes.DOUBLE(),
        },
	},
    {
        timestamps: false
    })
};

module.exports = Tag;
