module.exports = (sequelize, DataTypes) => {
  const OwnerAddress = sequelize.define(
    'OwnerAddress',
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
      tableName: 'owner_addresses',
      timestamps: false,
    }
  );

  OwnerAddress.associate = (models) => {
    OwnerAddress.belongsTo(models.Owner, { foreignKey: 'owner_id', allowNull: false });
  };

  return OwnerAddress;
};
