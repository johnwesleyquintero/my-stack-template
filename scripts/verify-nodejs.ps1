# Function to check if Node.js is installed
function Test-NodeJS {
    try {
        $nodeVersion = & node --version
        return $true
    } catch {
        return $false
    }
}

# Function to install Node.js using Chocolatey
function Install-NodeJS {
    try {
        Write-Host "Installing/Updating Node.js LTS..."
        
        # First try to uninstall existing Node.js
        Write-Host "Removing existing Node.js installation..."
        Start-Process "msiexec.exe" -ArgumentList "/x {F8900BDF-6FF9-4D1A-B252-473A9D15C53F} /qn" -Wait
        Start-Process "msiexec.exe" -ArgumentList "/x {B5FC18E3-4D2B-4B67-8033-3B82C634A3D2} /qn" -Wait
        
        # Wait a moment for processes to clean up
        Start-Sleep -Seconds 2
        
        # Download Node.js MSI directly
        $nodejsUrl = "https://nodejs.org/dist/v20.11.1/node-v20.11.1-x64.msi"
        $installerPath = Join-Path $env:TEMP "node-v20.11.1-x64.msi"
        
        Write-Host "Downloading Node.js installer..."
        Invoke-WebRequest -Uri $nodejsUrl -OutFile $installerPath
        
        Write-Host "Installing Node.js..."
        $result = Start-Process "msiexec.exe" -ArgumentList "/i `"$installerPath`" /qn /norestart" -Wait -PassThru
        
        if ($result.ExitCode -eq 0) {
            Write-Host "Node.js installation successful"
            # Refresh environment variables
            Update-Environment
            return $true
        } else {
            Write-Host "Node.js installation failed with exit code: $($result.ExitCode)"
            return $false
        }
    } catch {
        Write-Host "Failed to install Node.js: $_"
        Write-Host "Please install Node.js v20.x manually from https://nodejs.org/"
        return $false
    } finally {
        if (Test-Path $installerPath) {
            Remove-Item $installerPath -Force
        }
    }
}

# Function to refresh environment variables
function Update-Environment {
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + 
                [System.Environment]::GetEnvironmentVariable("Path", "User")
}

# Function to parse Node.js version
function Get-NodeVersion {
    try {
        $versionString = & node --version
        if ($versionString -match 'v(\d+)\.(\d+)\.(\d+)') {
            return @{
                Major = [int]$Matches[1]
                Minor = [int]$Matches[2]
                Patch = [int]$Matches[3]
                Full = $versionString
            }
        }
    } catch {
        return $null
    }
    return $null
}

# Update version checking
function Test-NodeVersion {
    param (
        [string]$requiredVersion = "20"
    )
    
    $version = Get-NodeVersion
    if ($null -eq $version) {
        return $false
    }

    Write-Host "Current Node.js version: $($version.Full)"
    return $version.Major -eq [int]$requiredVersion
}

# Main script
if (-not (Test-NodeJS)) {
    Write-Host "Node.js is not installed or not in PATH"
    Install-NodeJS
} elseif (-not (Test-NodeVersion)) {
    Write-Host "Node.js version 20.x is required"
    $update = Read-Host "Would you like to update Node.js now? (Y/N)"
    if ($update -eq 'Y' -or $update -eq 'y') {
        Install-NodeJS
    }
}

# Verify installation
$nodeVersion = & node --version
$npmVersion = & npm --version
Write-Host "Node.js version: $nodeVersion"
Write-Host "npm version: $npmVersion"
