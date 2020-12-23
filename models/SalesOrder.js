module.exports = (sequelize, DataTypes) => {
  const SalesOrder = sequelize.define(
    'SalesOrder',
    {
      so: {
        type: DataTypes.STRING(8),
        allowNull: false,
        unique: true,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: new Date(),
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
        type: DataTypes.INTEGER(3),
        defaultValue: 0,
      },
      vat: {
        type: DataTypes.INTEGER(3),
        defaultValue: 7,
      },
      total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      total_ex_vat: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      total_in_vat: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(['Pending Approval', 'Approved', 'Cancel']),
        allowNull: false,
        defaultValue: 'Pending Approval',
      },
    },
    {
      tableName: 'sales_orders',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  SalesOrder.associate = (models) => {
    SalesOrder.belongsTo(models.User, { foreignKey: 'user_id', allowNull: false });
    SalesOrder.belongsTo(models.Customer, { foreignKey: 'customer_id', allowNull: false });
    SalesOrder.hasMany(models.ProductList, { foreignKey: 'sales_order_id' });
  };

  return SalesOrder;
};
