module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define(
    'Store',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contact: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING(10),
      },
      tel: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      payment_term: {
        type: DataTypes.STRING,
      },
      credit_term: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'stores',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  Store.associate = (models) => {
    Store.belongsTo(models.User, { foreignKey: 'user_id', allowNull: false });
    Store.hasOne(models.Owner, { foreignKey: 'store_id' });
    Store.hasMany(models.StoreAddress, { foreignKey: 'store_id' });
    Store.hasMany(models.SaleOrder, { foreignKey: 'store_is' });
  };
  return Store;
};
