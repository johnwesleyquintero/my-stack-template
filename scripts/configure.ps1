param(
    [string]$ConfigName,
    [string]$TargetPath = $PWD
)

$ConfigRoot = Join-Path $PSScriptRoot ".." "config"
$TemplatesPath = Join-Path $ConfigRoot "templates"
$ConfigsPath = Join-Path $ConfigRoot "configs"

# Configuration definitions
$Configurations = @{
    "git" = @{
        "files" = @(
            ".gitconfig",
            ".gitattributes",
            ".gitignore"
        )
        "commands" = @(
            { git config --global core.autocrlf true }
        )
    }
    "node" = @{
        "files" = @(
            ".npmrc",
            "package.json",
            "tsconfig.json"
        )
        "commands" = @(
            { npm install -g eslint }
        )
    }
    "editor" = @{
        "files" = @(
            ".vscode/settings.json",
            ".editorconfig",
            ".prettierrc"
        )
    }
    "terminal" = @{
        "files" = @(
            "terminal-settings.json"
        )
        "commands" = @(
            { . $PSScriptRoot/setup-terminal.ps1 }
        )
    }
    "env" = @{
        "files" = @(
            ".env.development",
            ".env.example"
        )
    }
    "all" = @{
        "dependencies" = @("git", "node", "editor", "terminal", "env")
    }
}

function Install-Configuration {
    param(
        [string]$Name,
        [string]$Target
    )

    Write-Host "Installing configuration: $Name"
    
    $config = $Configurations[$Name]
    
    # Handle dependencies
    if ($config.dependencies) {
        foreach ($dep in $config.dependencies) {
            Install-Configuration -Name $dep -Target $Target
        }
        return
    }

    # Copy template files
    if ($config.files) {
        foreach ($file in $config.files) {
            $source = Join-Path $TemplatesPath $file
            $dest = Join-Path $Target $file
            
            if (Test-Path $source) {
                $destDir = Split-Path $dest -Parent
                if (-not (Test-Path $destDir)) {
                    New-Item -ItemType Directory -Path $destDir -Force | Out-Null
                }
                Copy-Item -Path $source -Destination $dest -Force
                Write-Host "Copied: $file"
            }
        }
    }

    # Run configuration commands
    if ($config.commands) {
        foreach ($cmd in $config.commands) {
            & $cmd
        }
    }
}

# Main execution
if (-not $ConfigName) {
    Write-Host "Available configurations:"
    $Configurations.Keys | ForEach-Object { Write-Host "  - $_" }
    exit 0
}

if (-not $Configurations.ContainsKey($ConfigName)) {
    Write-Host "Error: Unknown configuration '$ConfigName'"
    exit 1
}

Install-Configuration -Name $ConfigName -Target $TargetPath
