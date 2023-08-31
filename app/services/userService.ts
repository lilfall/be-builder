import { User } from "@prisma/client";
import prisma from "../../prisma/client";
import bcrypt, { hashSync } from "bcrypt";

export async function createUser(data: User): Promise<any> {
  try {
    const cleanedData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== null)
    );
    const user = await prisma.user.create({
      data: {
        email: data.email,
        ...cleanedData,
      },
    });
    return user;
  } catch (error) {
    return error;
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
        user.password ?? ""
      );
      if (hashedPassword) {
        return user;
      }
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
