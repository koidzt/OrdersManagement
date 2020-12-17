module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    'Customer',
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
      tableName: 'customers',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  Customer.associate = (models) => {
    Customer.belongsTo(models.User, { foreignKey: 'user_id', allowNull: false });
    Customer.hasOne(models.Owner, { foreignKey: 'customer_id' });
    Customer.hasMany(models.CustomerAddress, { foreignKey: 'customer_id' });
    Customer.hasMany(models.SalesOrder, { foreignKey: 'customer_id' });
  };
  return Customer;
};
