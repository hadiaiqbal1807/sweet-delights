import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['Cakes', 'Bread', 'Pastries', 'Desserts'] 
  },
  stock: { type: Number, required: true, default: 0 },
  // Yahan humne image field add kar di hai
  image: { type: String, required: false }, 
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);