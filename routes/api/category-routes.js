const router = require('express').Router();
const { createSchema } = require('../../config/connection');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    attributes: ['id', 'category_name'],
    include: [{
        model: Product,
        attributes: ['id', 'product_name', 'price']
      }]
  })
  .then(categoryData => res.json(categoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  // TODO: Where clause, Look at find bypk 13-6-stu routes
  Category.findByPk(req.params.id, {
    include: [{
      model: Product,
      attributes: ['id', 'product_name', 'price']
    }]
  })
  .then((categoryDataData) => {
    res.json(categoryDataData);
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
    .then((categoryData) => {
      res.json(categoryData);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    category_name: req.body.category_name
  })
  .then((categoryData) => {
    res.json(categoryData);
  })
  .catch((err) => {
    res.json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    category_name: req.body.category_name
  })
  .then((categoryData) => {
    res.json(categoryData);
  })
  .catch((err) => {
    res.json(err);
  });
});

module.exports = router;
