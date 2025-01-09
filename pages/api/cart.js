class Cart {
  constructor() {
    this.items = [];
  }

  // Método para adicionar item ao carrinho
  addItem(product, quantity) {
    if (quantity > product.stock) {
      throw new Error(`Estoque insuficiente para o produto: ${product.name}`);
    }

    // Deduz o estoque do produto
    product.stock -= quantity;

    // Verifica se o produto já está no carrinho
    const existingItem = this.items.find((item) => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
  }

  // Método para remover item do carrinho
  removeItem(productId) {
    const index = this.items.findIndex((item) => item.product.id === productId);

    if (index !== -1) {
      const item = this.items[index];
      // Restaura o estoque do produto
      item.product.stock += item.quantity;
      // Remove o item do carrinho
      this.items.splice(index, 1);
    }
  }

  // Método para listar os itens no carrinho
  listItems() {
    return this.items.map(({ product, quantity }) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
    }));
  }
}

// Inicializando o carrinho e os produtos
const cart = new Cart();

export default function handler(req, res) {
  try {
    const { method } = req;

    switch (method) {
      case "GET":
        // Retorna os itens do carrinho
        res.status(200).json(cart.listItems());
        break;

      case "POST":
        // Pega productId e quantity do corpo da requisição
        const { productId, quantity } = req.body;

        // Encontra o produto
        const product = products.find((p) => p.id === productId);

        if (!product) {
          return res.status(404).json({ message: "Produto não encontrado" });
        }

        // Adiciona o produto ao carrinho
        cart.addItem(product, quantity);
        res.status(201).json(cart.listItems());
        break;

      case "DELETE":
        // Pega o productId a partir da query
        const productIdToRemove = parseInt(req.query.id);

        // Remove o produto do carrinho
        cart.removeItem(productIdToRemove);
        res.status(200).json(cart.listItems());
        break;

      default:
        // Se o método não for permitido
        res.setHeader("Allow", ["GET", "POST", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    // Se ocorrer algum erro, retorna a mensagem de erro
    res.status(400).json({ message: error.message });
  }
}
