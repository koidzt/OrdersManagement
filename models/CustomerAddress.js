module.exports = (sequelize, DataTypes) => {
  const CustomerAddress = sequelize.define(
    'CustomerAddress',
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
      tableName: 'customer_addresses',
      timestamps: false,
    }
  );

  CustomerAddress.associate = (models) => {
    CustomerAddress.belongsTo(models.Owner, { foreignKey: 'customer_id', allowNull: false });
  };

  return CustomerAddress;
};
