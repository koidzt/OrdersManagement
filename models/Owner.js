module.exports = (sequelize, DataTypes) => {
  const Owner = sequelize.define(
    'Owner',
    {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id_card: {
        type: DataTypes.STRING(13),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(10),
      },
    },
    {
      tableName: 'owners',
      timestamps: false,
    }
  );

  Owner.associate = (models) => {
    Owner.belongsTo(models.Customer, { foreignKey: 'customer_id', allowNull: false });
    Owner.hasOne(models.OwnerAddress, { foreignKey: 'owner_id' });
  };

  return Owner;
};
