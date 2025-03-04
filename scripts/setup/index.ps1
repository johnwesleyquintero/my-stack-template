$ScriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$RootPath = Split-Path -Parent (Split-Path -Parent $ScriptPath)

# Import modules
. "$ScriptPath\node-setup.ps1"
. "$ScriptPath\git-setup.ps1"
. "$ScriptPath\vs-setup.ps1"
. "$ScriptPath\terminal-setup.ps1"

function Start-Setup {
    Write-Host "Starting Next Nebula development environment setup..."
    
    # Run setup scripts in order
    Install-NodeEnvironment
    Install-GitEnvironment
    Install-VSCodeExtensions
    Install-TerminalProfile
    
    Write-Host "Setup complete! Your development environment is ready."
}

# Execute if running directly
if ($MyInvocation.InvocationName -eq $MyInvocation.MyCommand.Path) {
    Start-Setup
}
