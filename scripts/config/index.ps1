$ScriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$ConfigPath = Join-Path $ScriptPath "definitions"

# Import configuration definitions
. "$ConfigPath\git.ps1"
. "$ConfigPath\node.ps1"
. "$ConfigPath\editor.ps1"
. "$ConfigPath\terminal.ps1"

function Install-Configuration {
    param(
        [Parameter(Mandatory=$true)]
        [string]$ConfigType,
        [string]$TargetPath = $PWD
    )
    
    $configs = @{
        "git" = { Install-GitConfig $TargetPath }
        "node" = { Install-NodeConfig $TargetPath }
        "editor" = { Install-EditorConfig $TargetPath }
        "terminal" = { Install-TerminalConfig $TargetPath }
        "all" = { 
            Install-GitConfig $TargetPath
            Install-NodeConfig $TargetPath
            Install-EditorConfig $TargetPath
            Install-TerminalConfig $TargetPath
        }
    }
    
    if ($configs.ContainsKey($ConfigType)) {
        & $configs[$ConfigType]
    } else {
        Write-Host "Unknown configuration type: $ConfigType"
        Write-Host "Available types: $($configs.Keys -join ', ')"
    }
}
