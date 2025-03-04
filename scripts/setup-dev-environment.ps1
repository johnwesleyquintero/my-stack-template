# Self-elevate if not running as administrator
function Test-Administrator {
    $user = [Security.Principal.WindowsIdentity]::GetCurrent()
    $principal = New-Object Security.Principal.WindowsPrincipal($user)
    return $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

if (-not (Test-Administrator)) {
    Write-Host "Requesting administrative privileges..."
    Start-Process powershell.exe "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs
    exit
}

# Function to test if a command exists
function Test-Command($command) {
    try {
        Get-Command $command -ErrorAction Stop
        return $true
    } catch {
        return $false
    }
}

# Add architecture detection
function Get-SystemArchitecture {
    if ([System.Environment]::Is64BitOperatingSystem) {
        if ([System.Runtime.InteropServices.RuntimeInformation]::ProcessArchitecture -eq [System.Runtime.InteropServices.Architecture]::Arm64) {
            return "arm64"
        }
        return "x64"
    }
    return "x86"
}

# Function to install PowerShell
function Install-PowerShell {
    $arch = Get-SystemArchitecture
    Write-Host "Detected system architecture: $arch"
    
    try {
        if ($arch -eq "arm64") {
            Write-Host "Installing PowerShell Core for ARM64..."
            winget install --id Microsoft.PowerShell --architecture arm64
        } else {
            Write-Host "Installing PowerShell Core for x64..."
            choco install powershell-core -y
        }
    } catch {
        Write-Host "Failed to install PowerShell Core: $_"
        Write-Host "Please install PowerShell Core manually from https://github.com/PowerShell/PowerShell/releases"
    }
}

# Function to install or upgrade Chocolatey
function Update-Chocolatey {
    if (-not (Test-Command "choco")) {
        Write-Host "Installing Chocolatey..."
        Set-ExecutionPolicy Bypass -Scope Process -Force
        [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
        Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
    } else {
        Write-Host "Upgrading Chocolatey..."
        choco upgrade chocolatey -y
    }
}

# Function to refresh environment variables
function Update-Environment {
    $locations = 'HKLM:\SYSTEM\CurrentControlSet\Control\Session Manager\Environment',
                'HKCU:\Environment'

    $locations | ForEach-Object {
        $k = Get-Item $_
        $k.GetValueNames() | ForEach-Object {
            $name  = $_
            $value = $k.GetValue($_)
            Set-Item -Path Env:$name -Value $value
        }
    }

    $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + 
                [System.Environment]::GetEnvironmentVariable("Path", "User")
}

# Function to install development dependencies
function Install-DevDependencies {
    Write-Host "Installing/Updating development dependencies..."
    
    # PowerShell Core
    if (-not (Test-Command "pwsh")) {
        Install-PowerShell
    }
    
    # Visual Studio Build Tools
    choco install visualstudio2019-workload-vctools --no-progress -y
    
    # Python
    choco install python --version=3.13.1 --no-progress -y
    
    # Node.js - use Chocolatey instead of winget
    Write-Host "Setting up Node.js..."
    . (Join-Path $PSScriptRoot "verify-nodejs.ps1")
    
    # Git
    if (-not (Test-Command "git")) {
        choco install git -y
    }

    # Refresh environment without using refreshenv or wmic
    Update-Environment
}

# Function to validate development environment
function Test-DevEnvironment {
    $checks = @(
        @{Name = "Node.js"; Command = "node --version"; Required = "v20" },
        @{Name = "npm"; Command = "npm --version"; Required = "10" },
        @{Name = "Python"; Command = "python --version"; Required = "Python 3" },
        @{Name = "Git"; Command = "git --version"; Required = "git version" }
    )

    $allValid = $true
    Write-Host "`nValidating development environment..."

    foreach ($check in $checks) {
        try {
            $version = & ([ScriptBlock]::Create($check.Command)) 2>&1
            $isValid = $version -like "*$($check.Required)*"
            Write-Host "$($check.Name): $version - $(if ($isValid) { "OK" } else { "Version Mismatch" })"
            $allValid = $allValid -and $isValid
        } catch {
            Write-Host "$($check.Name): Not Found"
            $allValid = $false
        }
    }

    return $allValid
}

# Function to initialize project
function Initialize-Project {
    Write-Host "`nInitializing project configuration..."
    
    # Install eslint globally if not present
    if (-not (Get-Command eslint -ErrorAction SilentlyContinue)) {
        Write-Host "Installing eslint globally..."
        npm install -g eslint
    }
    
    # Configure npm
    Write-Host "Configuring npm..."
    npm config set fund false --location project
    npm config set audit false --location project
    npm config set update-notifier false --location project
    npm config set progress false --location project
    
    # Initialize npm if needed
    if (-not (Test-Path "package.json")) {
        Write-Host "Initializing npm project..."
        npm init -y
    }
    
    # Install dependencies without warnings
    Write-Host "Installing development dependencies..."
    npm install --no-fund --no-audit --silent
    
    # Clean npm cache quietly
    npm cache clean --force --silent
    
    Write-Host "Project initialization complete!"
}

# Main script
try {
    Write-Host "Setting up development environment as Administrator..."
    
    # Run Chocolatey commands without prompts
    Update-Chocolatey
    $env:CHOCOLATEY_CONFIRM_ALL = 'true'
    
    Install-DevDependencies
    
    Write-Host "`nVerifying installations..."
    Write-Host "Python: $(python --version 2>&1)"
    Write-Host "Node.js: $(node --version 2>&1)"
    Write-Host "Git: $(git --version 2>&1)"
    
    if (Test-DevEnvironment) {
        Initialize-Project
        Write-Host "`nDevelopment environment setup complete and validated!"
    } else {
        Write-Host "`nWarning: Some components may not be properly installed."
        Write-Host "Please check the validation results above and fix any issues."
    }
    
    # Pause at the end to see the output
    Write-Host "Press any key to continue..."
    $null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')
} catch {
    Write-Host "Error: $_"
    Write-Host "Press any key to continue..."
    $null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')
    exit 1
}
