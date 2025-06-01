#!/bin/bash

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Push schema to database
echo "Pushing schema to database..."
npx prisma db push --accept-data-loss

# Start the server
echo "Starting the server..."
node index.js
