module.exports = (sequelize, DataTypes) => {
  const ProductList = sequelize.define(
    'ProductList',
    {
      discount: {
        type: DataTypes.DOUBLE,
      },
      quantity: {
        type: DataTypes.DOUBLE,
      },
      amount: {
        type: DataTypes.DOUBLE,
      },
      vat: {
        type: DataTypes.DOUBLE,
      },
      price_in_vat: {
        type: DataTypes.DOUBLE,
      },
      amount_in_vat: {
        type: DataTypes.DOUBLE,
      },
    },
    {
      tableName: 'product_lists',
      timestamps: true,
    }
  );

  ProductList.associate = (models) => {
    ProductList.belongsTo(models.Product, { foreignKey: 'product_id', allowNull: false });
    ProductList.belongsTo(models.SalesOrder, { foreignKey: 'sales_order_id', allowNull: false });
  };

  return ProductList;
};
