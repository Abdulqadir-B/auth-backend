import { User } from "../models/User.js";
import { generateAccessToken } from "../utils/jwt.js";

const normalizeEmail = (email) => email.trim().toLowerCase();

export const register = async (request, response, next) => {
  try {
    const { email, password } = request.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return response.status(400).json({
        message: "Email and password are required",
      });
    }

    const normalizedEmail = normalizeEmail(email);
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return response.status(409).json({
        message: "An account with this email already exists",
      });
    }

    const user = await User.create({
      email: normalizedEmail,
      password,
    });

    const token = generateAccessToken(user._id.toString());

    return response.status(201).json({
      user: {
        id: user._id,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    return next(error);
  }
};

export const login = async (request, response, next) => {
  try {
    const { email, password } = request.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return response.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({
      email: normalizeEmail(email),
    }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return response.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = generateAccessToken(user._id.toString());

    return response.json({
      user: {
        id: user._id,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    return next(error);
  }
};
