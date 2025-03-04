# Function to convert line endings to LF
function Convert-ToLF {
    param (
        [string]$FilePath
    )
    
    Write-Host "Converting line endings for: $FilePath"
    
    try {
        # Read the file content
        $content = [IO.File]::ReadAllText($FilePath)
        # Convert to LF
        $content = $content.Replace("`r`n", "`n")
        # Write back to file with LF endings
        [IO.File]::WriteAllText($FilePath, $content, [Text.Encoding]::UTF8)
        Write-Host "Converted successfully: $FilePath"
    }
    catch {
        Write-Host "Error converting file: $FilePath"
        Write-Host $_.Exception.Message
    }
}

# Get project root directory
$projectRoot = Split-Path -Parent $PSScriptRoot

# Files to convert with proper path joining
$filesToConvert = @(
    (Join-Path $PSScriptRoot "setup-env.sh"),
    (Join-Path (Join-Path $projectRoot ".husky") "pre-commit"),
    (Join-Path $projectRoot ".gitattributes")
)

Write-Host "Converting files in: $projectRoot"

# Convert each file
foreach ($file in $filesToConvert) {
    if (Test-Path $file) {
        Convert-ToLF $file
    } else {
        Write-Host "File not found: $file"
    }
}

# Update git config
git config --local core.autocrlf input
git config --local core.eol lf

# Files to update in git (using relative paths)
$filesToUpdate = @(
    ".gitattributes",
    "scripts/setup-env.sh",
    ".husky/pre-commit"
)

# Update git index
foreach ($file in $filesToUpdate) {
    if (Test-Path (Join-Path $projectRoot $file)) {
        git add $file
        git update-index --chmod=+x $file
        Write-Host "Updated git index for: $file"
    } else {
        Write-Host "Warning: Git file not found: $file"
    }
}

Write-Host "`nLine ending conversion complete."
