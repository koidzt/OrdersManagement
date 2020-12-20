module.exports = (sequelize, DataTypes) => {
  const ProductList = sequelize.define(
    'ProductList',
    {
      quantity: {
        type: DataTypes.DECIMAL(10, 2),
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
      },
      price_in_vat: {
        type: DataTypes.DECIMAL(10, 2),
      },
      amount_in_vat: {
        type: DataTypes.DECIMAL(10, 2),
      },
    },
    {
      tableName: 'product_lists',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  ProductList.associate = (models) => {
    ProductList.belongsTo(models.Product, { foreignKey: 'product_id', allowNull: false });
    ProductList.belongsTo(models.SalesOrder, { foreignKey: 'sales_order_id', allowNull: false });
  };

  return ProductList;
};
