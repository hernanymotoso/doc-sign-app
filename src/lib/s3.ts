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
  const key = `doc-sign-app/${fileName}`
  const fileExtension = fileName.split('.').pop()?.toLowerCase()
  const contentType = fileExtension === 'png' ? 'image/png' : 'application/pdf'

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: file,
    ContentType: contentType,
    ACL: 'public-read',
  })

  await s3Client.send(command)

  return `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${key}`
}
