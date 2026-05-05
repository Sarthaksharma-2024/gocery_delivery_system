import express from 'express';
import { Product } from '../models/productModel.js';

const router = express.Router();

// Endpoint to get product alternatives
router.get('/alternatives/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const alternatives = await Product.find({
      category: product.category,
      _id: { $ne: productId },
      price: { $lt: product.price },
    })
      .sort({ price: 1 })
      .limit(5);

    res.json({
      currentProduct: {
        id: product._id,
        name: product.name,
        price: product.price,
        oldPrice: product.oldPrice,
        category: product.category,
        imageUrl: product.imageUrl,
        description: product.description,
      },
      alternatives: alternatives.map((alt) => ({
        id: alt._id,
        name: alt.name,
        price: alt.price,
        oldPrice: alt.oldPrice,
        imageUrl: alt.imageUrl,
        description: alt.description,
        category: alt.category,
      })),
    });
  } catch (error) {
    console.error('Error finding alternatives:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Search products by name for chatbot queries
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: 'Query parameter required' });
    }

    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
      ],
    })
      .sort({ price: 1 })
      .limit(7);

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// List available categories for quick browsing
router.get('/categories', async (_req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.json(categories.sort());
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Recommend products from a category
router.get('/recommend', async (req, res) => {
  try {
    const { category } = req.query;
    if (!category) {
      return res.status(400).json({ error: 'Category query required' });
    }

    const products = await Product.find({
      category: { $regex: `^${category}$`, $options: 'i' },
    })
      .sort({ price: 1 })
      .limit(6);

    res.json(products);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get current discounted deals
router.get('/deals', async (_req, res) => {
  try {
    const deals = await Product.aggregate([
      {
        $match: {
          $expr: { $gt: ['$oldPrice', '$price'] },
        },
      },
      {
        $addFields: {
          savings: { $subtract: ['$oldPrice', '$price'] },
        },
      },
      {
        $sort: { savings: -1, price: 1 },
      },
      {
        $limit: 6,
      },
    ]);

    res.json(
      deals.map((deal) => ({
        id: deal._id,
        name: deal.name,
        price: deal.price,
        oldPrice: deal.oldPrice,
        imageUrl: deal.imageUrl,
        description: deal.description,
        savings: deal.savings,
        category: deal.category,
      }))
    );
  } catch (error) {
    console.error('Error fetching deals:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;