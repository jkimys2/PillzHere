const pillz = require ('../../models/pillz');
const router = require('express').Router();

// GET all pillz
router.get('/', (req, res) => {
  pillz.findAll()
    .then(pillzData => res.json(pillzData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET a single pill

router.get('/:id', (req, res) => {
    pillz.findOne({
        where: {
        id: req.params.id
        }
    })
        .then(pillzData => res.json(pillzData))
        .catch(err => {
        console.log(err);
        res.status(500).json(err);
        });
    }
);

// POST a new pill

router.post('/', (req, res) => {
    pillz.create({
        pill_name: req.body.pill_name,
        pill_quantity: req.body.pill_quantity,
        pill_dosage: req.body.pill_dosage,
        pill_category: req.body.pill_category,
        pill_frequency: req.body.pill_frequency,
        pill_time: req.body.pill_time,
        pill_notes: req.body.pill_notes,
        pillz_payment_type: req.body.pillz_payment_type,
        user_id: req.body.user_id
    })
        .then(pillzData => res.json(pillzData))
        .catch(err => {
        console.log(err);
        res.status(500).json(err);
        });
    }
);

// DELETE a pill
router.delete('/:id', (req, res) => {
  pillz.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(pillzData => res.json(pillzData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
    pillz.update(req.body, {
        where: {
        id: req.params.id
        }
    })
        .then(pillzData => res.json(pillzData))
        .catch(err => {
        console.log(err);
        res.status(500).json(err);
        });
    }
);


module.exports = router;
