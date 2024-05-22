import prisma from "@/utils/prisma";
import jwt from "jsonwebtoken";
import { uploadFile } from "@/lib/uploadFile";

export async function PUT(req) {
  const formData = await req.formData();
  const id = formData.get("id");
  const username = formData.get("username");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const avatar = formData.get("avatar");

  if (avatar) {
    // Upload avatar
    await uploadFile({ key: avatar.name, folder: id, body: avatar });
  }

  try {
    const updateData = await prisma.user.update({
      data: {
        firstName,
        lastName,
        email,
        avatar: avatar.name,
      },
      where: {
        id,
      },
    });

    // If everything is OK
    const payload = {
      id,
      firstName: updateData.firstName,
      lastName: updateData.lastName,
      username: updateData.username,
      email: updateData.email,
      avatar: updateData.avatar,
    };

    // Create token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return new Response(
      JSON.stringify({ message: "Updated successfully!", token: token }),
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
