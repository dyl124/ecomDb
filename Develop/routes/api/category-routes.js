const router = require('express').Router();
const { Category, Product } = require('../../models');
const sequelize = require('sequelize');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{model: Product}]
    })
          
       

    
    console.log(categoryData);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
    console.log({message: 'error try again later'});
  }
});
router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product}],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json({message: 'Server issue please try again'});
  }
});

router.post('/', async (req, res) => {
  try {
  const categoryData = await Category.create(req.body);
  res.status(200).json(categoryData)
} catch (err) {
  res.status(400).json({message: 'error updating please try again'});
}
});

router.put('/:id', async (req, res) => {
  try {
    const category_id = req.params.id;
    const updatedCategoryData = req.body; 

    const [numberOfUpdatedRows, updatedCategories] = await Category.update(updatedCategoryData, {
      where: { id: category_id },
      returning: true, 
    });

    if (numberOfUpdatedRows === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(updatedCategories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


router.delete('/:id', async (req, res) => {
try {
  const deleteCategory = await Category.destroy({
    where: {id: req.params.id}});
  if (!deleteCategory){
     res.status(404).json({message: 'No category found with this id'});
return;
  }
 res.status(200).json({deleteCategory})
} catch (err) {
  res.status(500).json(err);
  console.log(err);
}
});

module.exports = router;
