#!/bin/bash

# Make the script executable
chmod +x .devcontainer/setup.sh

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    cp .env.example .env.local
    echo "Created .env.local from .env.example"
fi

# Install dependencies
npm install

# Build the project
npm run build

echo "Setup complete! You can now run 'npm run dev' to start the development server."

