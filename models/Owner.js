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
      tel: {
        type: DataTypes.STRING(10),
      },
    },
    {
      tableName: 'owners',
    }
  );

  Owner.associate = (models) => {
    Owner.belongsTo(models.Store, { foreignKey: 'store_id', allowNull: false });
    Owner.hasOne(models.OwnerAddress, { foreignKey: 'owner_id' });
  };

  return Owner;
};
