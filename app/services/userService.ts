import { User } from "@prisma/client";
import prisma from "../../prisma/client";
import bcrypt, { hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
export async function createUser(data: User): Promise<any> {
  try {
    if (data.password) {
      data.password = hashSync(data.password, 10); // Angka 10 adalah salt rounds
    }
    const cleanedData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== null)
    );
    const user = await prisma.user.upsert({
      create: {
        email: data.email,
        //
      },
      update: {
        ...cleanedData,
      },
      where: {
        email: data.email,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function loginUser(data: {
  email: string;
  password: string;
}): Promise<any> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (user) {
      const hashedPassword = await bcrypt.compare(
        data.password,
        user.password || ""
      );
      if (hashedPassword) {
        // Buat token JWT
        const token = jwt.sign(
          { userId: user.id, email: user.email },
          "secret_key", // Ganti dengan kunci rahasia yang lebih aman
          { expiresIn: "1d" } // Sesuaikan dengan waktu kadaluwarsa yang diinginkan
        );

        // Buat refresh token
        const refreshToken = jwt.sign(
          { userId: user.id },
          "refresh_secret_key",
          { expiresIn: "7d" } // Sesuaikan dengan waktu kadaluwarsa yang diinginkan
        );
        return {
          status: "Success",
          user: user,
          token: token,
          refreshToken: refreshToken,
        };
      } else {
        return { status: "Failed" };
      }
    } else {
      return { status: "Failed" };
    }
  } catch (error) {
    throw error;
  }
}

export async function getUserById(user_id: string) {
  const id = user_id;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        _count: true,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
}
