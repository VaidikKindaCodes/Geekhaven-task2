import mongoose from "mongoose";

export async function DBConnect(url) {
    if (mongoose.connection.readyState === 1) {
        return;
    }
    return await mongoose.connect(url).then(()=> console.log("DataBase connected"));
}