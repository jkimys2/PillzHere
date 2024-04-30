const user = require('../../models/user');
const router = require('express').Router();


// GET all users
router.get('/', (req, res) => {
  user.findAll()
    .then(userData => res.json(userData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET a single user
router.get('/:id', (req, res) => {
  user.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(userData => res.json(userData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST a new user

router.post('/', (req, res) => {
    user.create({
        username: req.body.username,
        password: req.body.password
    })
        .then(userData => res.json(userData))
        .catch(err => {
        console.log(err);
        res.status(500).json(err);
        });
    }
);

// DELETE a user
router.delete('/:id', (req, res) => {
  user.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(userData => res.json(userData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;