# Document Signing App

A web application for secure document signing and management.

## Getting Started

### Prerequisites

- Docker and Docker Compose
- AWS S3 Bucket

### Installation

1. Clone the repository (SSH):
```bash
git clone git@github.com:hernanymotoso/doc-sign-app.git
cd doc-sign-app
```

2. Set up environment variables:
   - Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   - Fill in the required environment variables:

   ```env
   # Database
   DATABASE_URL="postgresql://test:test123@db:5432/sample_db"

   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"

   # AWS S3
   AWS_ACCESS_KEY_ID="your-access-key"
   AWS_SECRET_ACCESS_KEY="your-secret-key"
   AWS_BUCKET_NAME="your-bucket-name"
   AWS_REGION="your-region"
   ```

### Environment Variables Explained

- `DATABASE_URL`: PostgreSQL connection string (pre-configured for Docker setup)
- `NEXTAUTH_URL`: The base URL of your application
- `NEXTAUTH_SECRET`: A secret key for NextAuth.js (you can generate one with `openssl rand -base64 32`)
- `AWS_ACCESS_KEY_ID`: Your AWS access key for S3
- `AWS_SECRET_ACCESS_KEY`: Your AWS secret key for S3
- `AWS_BUCKET_NAME`: The name of your S3 bucket for storing documents
- `AWS_REGION`: The AWS region of your S3 bucket (e.g., "us-east-1")

### Running with Docker

1. Start the containers:
```bash
docker-compose up -d
```

2. Run database migrations (optional):
```bash
docker-compose exec app yarn prisma migrate dev
```

The application will be available at `http://localhost:3000`.

### Docker Services

- `app`: Next.js application
- `postgres`: PostgreSQL database
- `pgadmin`: PostgreSQL admin interface (optional)

To stop the services:
```bash
docker-compose down
```

## Features

- 📄 Document upload and management
- ✍️ Digital signatures
- 🔒 Secure document storage
- 👥 Multi-user support
- 📱 Responsive design
