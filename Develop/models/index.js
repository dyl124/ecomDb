// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id'
})
// Categories have many Products
Category.hasMany(Product, {
  foreginKey: 'category_id',
  onDelete: 'CASCADE',

})
// Define the associations
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id', // use the foreign key related to the Product model
});

Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id', // use the foreign key related to the Tag model
});
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
