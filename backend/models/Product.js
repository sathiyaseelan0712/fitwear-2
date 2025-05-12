import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  sizes: [{
    type: String,
    required: true
  }],
  material: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['shirts', 'pants', 't-shirts', 'trousers']
  },
  inventory: {
    type: Number,
    required: true,
    default: 0
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;