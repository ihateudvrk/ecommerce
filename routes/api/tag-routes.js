const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    attributes: ['id'],
    include: [{
      model: Product,
        attributes: ['id', 'product_name']
    }],
  })
  .then(tagData => res.json(tagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    attributes: ['id', 'tag_name'],
    include: [{
      model: Product,
        attributes: ['id', 'product_name']
    }],
  })
  .then(tagData => res.json(tagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
    .then((tagData) => {
      res.json(tagData);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    tag_name: req.body.tag_name
  })
  .then((tagData) => {
    res.json(tagData);
  })
  .catch((err) => {
    res.json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    Tag_name: req.body.Tag_name
  })
  .then((tagData) => {
    res.json(tagData);
  })
  .catch((err) => {
    res.json(err);
  });
});

module.exports = router;
