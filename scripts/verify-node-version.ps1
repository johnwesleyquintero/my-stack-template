# Add common Node.js paths
$nodePaths = @(
    "C:\Program Files\nodejs",
    "$env:APPDATA\npm",
    "$env:LOCALAPPDATA\Programs\nodejs",
    "C:\Program Files (x86)\nodejs"
)

# Add paths to environment
$nodePaths | ForEach-Object {
    if (Test-Path $_) {
        $env:Path = "$_;$env:Path"
    }
}

# Verify Node.js installation
$nodeExe = Get-Command node -ErrorAction SilentlyContinue
if (-not $nodeExe) {
    Write-Host "Node.js not found in PATH: $env:Path"
    Write-Host "Please install Node.js from https://nodejs.org/"
    exit 1
}

Write-Host "Using Node.js from: $($nodeExe.Path)"
Write-Host "Node.js version: $(node --version)"
Write-Host "npm version: $(npm --version)"

# Install global packages if needed
if (-not (Get-Command eslint -ErrorAction SilentlyContinue)) {
    Write-Host "Installing eslint globally..."
    npm install -g eslint
}

# Refresh environment variables
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Run the version check
try {
    node scripts/verify-node-version.js
} catch {
    Write-Host "Error running version check: $_"
    exit 1
}
