import bcrypt from "bcrypt";
import User from "../models/db-model/user";
const jwt = require("jsonwebtoken");

type RegistrationData = {
  email: string;
  password: string;
  fullName: string;
  address: string;
  phoneNumber: string;
  additionalData: object;
};

// Simpan secret key JWT Anda dengan aman (sebaiknya di variabel lingkup sistem)
const JWT_SECRET_KEY = "your_secret_key_here";

class AuthService {
  async login(
    email: string,
    password: string
  ): Promise<{ status: string; token?: string }> {
    try {
      // Cari pengguna berdasarkan email
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return { status: "failed" };
      }

      // Verifikasi password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return { status: "failed" };
      }

      // Jika verifikasi sukses, buat token JWT
      const token = jwt.sign({ userId: user.id }, "your_secret_key_here", {
        expiresIn: "1h",
      });

      return { status: "sukses", token };
    } catch (error) {
      throw new Error("Internal server error");
    }
  }

  async register(
    email: string,
    password: string,
    fullName: string,
    address: string,
    phoneNumber: string,
    additionalData: object
  ): Promise<void> {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      email,
      password: hashedPassword,
      fullName,
      address,
      phoneNumber,
      additionalData,
    });
  }
}

export default AuthService;
