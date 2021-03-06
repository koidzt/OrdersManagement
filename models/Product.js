module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      unit: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      tableName: 'products',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  Product.associate = (models) => {
    Product.hasMany(models.ProductList, { foreignKey: 'product_id' });
  };

  return Product;
};
