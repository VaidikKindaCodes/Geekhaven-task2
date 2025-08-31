import mongoose, { Schema, model } from "mongoose";
import { setUser } from "../services/auth";
import { createHmac, randomBytes } from "node:crypto";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    LikedItems: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    ],
    Cart: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    ],
    role :{
      type : String,
      default : "user"
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  const salt = randomBytes(16).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  user.salt = salt;
  user.password = hashedPassword;

  next();
});

userSchema.statics.matchPassword = async function (email, password) {
  const User = await this.findOne({ email });
  if (!User) throw new Error("Incorrect email or password");

  const hashedAttempt = createHmac("sha256", User.salt)
    .update(password)
    .digest("hex");

  if (hashedAttempt !== User.password) {
    throw new Error("Incorrect email or password");
  }
  const user = User.toObject();
  delete user.password;
  delete user.salt;
  delete user.createdAt;
  delete user.updatedAt;
  const token = setUser(user);
  if (!token) throw new Error("Incorrect email or password");
  return { token, user };
};

const User = model("user", userSchema);

export default User;
