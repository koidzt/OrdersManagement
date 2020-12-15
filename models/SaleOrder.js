module.exports = (sequelize, DataTypes) => {
  const SaleOrder = sequelize.define(
    'SaleOrder',
    {
      so: {
        type: DataTypes.STRING(8),
        allowNull: false,
        unique: true,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      po: {
        type: DataTypes.STRING,
      },
      payment_term: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      credit_term: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      discount: {
        type: DataTypes.DOUBLE,
      },
      total: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
    },
    {
      tableName: 'sale_orders',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updates_at',
    }
  );

  SaleOrder.associate = (models) => {
    SaleOrder.belongsTo(models.User, { foreignKey: 'user_id', allowNull: false });
    SaleOrder.belongsTo(models.Customer, { foreignKey: 'customer_id', allowNull: false });
    SaleOrder.hasMany(models.ProductList, { foreignKey: 'sale_order_id' });
  };

  return SaleOrder;
};
