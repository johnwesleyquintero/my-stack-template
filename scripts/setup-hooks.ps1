# Initialize Husky
$huskyDir = ".husky"
if (-not (Test-Path $huskyDir)) {
    New-Item -ItemType Directory -Force -Path $huskyDir | Out-Null
}

# Create pre-commit hook
$preCommitContent = @'
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run pre-commit
'@ -replace "`r`n", "`n"

Set-Content -Path "$huskyDir/pre-commit" -Value $preCommitContent -NoNewline -Encoding utf8

# Create commit-msg hook
$commitMsgContent = @'
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no -- commitlint --edit "$1"
'@ -replace "`r`n", "`n"

Set-Content -Path "$huskyDir/commit-msg" -Value $commitMsgContent -NoNewline -Encoding utf8

# Make hooks executable
git add "$huskyDir/pre-commit"
git add "$huskyDir/commit-msg"
git update-index --chmod=+x "$huskyDir/pre-commit"
git update-index --chmod=+x "$huskyDir/commit-msg"
