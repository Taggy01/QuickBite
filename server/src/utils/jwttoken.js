import jwt from "jsonwebtoken";
import "dotenv/config";

const generateToken = (userId, res) => {
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in ENV");
  }

  const token = jwt.sign(
    { userId },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("token", token, {
    maxAge: 1 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
};

export default generateToken;