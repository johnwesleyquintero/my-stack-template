# First verify/install Node.js
. (Join-Path $PSScriptRoot "verify-nodejs.ps1")

# Add Node.js paths to PATH
$nodePaths = @(
    "C:\Program Files\nodejs",
    "$env:APPDATA\npm"
)

foreach ($path in $nodePaths) {
    if (Test-Path $path) {
        $env:Path = "$path;$env:Path"
    }
}

# Set Node.js environment variables
$env:NODE_PATH = (Get-Command node -ErrorAction SilentlyContinue).Path
$env:NPM_PATH = (Get-Command npm -ErrorAction SilentlyContinue).Path

# Function to verify Node.js installation
function Test-NodeJS {
    try {
        $nodeVersion = node --version
        $npmVersion = npm --version
        Write-Host "Node.js version: $nodeVersion"
        Write-Host "npm version: $npmVersion"
        Write-Host "Node.js path: $env:NODE_PATH"
        Write-Host "npm path: $env:NPM_PATH"
        return $true
    } catch {
        Write-Host "Node.js is not properly installed or not in PATH"
        Write-Host "Please install Node.js from https://nodejs.org/"
        Write-Host "Current PATH: $env:Path"
        return $false
    }
}

# Call verification function
if (-not (Test-NodeJS)) {
    throw "Node.js environment setup failed"
}
