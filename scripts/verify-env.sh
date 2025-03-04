#!/bin/bash

echo "Verifying Node.js environment..."

# Check if Node.js exists
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed or not in PATH!"
    exit 1
fi

# Run the verification script
node "$(dirname "$0")/verify-env.js"
