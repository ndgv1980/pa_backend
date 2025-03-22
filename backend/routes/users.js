var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', async (req, res, next) => {
  try {
    const {username, password} = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({username, password: hashedPassword});
    await newUser.save();

    res.status(201).json({'message': 'Usuario registrado correctamente'});
  } catch (error) {
    console.log(error);
    res.status(500).json({'error':'Error en el registro', 'description': error.toString()})
  }
});
router.post('/login', async (req, res, next) => {
  try {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    if (!user) return res.status(400).json({'error': 'Usuario no encontrado'});
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({'error': 'Contraseña incorrecta'});

    const token = jwt.sign({'userId': user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
  
    res.cookie('habitToken', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días
    });
    res.json({'message': 'Inicio de sesión exitoso', token});
  } catch (error) {
    res.status(500).json({'error': 'Error en el login', 'description': error.toString() })
  }
});
module.exports = router;