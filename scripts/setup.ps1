# Reset git state
git reset --hard HEAD
git clean -fdx

# Create fresh branch
$timestamp = Get-Date -Format "yyyyMMddHHmmss"
$branchName = "feat/setup-$timestamp"
git checkout -b $branchName

# Create required directories
$dirs = @(
    "src",
    "src/app",
    "src/components",
    "src/lib",
    ".github/workflows"
)

foreach ($dir in $dirs) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
}

# Install dependencies
npm install --no-fund --no-audit

Write-Host "Setup complete on branch: $branchName"
