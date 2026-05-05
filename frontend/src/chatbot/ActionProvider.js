import axios from 'axios';

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  getAuthHeader() {
    const token =
      localStorage.getItem('authToken') ||
      localStorage.getItem('token') ||
      sessionStorage.getItem('token');

    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  }

  formatPrice(value) {
    if (typeof value !== 'number') return value;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(value);
  }

  handleTaskAcknowledgement(task) {
    const message = this.createChatBotMessage(`Okay, I will ${task} now.`);
    this.updateChatbotState(message);
  }

  handleHello() {
    const message = this.createChatBotMessage(
      "Hello! I'm here to help you shop smarter. Ask me to find products, show deals, recommend categories, or add something to your cart."
    );
    this.updateChatbotState(message);
  }

  async handleProducts() {
    this.handleTaskAcknowledgement('show popular products');
    try {
      const response = await axios.get('/api/items');
      const products = response.data.slice(0, 6);
      const message = this.createChatBotMessage(
        'Here are some popular items right now. Tap any product for more details or add it to your cart!',
        { widget: 'productList', payload: products }
      );
      this.updateChatbotState(message);
    } catch (error) {
      console.error('Error fetching products:', error);
      const message = this.createChatBotMessage('Sorry, I could not load products right now. Please try again later.');
      this.updateChatbotState(message);
    }
  }

  handleCart() {
    const message = this.createChatBotMessage(
      'You can view or edit your cart on the Cart page. If you want, I can also help add a specific item to your cart directly from here.'
    );
    this.updateChatbotState(message);
  }

  handleAlternatives() {
    const message = this.createChatBotMessage("Sure! Tell me the name of the product you'd like alternatives for. For example: 'alternatives for milk' or 'cheaper than bread'.");
    this.updateChatbotState(message);
  }

  handleHelp() {
    const message = this.createChatBotMessage(
      'I can help you with:\n• Finding products by name or category\n• Showing deals and discounts\n• Suggesting cheaper alternatives\n• Recommending products for a category\n• Adding items to your cart\n• Answering product questions'
    );
    this.updateChatbotState(message);
  }

  handleDefault() {
    const message = this.createChatBotMessage(
      "I'm not sure about that. Try asking me for deals, categories, product search, or say 'help' for examples."
    );
    this.updateChatbotState(message);
  }

  async searchProducts(query) {
    this.handleTaskAcknowledgement(`search for "${query}"`);
    try {
      const response = await axios.get(`/api/chatbot/search?query=${encodeURIComponent(query)}`);
      const products = response.data;

      if (!products.length) {
        const message = this.createChatBotMessage(
          `I couldn't find products matching "${query}". Try a different name or category.`
        );
        this.updateChatbotState(message);
        return;
      }

      const message = this.createChatBotMessage(
        `I found these products for "${query}". Select one to see more details or add it to your cart.`,
        { widget: 'productList', payload: products }
      );
      this.updateChatbotState(message);
    } catch (error) {
      console.error('Error searching products:', error);
      const message = this.createChatBotMessage('Sorry, I could not search for products right now.');
      this.updateChatbotState(message);
    }
  }

  async handleDeals() {
    this.handleTaskAcknowledgement('show the latest deals');
    try {
      const response = await axios.get('/api/chatbot/deals');
      const deals = response.data;

      if (!deals.length) {
        const message = this.createChatBotMessage('I could not find any special deals at the moment. Please check back later.');
        this.updateChatbotState(message);
        return;
      }

      const message = this.createChatBotMessage(
        'Here are some current discount deals. Add any of them to your cart if you like what you see!',
        { widget: 'productList', payload: deals }
      );
      this.updateChatbotState(message);
    } catch (error) {
      console.error('Error fetching deals:', error);
      const message = this.createChatBotMessage('Sorry, I cannot load deals right now.');
      this.updateChatbotState(message);
    }
  }

  async handleCategories() {
    this.handleTaskAcknowledgement('show available categories');
    try {
      const response = await axios.get('/api/chatbot/categories');
      const categories = response.data;
      const message = this.createChatBotMessage(
        'Here are some shopping categories. Pick one to see products from that section.',
        { widget: 'categoryList', payload: categories }
      );
      this.updateChatbotState(message);
    } catch (error) {
      console.error('Error fetching categories:', error);
      const message = this.createChatBotMessage('Sorry, I could not load categories right now.');
      this.updateChatbotState(message);
    }
  }

  async handleCategoryProducts(category) {
    try {
      const response = await axios.get(`/api/chatbot/recommend?category=${encodeURIComponent(category)}`);
      const products = response.data;

      if (!products.length) {
        const message = this.createChatBotMessage(`I couldn't find products for ${category}. Try another category.`);
        this.updateChatbotState(message);
        return;
      }

      const message = this.createChatBotMessage(
        `Great choice! Here are some ${category} items you might like:`,
        { widget: 'productList', payload: products }
      );
      this.updateChatbotState(message);
    } catch (error) {
      console.error('Error fetching category products:', error);
      const message = this.createChatBotMessage('Sorry, I could not load category recommendations right now.');
      this.updateChatbotState(message);
    }
  }

  async handleProductDetails(productName) {
    try {
      const response = await axios.get(`/api/chatbot/search?query=${encodeURIComponent(productName)}`);
      const products = response.data;

      if (!products.length) {
        const message = this.createChatBotMessage(`I couldn't find anything by that name. Try a different product or category.`);
        this.updateChatbotState(message);
        return;
      }

      const product = products[0];
      const detailsText = `"${product.name}" is in ${product.category}. Price: ${this.formatPrice(product.price)}. ${product.description || 'No description available.'}`;
      const message = this.createChatBotMessage(detailsText, { widget: 'productList', payload: [product] });
      this.updateChatbotState(message);
    } catch (error) {
      console.error('Error fetching product details:', error);
      const message = this.createChatBotMessage('Sorry, I could not fetch product details right now.');
      this.updateChatbotState(message);
    }
  }

  async handleMealPlan() {
    const message = this.createChatBotMessage(
      'Here is a quick grocery plan:\n• Breakfast: Oatmeal, bananas, and milk\n• Lunch: Sandwich ingredients and salad mix\n• Dinner: Pasta, tomato sauce, and fresh vegetables\nYou can ask me to search items for any of these categories or add them to your cart.'
    );
    this.updateChatbotState(message);
  }

  async handleAddToCart(productName) {
    if (!productName) {
      const message = this.createChatBotMessage('Please tell me what item you want to add to your cart.');
      this.updateChatbotState(message);
      return;
    }

    this.handleTaskAcknowledgement(`add "${productName}" to your cart`);

    try {
      const searchResponse = await axios.get(`/api/chatbot/search?query=${encodeURIComponent(productName)}`);
      const products = searchResponse.data;
      if (!products.length) {
        const message = this.createChatBotMessage(`I could not find an item matching "${productName}". Can you try a different name?`);
        this.updateChatbotState(message);
        return;
      }

      const item = products[0];
      await axios.post(
        '/api/cart',
        { productId: item._id || item.id, quantity: 1 },
        this.getAuthHeader()
      );

      const message = this.createChatBotMessage(`Added "${item.name}" to your cart. You can view it on the Cart page or continue shopping here.`);
      this.updateChatbotState(message);
    } catch (error) {
      console.error('Error adding to cart:', error);
      const message = this.createChatBotMessage(
        'I could not add that to your cart. Make sure you are signed in and try again.'
      );
      this.updateChatbotState(message);
    }
  }

  // Method to suggest alternatives for a specific product
  async suggestAlternatives(productName) {
    try {
      // First, search for the product
      const searchResponse = await axios.get(`/api/chatbot/search?query=${encodeURIComponent(productName)}`);
      const products = searchResponse.data;

      if (products.length === 0) {
        const message = this.createChatBotMessage(`I couldn't find a product called "${productName}". Could you try a different name?`);
        this.updateChatbotState(message);
        return;
      }

      const product = products[0]; // Take the first match

      // Get alternatives
      const altResponse = await axios.get(`/api/chatbot/alternatives/${product._id}`);
      const data = altResponse.data;

      if (data.alternatives.length === 0) {
        const message = this.createChatBotMessage(
          `I found "${product.name}" (${this.formatPrice(product.price)}), but there are no cheaper alternatives in the same category right now.`
        );
        this.updateChatbotState(message);
      } else {
        const message = this.createChatBotMessage(
          `For "${product.name}" (${this.formatPrice(product.price)}), here are some cheaper alternatives:`,
          { widget: 'alternatives', payload: data.alternatives }
        );
        this.updateChatbotState(message);
      }
    } catch (error) {
      console.error('Error suggesting alternatives:', error);
      const message = this.createChatBotMessage('Sorry, I could not find alternatives right now. Please try again later.');
      this.updateChatbotState(message);
    }
  }

  updateChatbotState(message) {
    this.setState(prevState => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider;