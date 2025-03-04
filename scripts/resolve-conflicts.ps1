# Save current work
Write-Host "Saving current changes..."
git stash

# Reset to a clean state
Write-Host "Resetting to clean state..."
git fetch origin
git checkout main
git reset --hard origin/main

# Create new feature branch
Write-Host "Creating new feature branch..."
git checkout -b feature/project-setup

# Apply core files
Write-Host "Setting up core files..."
$files = @{
    ".github/workflows/ci.yml" = @"
name: CI

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build
"@
}

# Create directories and files
foreach ($file in $files.Keys) {
    $dir = Split-Path $file -Parent
    if (!(Test-Path $dir)) {
        New-Item -ItemType Directory -Force -Path $dir
    }
    $files[$file] | Set-Content $file -Force
}

# Update dependencies
npm install --save-dev @supabase/ssr
npm uninstall @supabase/auth-helpers-nextjs @supabase/auth-helpers-shared
npm audit fix

# Stage and commit changes
git add .
git commit -m "feat: initial project setup with resolved conflicts"

Write-Host "Changes committed. Ready to push."
