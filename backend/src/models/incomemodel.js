import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Product from './productmodel.js'; 

const Income = sequelize.define('Income', {
  id_producto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product, 
      key: 'id' 
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  total_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('reposteria', 'manualidades'),
    allowNull: false
  }
});

Product.hasMany(Income, { foreignKey: 'id_producto' });
Income.belongsTo(Product, { foreignKey: 'id_producto' });

export default Income;
