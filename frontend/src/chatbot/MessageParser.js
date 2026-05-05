class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    if (/(hello|hi|hey|good morning|good afternoon|good evening)/i.test(lowerCaseMessage)) {
      return this.actionProvider.handleHello();
    }

    if (/(products|items|find|search|show me)/i.test(lowerCaseMessage)) {
      if (lowerCaseMessage.includes('deal') || lowerCaseMessage.includes('offer') || lowerCaseMessage.includes('discount')) {
        return this.actionProvider.handleDeals();
      }
      if (lowerCaseMessage.includes('category') || lowerCaseMessage.includes('type')) {
        return this.actionProvider.handleCategories();
      }
      const productQuery = this.extractProductName(message);
      if (productQuery) {
        return this.actionProvider.searchProducts(productQuery);
      }
      return this.actionProvider.handleProducts();
    }

    if (/add\s+.*\s+to\s+cart/i.test(message) || /add\s+to\s+cart/i.test(lowerCaseMessage)) {
      const productName = this.extractProductName(message) || this.extractProductNameFromAdd(message);
      return this.actionProvider.handleAddToCart(productName);
    }

    if (lowerCaseMessage.includes('cart') || lowerCaseMessage.includes('order status') || lowerCaseMessage.includes('checkout')) {
      return this.actionProvider.handleCart();
    }

    if (lowerCaseMessage.includes('alternative') || lowerCaseMessage.includes('cheaper') || lowerCaseMessage.includes('similar')) {
      const productName = this.extractProductName(message);
      if (productName) {
        return this.actionProvider.suggestAlternatives(productName);
      }
      return this.actionProvider.handleAlternatives();
    }

    if (lowerCaseMessage.includes('deal') || lowerCaseMessage.includes('discount') || lowerCaseMessage.includes('offer')) {
      return this.actionProvider.handleDeals();
    }

    if (lowerCaseMessage.includes('recipe') || lowerCaseMessage.includes('meal') || lowerCaseMessage.includes('plan')) {
      return this.actionProvider.handleMealPlan();
    }

    if (lowerCaseMessage.includes('category')) {
      return this.actionProvider.handleCategories();
    }

    if (lowerCaseMessage.includes('details') || lowerCaseMessage.includes('tell me about') || lowerCaseMessage.includes('about')) {
      const productName = this.extractProductName(message);
      if (productName) {
        return this.actionProvider.handleProductDetails(productName);
      }
      return this.actionProvider.handleProducts();
    }

    if (lowerCaseMessage.includes('help')) {
      return this.actionProvider.handleHelp();
    }

    if (this.isLikelyProductName(message)) {
      return this.actionProvider.searchProducts(message.trim());
    }

    return this.actionProvider.handleDefault();
  }

  extractProductName(message) {
    const patterns = [
      /alternatives?\s+for\s+(.+)/i,
      /cheaper\s+than\s+(.+)/i,
      /similar\s+to\s+(.+)/i,
      /like\s+(.+)/i,
      /details?\s+about\s+(.+)/i,
      /tell me about\s+(.+)/i,
      /show me\s+(.+)/i,
      /search\s+for\s+(.+)/i,
      /find\s+(.+)/i,
      /add\s+(.+)\s+to\s+cart/i,
    ];

    for (const pattern of patterns) {
      const match = message.match(pattern);
      if (match) {
        return match[1].trim();
      }
    }
    return null;
  }

  extractProductNameFromAdd(message) {
    const pattern = /add\s+(.+)\s+to\s+cart/i;
    const match = message.match(pattern);
    return match ? match[1].trim() : null;
  }

  isLikelyProductName(message) {
    const commonWords = [
      'hello', 'hi', 'help', 'cart', 'order', 'products', 'items', 'find',
      'the', 'a', 'an', 'is', 'are', 'what', 'how', 'can', 'you', 'show',
      'deal', 'discount', 'offer', 'meal', 'recipe', 'category', 'details',
      'about', 'add', 'to', 'buy', 'price', 'similar', 'cheaper', 'cheapest',
    ];
    const words = message.toLowerCase().split(/\s+/).filter(Boolean);
    return words.length <= 6 && words.length >= 1 && !words.some((word) => commonWords.includes(word));
  }
}

export default MessageParser;