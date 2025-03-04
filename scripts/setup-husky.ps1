# Install dependencies if needed
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..."
    npm install --no-save husky lint-staged
}

# Initialize Husky
Write-Host "Initializing Husky..."
npx husky install

# Create pre-commit hook
$preCommitPath = ".husky/pre-commit"
if (-not (Test-Path $preCommitPath)) {
    Write-Host "Creating pre-commit hook..."
    npx husky add $preCommitPath "npm run pre-commit"
}

# Set proper file permissions
$acl = Get-Acl $preCommitPath
$acl.SetAccessRuleProtection($true, $false)
$rule = New-Object System.Security.AccessControl.FileSystemAccessRule(
    [System.Security.Principal.WindowsIdentity]::GetCurrent().Name,
    "FullControl",
    "Allow"
)
$acl.AddAccessRule($rule)
Set-Acl $preCommitPath $acl

Write-Host "Husky setup complete!"
