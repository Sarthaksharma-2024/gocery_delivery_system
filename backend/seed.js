import mongoose from 'mongoose';
import { Product } from './models/productModel.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/rushbasket';

const groceryData = [
  {
    name: "Exotic Fruits",
    items: [
      { name: "Dragon Fruit", price: 180, imageUrl: "/assets/Dragon Fruit.png", description: "Tropical pink fruit with white flesh" },
      { name: "Passion Fruit", price: 150, imageUrl: "/assets/Passion Fruit.png", description: "Tangy tropical fruit with aromatic pulp" },
      { name: "Star Fruit", price: 120, imageUrl: "/assets/Star Fruit.png", description: "Star-shaped yellow fruit with crisp texture" },
      { name: "Persimmon", price: 140, imageUrl: "/assets/Persimmon.png", description: "Sweet orange fruit with honey-like flavor" },
      { name: "Kiwano Melon", price: 200, imageUrl: "/assets/Kiwano Melon.png", description: "Horned melon with vibrant green jelly" },
      { name: "Rambutan", price: 160, imageUrl: "/assets/Rambutan.png", description: "Hairy red fruit with translucent flesh" },
      { name: "Mangosteen", price: 220, imageUrl: "/assets/Mangosteen.png", description: "Purple fruit with snow-white segments" },
      { name: "Pomelo", price: 110, imageUrl: "/assets/Pomelo.png", description: "Large citrus fruit with sweet-tart flavor" },
    ],
  },
  {
    name: "Artisanal Cheeses",
    items: [
      { name: "Truffle Brie", price: 480, imageUrl: "/assets/Truffle Brie.png", description: "Creamy brie infused with black truffle" },
      { name: "Aged Gouda", price: 420, imageUrl: "/assets/Aged Gouda.png", description: "5-year aged Dutch cheese with caramel notes" },
      { name: "Smoked Blue", price: 380, imageUrl: "/assets/Smoked Blue.png", description: "Blue cheese cold-smoked over hickory" },
      { name: "Himalayan Yak", price: 650, imageUrl: "/assets/Himalayan Yak.png", description: "Rare cheese from high-altitude yak milk" },
      { name: "Saffron Manchego", price: 520, imageUrl: "/assets/Saffron Manchego.png", description: "Spanish sheep cheese with saffron threads" },
      { name: "Whiskey Cheddar", price: 450, imageUrl: "/assets/Whiskey Cheddar.png", description: "Sharp cheddar aged in whiskey barrels" },
      { name: "Cave-Aged Gruyère", price: 490, imageUrl: "/assets/Cave-Aged Gruyère.png", description: "Swiss cheese aged in mountain caves" },
      { name: "Lavender Goat", price: 380, imageUrl: "/assets/Lavender Goat.png", description: "Fresh goat cheese with edible lavender" },
    ],
  },
  {
    name: "Global Breads",
    items: [
      { name: "Sourdough Focaccia", price: 120, imageUrl: "/assets/Sourdough Focaccia.png", description: "Italian olive oil bread with rosemary" },
      { name: "Turkish Simit", price: 90, imageUrl: "/assets/Turkish Simit.png", description: "Sesame-crusted circular bread" },
      { name: "Japanese Milk Bread", price: 150, imageUrl: "/assets/Japanese Milk Bread.png", description: "Super-soft, pillowy shokupan" },
      { name: "Indian Naan", price: 70, imageUrl: "/assets/Indian Naan.png", description: "Tandoor-baked leavened flatbread" },
      { name: "Mexican Concha", price: 80, imageUrl: "/assets/Mexican Concha.png", description: "Sweet bread with shell-patterned topping" },
      { name: "Swedish Limpa", price: 110, imageUrl: "/assets/Swedish Limpa.png", description: "Rye bread with orange zest and fennel" },
      { name: "Moroccan Khobz", price: 95, imageUrl: "/assets/Moroccan Khobz.png", description: "Traditional semolina country bread" },
      { name: "Ethiopian Injera", price: 130, imageUrl: "/assets/Ethiopian Injera.png", description: "Sourdough flatbread with spongy texture" },
    ],
  },
  {
    name: "Vegetables",
    items: [
      { name: "Bell Peppers", price: 80, imageUrl: "/assets/BellPeppers.png", description: "Crisp bell peppers full of vibrant color" },
      { name: "Spinach", price: 60, imageUrl: "/assets/Spinach.png", description: "Fresh spinach leaves packed with nutrients" },
      { name: "Tomatoes", price: 45, imageUrl: "/assets/Tomatoes.png", description: "Juicy tomatoes perfect for salads and sauces" },
      { name: "Cucumber", price: 35, imageUrl: "/assets/Cucumber.png", description: "Cool crisp cucumbers for refreshing snacks" },
      { name: "Garlic", price: 25, imageUrl: "/assets/Garlic.png", description: "Aromatic garlic bulbs to enhance every dish" },
      { name: "Onion", price: 40, imageUrl: "/assets/Onion.png", description: "Versatile onions to add flavor to meals" },
      { name: "Potato", price: 50, imageUrl: "/assets/Potato.png", description: "Starchy potatoes for roasting, boiling, or frying" },
      { name: "Papaya", price: 75, imageUrl: "/assets/Papaya.png", description: "Sweet tropical papaya with a soft texture" },
    ],
  },
  {
    name: "Beverages",
    items: [
      { name: "Orange Juice", price: 110, imageUrl: "/assets/OrangeJuice.png", description: "Freshly squeezed orange juice" },
      { name: "Coffee", price: 90, imageUrl: "/assets/Coffee.png", description: "Rich brewed coffee for a morning boost" },
      { name: "Tea", price: 70, imageUrl: "/assets/Tea.png", description: "Aromatic tea leaves for a soothing cup" },
      { name: "Water", price: 30, imageUrl: "/assets/Water.png", description: "Pure bottled water for hydration" },
      { name: "Coconut Water", price: 140, imageUrl: "/assets/CoconutWater.png", description: "Refreshing natural coconut water" },
      { name: "Cola", price: 85, imageUrl: "/assets/Cola.png", description: "Classic fizzy cola drink" },
      { name: "Energy Drink", price: 130, imageUrl: "/assets/EnergyDrink.png", description: "Energy drink to keep you going" },
      { name: "Lassi", price: 120, imageUrl: "/assets/Lassi.png", description: "Creamy yogurt-based beverage" },
    ],
  },
  {
    name: "Seafood",
    items: [
      { name: "Lobster", price: 720, imageUrl: "/assets/Lobster.png", description: "Fresh lobster with succulent meat" },
      { name: "Crab", price: 520, imageUrl: "/assets/Crab.png", description: "Sweet crab meat for seafood lovers" },
      { name: "Mussels", price: 420, imageUrl: "/assets/Mussels.png", description: "Tender mussels in shell for steaming" },
      { name: "Oysters", price: 490, imageUrl: "/assets/Oysters.png", description: "Briny oysters perfect for raw service" },
      { name: "King Crab", price: 850, imageUrl: "/assets/KingCrab.png", description: "Premium king crab legs with sweet meat" },
      { name: "Anchovies", price: 180, imageUrl: "/assets/Anchovies.png", description: "Salty anchovies for pizzas and salads" },
      { name: "Smokehouse Mackerel", price: 260, imageUrl: "/assets/SmokehouseMackerel.png", description: "Smoked mackerel fillets with rich flavor" },
      { name: "Scallops", price: 460, imageUrl: "/assets/Scallops.png", description: "Sweet sea scallops ideal for searing" },
    ],
  },
  {
    name: "Meat",
    items: [
      { name: "Beef Steak", price: 550, imageUrl: "/assets/Beef Steak.png", description: "Juicy beef steak, perfect for grilling" },
      { name: "Turkey Breast", price: 420, imageUrl: "/assets/Turkey Breast.png", description: "Lean turkey breast, ideal for sandwiches" },
      { name: "Veal Cutlet", price: 480, imageUrl: "/assets/Veal Cutlet.png", description: "Tender veal cutlet with delicate flavor" },
      { name: "Duck Breast", price: 600, imageUrl: "/assets/Duck Breast.png", description: "Rich duck breast for gourmet recipes" },
      { name: "Ham", price: 390, imageUrl: "/assets/Ham.png", description: "Savory ham slices for breakfast or dinner" },
      { name: "Meatballs", price: 360, imageUrl: "/assets/Meatballs.png", description: "Seasoned meatballs ready to cook" },
      { name: "Pork Ribs", price: 470, imageUrl: "/assets/Pork Ribs.png", description: "Tender pork ribs with rich flavor" },
    ],
  },
  {
    name: "Artisan Chocolates & Confections",
    items: [
      { name: "Salted Caramel Truffles", price: 320, imageUrl: "/assets/Salted Caramel Truffles.png", description: "Dark chocolate ganache with sea salt caramel core" },
      { name: "Single-Origin Chocolate Bar", price: 280, imageUrl: "/assets/Single-Origin Chocolate Bar.png", description: "72% Venezuelan dark chocolate, stone ground" },
      { name: "Honeycomb Crunch Brittle", price: 190, imageUrl: "/assets/Honeycomb Crunch Brittle.png", description: "Golden honeycomb enrobed in milk chocolate" },
      { name: "Pistachio Marzipan Logs", price: 240, imageUrl: "/assets/Pistachio Marzipan Logs.png", description: "Hand-rolled Sicilian pistachio marzipan" },
      { name: "Espresso Bean Clusters", price: 210, imageUrl: "/assets/Espresso Bean Clusters.png", description: "Dark chocolate covered arabica coffee beans" },
      { name: "Raspberry Rose Bonbons", price: 260, imageUrl: "/assets/Raspberry Rose Bonbons.png", description: "White chocolate shells with raspberry-rose filling" },
      { name: "Spiced Orange Chocolate Bark", price: 180, imageUrl: "/assets/Spiced Orange Chocolate Bark.png", description: "Dark chocolate with candied orange and cardamom" },
      { name: "Tahini Halva Squares", price: 220, imageUrl: "/assets/Tahini Halva Squares.png", description: "Sesame halva with pistachios and dark chocolate" },
    ],
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    const categoryMap = {
      'Exotic Fruits': 'Fruits',
      'Artisanal Cheeses': 'Dairy',
      'Global Breads': 'Bakery',
      'Artisan Chocolates & Confections': 'Snacks',
    };

    const products = [];
    groceryData.forEach(category => {
      const normalizedCategory = categoryMap[category.name] || category.name;
      category.items.forEach(item => {
        products.push({
          name: item.name,
          description: item.description,
          category: normalizedCategory,
          oldPrice: item.price, // Assuming oldPrice is same as price for now
          price: item.price,
          imageUrl: item.imageUrl,
        });
      });
    });

    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products`);

    mongoose.connection.close();
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();