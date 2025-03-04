Write-Host "Setting up Next.js Nebula Starter..." -ForegroundColor Cyan

# Check if running as admin
if (-NOT ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Warning "Please run as Administrator!"
    Exit
}

# Remove duplicate package.json if it exists
if (Test-Path "lib/package.json") {
    Remove-Item "lib/package.json" -Force
    Write-Host "Removed duplicate package.json from lib folder" -ForegroundColor Green
}

# Check if nvm is installed
if (!(Get-Command nvm -ErrorAction SilentlyContinue)) {
    Write-Host "NVM for Windows is not installed. Please install it first from:" -ForegroundColor Yellow
    Write-Host "https://github.com/coreybutler/nvm-windows/releases/latest" -ForegroundColor Yellow
    Exit
}

# Clean installation
Write-Host "Cleaning installation..." -ForegroundColor Cyan
Remove-Item -Path ".next" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "node_modules" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "package-lock.json" -Force -ErrorAction SilentlyContinue
npm cache clean --force

# Install and use Node.js 20.11.1
Write-Host "Installing Node.js 20.11.1..." -ForegroundColor Cyan
nvm install 20.11.1
nvm use 20.11.1

# Install npm 10.2.4
Write-Host "Installing npm 10.2.4..." -ForegroundColor Cyan
npm install -g npm@10.2.4

# Verify versions
$nodeVersion = node -v
$npmVersion = npm -v
Write-Host "Node.js version: $nodeVersion" -ForegroundColor Green
Write-Host "npm version: $npmVersion" -ForegroundColor Green

# Install project dependencies
Write-Host "Installing project dependencies..." -ForegroundColor Cyan
npm install

# Install TypeScript ESLint packages
Write-Host "Installing TypeScript ESLint packages..." -ForegroundColor Cyan
npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin

Write-Host "Setup complete! 🚀" -ForegroundColor Green
Write-Host "You can now run 'npm run dev' to start the development server." -ForegroundColor Cyan
