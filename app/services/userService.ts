import { User } from "@prisma/client";
import prisma from "../../prisma/client";
import bcrypt, { hashSync } from "bcrypt";

export async function isExist(data: User) {
  try {
    const exist = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    return exist;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createUser(data: User): Promise<any> {
  try {
    if (data.password) {
      data.password = hashSync(data.password, 10); // Angka 10 adalah salt rounds
    }
    const cleanedData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== null)
    );

    const user = await prisma.user.upsert({
      where: {
        email: data.email,
      },
      update: {
        name: data.name,
      },
      create: {
        email: data.email,
        ...cleanedData,
      },
    });
    const res = {
      code: "201",
      status: "Success",
      data: user,
    };
    return res;
  } catch (error) {
    const err = {
      code: 404,
      status: "Failed",
      data: error,
    };
    return err;
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
