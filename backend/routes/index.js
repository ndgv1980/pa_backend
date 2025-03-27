var express = require('express');
var router = express.Router();
const Habit = require('../models/habit');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado.' });
  }

  try {
    const tokenWithoutBearer = token.replace("Bearer ", "");
    const verified = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch(error) {
    console.error(error);
    res.status(403).json({error: 'Token inválido o expirado.'});
  }
};
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/habits', authenticateToken, async function(req, res, next) {
  try {
    let userId = req.user && req.user.userId ? req.user.userId : res.status(500).json({message: 'Error retrieving habits.'});
    const habits = await Habit.find({'userId': new mongoose.Types.ObjectId(userId)});
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post('/habits', authenticateToken, async function(req, res, next) {
  try {
    const { title, description } = req.body;
    let userId = req.user && req.user.userId ? req.user.userId : res.status(500).json({message: 'Error adding habit.'});
    userId = new mongoose.Types.ObjectId(userId);
    const habit = await Habit.create({ title, description, userId });
    await habit.save();
    res.json(habit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
})
router.delete('/habits/:id', authenticateToken, async function(req, res) {
  try {
    await Habit.findByIdAndDelete(req.params.id);
    res.json({ message: 'Habit deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
})
router.patch('/habits/markasdone/:id', authenticateToken, async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    habit.lastDone = new Date();
    if (timeDifferenceInHours(habit.lastDone, habit.lastUpdate) < 24) {
      habit.days = timeDifferenceInDays(habit.lastDone, habit.startedAt) + 1;
      habit.lastUpdate = new Date();
      await habit.save();
      res.status(200).json({'message': 'Habit marked as done'});
    } else {
      habit.days = 1;
      habit.lastUpdate = new Date();
      await habit.save();
      res.status(200).json({'message': 'Habit restarted'});
    }
  } catch (err) {
    res.status(500).json({ 'message' : 'Habit not found' });
  }
})

const timeDifferenceInHours = (date1, date2) => {
  const diffMs = Math.abs(date1 - date2);
  return diffMs / (1000 * 60 * 60);
}
const timeDifferenceInDays = (date1, date2) => {
  return Math.floor(timeDifferenceInHours(date1, date2) / 24);
}
module.exports = router;
