const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagsData = await Tag.findAll({
      include: [{model: Product}]
    })
    console.log(tagsData);
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
    console.log({message: 'error try again later'});
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
   // be sure to include its associated Products
   try {
    const tagsData = await Tag.findByPk(req.params.id, {
      include: [{model: Product}],
    });

    if (!tagsData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json({message: 'Server issue please try again'});
  }
});

router.post('/', async (req, res) => {
  try {
    const tagsData = await Tag.create(req.body);
    res.status(200).json(tagsData)
  } catch (err) {
    res.status(400).json({message: 'error updating please try again'});
  }
  });

  router.put('/:id', async (req, res) => {
    try {
      const tagId = req.params.id;
      const updatedTagsData = req.body; 
  
      const [numberOfUpdatedRows, updatedTag] = await Tag.update(updatedTagsData, {
        where: { id: tag_id },
        returning: true,
      });
  
      if (numberOfUpdatedRows === 0) {
        return res.status(404).json({ message: 'Tag not found' });
      }
  
      res.status(200).json(updatedTag);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
      console.log(err);
    }
  });
  

router.delete('/:id', async (req, res) => {
  try {
    const tagsDelete = await Tag.destroy({
      where: {id: req.params.id}})
    if (!tagsDelete){
       res.status(404).json({message: 'No category found with this id'});
  return;
    }
   res.status(200).json({tagsDelete})
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
  });

module.exports = router;
