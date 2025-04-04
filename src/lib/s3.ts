import { S3Client } from '@aws-sdk/client-s3'
import { PutObjectCommand } from '@aws-sdk/client-s3'

if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !process.env.AWS_BUCKET_NAME) {
  throw new Error('Missing AWS credentials')
}

export const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})

export async function uploadToS3(file: Buffer, fileName: string): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `doc-sign-app/documents/${fileName}`,
    Body: file,
    ContentType: 'application/pdf',
    ACL: 'public-read',
  })

  await s3Client.send(command)

  return `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/doc-sign-app/documents/${fileName}`
}
