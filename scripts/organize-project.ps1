# Set strict mode and error handling
Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# Project root directory
$projectRoot = $PSScriptRoot | Split-Path -Parent

# Initialize git configuration
git config core.autocrlf false
git config core.eol lf

# Function to create directory and return path
function New-EnsuredDirectory {
    param([string]$Path)
    
    $fullPath = Join-Path $projectRoot $Path
    if (-not (Test-Path $fullPath)) {
        New-Item -ItemType Directory -Force -Path $fullPath | Out-Null
        Write-Host "Created directory: $Path"
    }
    return $fullPath
}

# Function to write file with proper encoding
function Write-ConfigFile {
    param(
        [string]$RelativePath,
        [string]$Content
    )
    
    try {
        $fullPath = Join-Path $projectRoot $RelativePath
        $directory = Split-Path -Parent $fullPath
        
        # Create directory if it doesn't exist
        if (-not (Test-Path $directory)) {
            New-Item -ItemType Directory -Force -Path $directory | Out-Null
            Write-Host "Created directory: $($RelativePath | Split-Path -Parent)"
        }
        
        # Write file with UTF8 encoding without BOM
        $utf8NoBom = New-Object System.Text.UTF8Encoding $false
        [System.IO.File]::WriteAllText($fullPath, $Content, $utf8NoBom)
        Write-Host "Created/Updated: $RelativePath"
    }
    catch {
        Write-Warning "Error writing $RelativePath : $_"
        # Try alternative method if first fails
        try {
            Set-Content -Path $fullPath -Value $Content -NoNewline -Encoding UTF8 -Force
            Write-Host "Created/Updated (alternative method): $RelativePath"
        }
        catch {
            Write-Warning "Alternative method also failed for $RelativePath : $_"
        }
    }
}

# Create base directories (create all levels)
@(
    'src',
    'config',
    'config/git',
    'config/editor',
    'config/env',
    'docs',
    '.github',
    '.github/workflows'
) | ForEach-Object {
    if (-not (Test-Path $_)) {
        New-Item -ItemType Directory -Force -Path $_ | Out-Null
        Write-Host "Created directory: $_"
    }
}

# Define and create configuration files
$configs = @{
    'config/git/.gitignore' = "node_modules/`n.next/`n.env*`n!.env.example"
    'config/git/.gitconfig' = "[core]`n    autocrlf = false`n    eol = lf"
    'config/env/.env.development' = "NODE_ENV=development`nNEXT_PUBLIC_API_URL=http://localhost:3000"
    'config/env/.env.production' = "NODE_ENV=production`nNEXT_PUBLIC_API_URL=https://api.example.com"
    'config/env/.env.example' = "NODE_ENV=development`nNEXT_PUBLIC_API_URL=http://localhost:3000"
}

# Create files
foreach ($file in $configs.Keys) {
    Write-ConfigFile -RelativePath $file -Content $configs[$file]
}

# Final git operations
Push-Location $projectRoot
try {
    git add .
    git add --renormalize .
    Write-Host "`nGit status:"
    git status
}
finally {
    Pop-Location
}

Write-Host "`nProject organization complete!"
