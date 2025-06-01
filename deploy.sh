#!/bin/bash

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Initialize database manually
echo "Initializing database manually..."
node init-db.js

# Start the server
echo "Starting the server..."
node index.js