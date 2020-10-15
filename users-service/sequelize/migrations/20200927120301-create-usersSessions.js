module.exports.up = (queryInterface, DataTypes) => {

    return queryInterface.createTable("usersSessions", {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID
        },
        userId: {
            allowNull: false,
            references: {
                key: "id",
                model: "users"
            },
            type: DataTypes.UUID
        },
        expiredAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        }

    },
    {
        charset: "utf8"
    }
    )
}