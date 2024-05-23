import bcrypt from "bcrypt";
import prisma from "@/utils/prisma";

export async function POST(req) {
  const { firstName, lastName, username, email, password } = await req.json();

  try {
    // Negative condition
    if (!firstName || !lastName || !username || !email || !password) {
      return Response.json(
        { errorMessage: "All fields must be filled" },
        { status: 400 }
      );
    }

    const emailExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (emailExist) {
      return Response.json(
        { errorMessage: "Email already exist" },
        { status: 400 }
      );
    }

    const usernameExist = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (usernameExist) {
      return Response.json(
        { errorMessage: "Username already exist" },
        { status: 400 }
      );
    }

    // Create hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Register user to database
    const userRegisteredData = await prisma.user.create({
      data: {
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword,
      },
    });

    return Response.json(
      { message: "Successfully created an account!", data: userRegisteredData },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      { errorMessage: "Something went wrong. Please try again later" },
      { status: 500 }
    );
  }
}
