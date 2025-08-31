import express from "express";
import User from "../models/user.js";
import { Product, TotalProducts } from "../models/items.js";

const router = express.Router();

router.get("/products", async (req, res) => {
    try {
        const products = await Product.find();
        res.json({ products });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/products", async (req, res) => {
    try {
        const product = await Product.create(req.body);
        try {
            await TotalProducts.findOneAndUpdate(
                {},
                { $addToSet: { totalProducts: product._id } },
                { upsert: true, new: true }
            );
        } catch (_) {}
        res.status(201).json({ message: "Product created", product });
    } catch (err) {
        if (err.name === "ValidationError") {
            return res.status(400).json({ message: err.message });
        }
        res.status(500).json({ message: err.message });
    }
});

router.post("/products/remove", async (req, res) => {
    try {
        const { productId } = req.body;
        if (!productId) return res.status(400).json({ message: "productId is required" });

        const product = await Product.findByIdAndDelete(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });
        try {
            await Promise.all([
                User.updateMany({}, { $pull: { cart: productId, liked: productId } }),
                TotalProducts.findOneAndUpdate({}, { $pull: { totalProducts: productId } })
            ]);
        } catch (_) {}

        res.json({ message: "Product removed", product });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/products/populated", async (req, res) => {
    try {
        const doc = await TotalProducts.findOne().populate("totalProducts");
        if (!doc) return res.json({ products: [] });
        res.json({ products: doc.totalProducts });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/cart/add", async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const user = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { cart: productId } },
            { new: true }
        ).populate("cart");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ message: "Product added to cart", cart: user.cart });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/cart/remove", async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { cart: productId } },
            { new: true }
        ).populate("cart");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ message: "Product removed from cart", cart: user.cart });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/liked/add", async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const user = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { liked: productId } },
            { new: true }
        ).populate("liked");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ message: "Product added to liked", liked: user.liked });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/liked/remove", async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { liked: productId } },
            { new: true }
        ).populate("liked");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ message: "Product removed from liked", liked: user.liked });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/getliked" , async (req,res) => {
    try {
    const { userId } = req.query;
    const user = await User.findById(userId).populate("Product");
    const LikedItems = user.LikedItems;
    return res.json(LikedItems);
  } catch (error) {}
    
})

router.get("/getcart" , async (req,res) => {
    try {
    const { userId } = req.query;
    const user = await User.findById(userId).populate("Product");
    const Cart = user.Cart;
    return res.json(Cart);
  } catch (error) {}
    
})
export default router;
