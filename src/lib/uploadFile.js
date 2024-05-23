import { s3Client } from "@/utils/aws";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export async function uploadFile({ key, folder, body }) {
  // prepare file
  const bytes = await body.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // send command
  try {
    await s3Client.send(
      new PutObjectCommand({
        Bucket: "itinerator",
        Key: `${folder}/${key}`,
        ContentType: body.type,
        Body: buffer,
      })
    );
    console.log("File uploaded!");
  } catch (error) {
    console.log(error);
  }
}
