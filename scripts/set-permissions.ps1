# Get the project root directory using the current file's location
$projectRoot = (Get-Item $PSScriptRoot).Parent.FullName

Write-Host "Project root: $projectRoot"

# Files to set permissions for
$files = @(
    (Join-Path -Path $projectRoot -ChildPath ".husky\pre-commit"),
    (Join-Path -Path $projectRoot -ChildPath "scripts\setup-env.sh")
)

# Create directories if they don't exist
New-Item -ItemType Directory -Force -Path (Join-Path -Path $projectRoot -ChildPath ".husky") | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path -Path $projectRoot -ChildPath "scripts") | Out-Null

foreach ($file in $files) {
    # Create the file if it doesn't exist
    if (-not (Test-Path $file)) {
        Write-Host "Creating file: $file"
        New-Item -ItemType File -Force -Path $file | Out-Null
    }
    
    # Convert to Windows path format
    $windowsPath = $file.Replace('/', '\')
    
    try {
        # Set execute permission using ICACLS
        $result = icacls $windowsPath /grant "Everyone:(RX)" /T
        Write-Host "Set execute permissions for $windowsPath"
        
        # Convert to Git-style path for git commands
        $gitPath = $windowsPath.Replace('\', '/')
        $relativePath = $gitPath.Replace("$($projectRoot.Replace('\', '/'))/", "")
        
        # Add execute permission in Git
        git add $relativePath
        git update-index --chmod=+x $relativePath
        
        Write-Host "Updated Git index for $relativePath"
    }
    catch {
        Write-Host "Error processing $windowsPath : $_"
    }
}

Write-Host "`nPermissions update complete. Created and configured required files."
