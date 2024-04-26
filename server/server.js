const express = require('express');
const db = require('./config/connection');
// Require model
//const {  } = require('./models');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.post('/', (req, res) => {
//   const newGenre = new ({ name: req.params.genre });
//   newGenre.save();
//   if (newGenre) {
//     res.status(200).json(newGenre);
//   } else {
//     console.log('Uh Oh, something went wrong');
//     res.status(500).json({ message: 'something went wrong' });
//   }
// });

// app.get('/', async (req, res) => {
//   try {
//     const result = await Genre.find({});
//     res.status(200).json(result);
//   } catch (err) {
//     console.log('Uh Oh, something went wrong');
//     res.status(500).json({ message: 'something went wrong' });
//   }
// });

// app.get('/', async (req, res) => {
//   try {
//     const result = await Genre.findOne({ name: 'Kids' });
//     res.status(200).json(result);
//   } catch (err) {
//     console.log('Uh Oh, something went wrong');
//     res.status(500).json({ message: 'something went wrong' });
//   }
// });

// app.delete('/', async (req, res) => {
//   try {
//     const result = await .findOneAndDelete({ name: req.params.genre });
//     res.status(200).json(result);
//     console.log(`Deleted: ${result}`);
//   } catch (err) {
//     console.log('Uh Oh, something went wrong');
//     res.status(500).json({ message: 'something went wrong' });
//   }
// });

// app.put('/', async (req, res) => {

// });

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
