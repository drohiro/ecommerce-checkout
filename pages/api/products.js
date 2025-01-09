// Classe para representar um Produto
class Product {
  constructor(id, name, price, stock) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
  }
}

// Lista de produtos
let products = [
  new Product(1, "Product 1", 100, 10),
  new Product(2, "Product 2", 200, 20),
  new Product(3, "Product 3", 300, 30),
  new Product(4, "Product 4", 400, 40),
  new Product(5, "Product 5", 500, 50),
];

// Manipulador da requisição (GET para retornar os produtos)
export default function handler(req, res) {
  res.status(200).json(products);
}
