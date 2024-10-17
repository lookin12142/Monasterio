import bcrypt from 'bcrypt';
import User from '../models/usermodel.js';

export const createUser = async (req, res) => {
  const { name, phoneNumber, dni, email, password, modules } = req.body;
s
  try {
    let user = await User.findOne({ 
      where: {
        [sequelize.Op.or]: [{ email }, { dni }]
      }
    });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = await User.create({
      name,
      phoneNumber,
      dni,
      email,
      password: hashedPassword,
      modules
    });

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};