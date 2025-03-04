function Install-NodeEnvironment {
    # ...existing verify-nodejs.ps1 content...
}

function Install-GlobalPackages {
    $packages = @(
        "eslint",
        "typescript",
        "prettier"
    )
    
    foreach ($package in $packages) {
        Write-Host "Installing $package globally..."
        npm install -g $package
    }
}

function Update-NpmConfig {
    npm config set fund false --location project
    npm config set audit false --location project
    npm config set update-notifier false --location project
    npm config set progress false --location project
}
