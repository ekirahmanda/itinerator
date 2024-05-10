import { S3Client } from "@aws-sdk/client-s3";

// lihat di R2 cloudflare
export const s3Client = new S3Client({
  region: "apac",
  endpoint: process.env.R2_CLOUDFLARE_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_ID,
    secretAccessKey: process.env.R2_SECRET_KEY,
  },
});
