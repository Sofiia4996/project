const cart = new Cart($('#cartModal'));
const productList = new ProductList(
  'products.json',
  $('.products-container'),
  cart
);
const productmenList = new ProductmenList(
  'productsmen.json',
  $('.productsmen-container'),
  cart
);