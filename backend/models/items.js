import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
    id: Number,
    name: String,
    icon: String
});

const SellerSchema = new mongoose.Schema({
    id: Number,
    name: String,
    avatar: String,
    rating: Number,
    totalReviews: Number,
    memberSince: String,
    location: String,
    description: String,
    totalListings: Number,
    responseTime: String
});

const ProductSchema = new mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    price: Number,
    originalPrice: Number,
    images: [String],
    category: String,
    condition: String,
    sellerId: Number,
    sellerName: String,
    sellerRating: Number,
    location: String,
    specifications: { type: Map, of: String },
    priceHistory: [Number],
    likes: Number,
    isLiked: Boolean,
    datePosted: String
});

const totatDataSchema = new mongoose.Schema({
    totalProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product2' }]
});

export const Category = mongoose.model('Category2', CategorySchema);
export const Seller = mongoose.model('Seller2', SellerSchema);
export const Product = mongoose.model('Product2', ProductSchema);
export const TotalProducts = mongoose.model('TotalData2' , totatDataSchema);