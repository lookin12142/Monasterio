import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phonenumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dni: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isadmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  modules: {
    type: DataTypes.JSONB,
    defaultValue: {
      ventas: { access: false, reposteria: false, manualidades: false },
      alquiler: { access: false, santaCatalina: false, santaTeresa: false, goyoneche: false },
      monasterio: { access: false },
      museo: { access: false },
      administrador: { access: false, reposteria: false, manualidades: false, misa: false }
    }
  }
});

export default User;
