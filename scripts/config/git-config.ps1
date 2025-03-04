# Configure git global settings
git config --global core.autocrlf false
git config --global core.eol lf
git config --global core.safecrlf true

# Create .gitattributes
$gitattributes = @"
# Handle line endings automatically for files detected as text
* text=auto eol=lf

# Force batch scripts to always use CRLF line endings
*.{cmd,[cC][mM][dD]} text eol=crlf
*.{bat,[bB][aA][tT]} text eol=crlf
*.{nt,[nN][tT]} text eol=crlf
*.ps1 text eol=crlf

# Force bash scripts to always use LF line endings
*.sh text eol=lf
*.bash text eol=lf

# Archives
*.7z binary
*.gz binary
*.rar binary
*.tar binary
*.zip binary

# Text files where line endings should be preserved
*.patch -text

# Source code
*.js text eol=lf
*.jsx text eol=lf
*.ts text eol=lf
*.tsx text eol=lf
*.json text eol=lf
*.css text eol=lf
*.scss text eol=lf
*.html text eol=lf
*.xml text eol=lf
*.yml text eol=lf
*.yaml text eol=lf
*.md text eol=lf
*.mdx text eol=lf
*.svg text eol=lf

# Docker
*.dockerignore text eol=lf
Dockerfile text eol=lf

# Configuration files
.env* text eol=lf
.gitattributes text eol=lf
.gitignore text eol=lf
.prettierrc text eol=lf
.eslintrc text eol=lf
"@

Set-Content -Path ".gitattributes" -Value $gitattributes -NoNewline
git add .gitattributes
git add -u
