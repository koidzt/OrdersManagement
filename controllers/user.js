const db = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { code, email, password, first_name, last_name, department, position, area_code } = req.body;
    const targetUser = await db.User.findOne({ where: { email } });

    if (targetUser) {
      res.status(400).send({ message: 'Email already taken.' });
    } else {
      const salt = bcryptjs.genSaltSync(Number(process.env.SALT_ROUND));
      const hashedPW = bcryptjs.hashSync(password, salt);
      await db.User.create({
        code,
        email,
        password: hashedPW,
        first_name,
        last_name,
        department,
        position,
        area_code,
      });

      res.status(201).send({ message: 'User created.' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const targetUser = await db.User.findOne({ where: { email, is_active: true } });

    if (!targetUser) {
      res.status(400).send({ message: 'Username or password incorrect.' });
    } else {
      const isCorrect = await bcryptjs.compareSync(password, targetUser.password);

      if (!isCorrect) {
        res.status(400).send({ message: 'Username or password incorrect.' });
      } else {
        const payload = {
          id: targetUser.id,
          code: targetUser.code,
          department: targetUser.department,
          position: targetUser.position,
          area_code: targetUser.area_code,
          created_at: new Date(),
        };
        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '30d' });

        res.status(200).send({ token });
      }
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const isCorrect = await bcryptjs.compareSync(oldPassword, req.user.password);
    if (!isCorrect) {
      res.status(400).send({ message: 'Password is wrong!' });
    } else {
      if (newPassword !== confirmPassword) {
        res.status(400).send({ message: 'Password not match.' });
      } else {
        const salt = bcryptjs.genSaltSync(Number(process.env.SALT_ROUND));
        const hashedPassword = bcryptjs.hashSync(newPassword, salt);
        await req.user.update({ password: hashedPassword });
        res.status(200).send({ message: 'Password has been changed.' });
      }
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  register,
  login,
  changePassword,
};
