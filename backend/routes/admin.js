import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { DBConnect } from "../dbConnect.js";
import { Product, TotalProducts } from "../models/product.js"; 
import User from "../models/user.js";

dotenv.config();

const router = express.Router();

const ensureDB = async () => {
    const uri = process.env.DB_URI?.toString();
    if (!uri) throw new Error("DB_URI is not set");
    if (mongoose.connection.readyState !== 1) {
        await DBConnect(uri);
    }
};

router.post("/seed", async (req, res) => {
    try {
        await ensureDB();

        const { dataLink, userId } = req.body || {};
        if (!dataLink || !userId) {
            return res.status(400).json({ error: "dataLink and userId are required" });
        }

        const user = await User.findById(userId);
        if (!user || !( user.role === "admin")) {
            return res.status(403).json({ error: "Forbidden: admin only" });
        }

        const response = await fetch(dataLink);
        if (!response.ok) {
            return res.status(400).json({ error: `Failed to fetch data (${response.status})` });
        }

        const payload = await response.json();
        const products =
            Array.isArray(payload) ? payload :
            Array.isArray(payload?.products) ? payload.products :
            Array.isArray(payload?.data) ? payload.data : [];

        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: "No products found in payload" });
        }

        const filtered = products.filter(p => typeof p?.id === "number");
        if (filtered.length === 0) {
            return res.status(400).json({ error: "Products must include numeric 'id' fields" });
        }

        const session = await mongoose.startSession();
        let writeResult;
        await session.withTransaction(async () => {
            const ops = filtered.map(p => ({
                updateOne: {
                    filter: { id: p.id },
                    update: { $set: p },
                    upsert: true
                }
            }));
            writeResult = await Product.bulkWrite(ops, { session, ordered: false });

            const allIds = await Product.find({}, { _id: 1 }, { session });
            await TotalProducts.updateOne(
                {},
                { $set: { totalProducts: allIds.map(d => d._id) } },
                { upsert: true, session }
            );
        });
        session.endSession();

        return res.json({
            ok: true,
            matched: writeResult.matchedCount,
            modified: writeResult.modifiedCount,
            upserted: writeResult.upsertedCount
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
});

export default router;