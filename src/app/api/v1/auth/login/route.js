import prisma from "@/utils/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const { username, password } = await req.json();

  try {
    const findUser = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    // If user not found
    if (!findUser) {
      return Response.json({ errorMessage: "User not found" }, { status: 401 });
    }

    // Comparing password
    const comparePassword = await bcrypt.compare(password, findUser.password);

    // If password is wrong
    if (!comparePassword) {
      return Response.json(
        { errorMessage: "Invalid credentials" },
        { status: 401 }
      );
    }

    // If everything is OK
    const payload = {
      id: findUser.id,
      firstName: findUser.firstName,
      lastName: findUser.lastName,
      username: findUser.username,
      email: findUser.email,
      avatar: findUser.avatar,
    };

    // Create token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    console.log(token);
    var data = jwt.decode(token);

    console.log(data);

    return new Response(
      JSON.stringify({ message: "Logged in successfully!", token: token }),
      {
        status: 200,
        headers: {
          "Set-Cookie": `token=${token};path=/`,
        },
      }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      { errorMessage: "Something went wrong. Please try again later" },
      { status: 500 }
    );
  }
}
