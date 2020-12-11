module.exports = (sequelize, DataTypes) => {
  const StoreAddress = sequelize.define(
    'StoreAddress',
    {
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subdistrict: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      district: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      province: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      zip_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'store_addresses',
    }
  );

  StoreAddress.associate = (models) => {
    StoreAddress.belongsTo(models.Owner, { foreignKey: 'store_id', allowNull: false });
  };

  return StoreAddress;
};
