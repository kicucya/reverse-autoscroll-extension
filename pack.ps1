# Pack extension for Chrome Web Store upload
# Excludes: .git, docs, and this script itself

$ExtName = "reverse-autoscroll"
$Version = (Get-Content "manifest.json" | ConvertFrom-Json).version
$ZipName = "${ExtName}-v${Version}.zip"

# Remove old zip if exists
if (Test-Path $ZipName) {
    Remove-Item $ZipName
}

# Files to include
$Include = @(
    "manifest.json",
    "content.js",
    "popup.html",
    "popup.js",
    "LICENSE",
    "README.md",
    "icons",
    "_locales"
)

# Create temp folder
$TempDir = ".\__pack_temp__"
if (Test-Path $TempDir) {
    Remove-Item $TempDir -Recurse -Force
}
New-Item -ItemType Directory -Path $TempDir | Out-Null

# Copy files
foreach ($item in $Include) {
    if (Test-Path $item) {
        Copy-Item -Path $item -Destination $TempDir -Recurse
    }
}

# Create zip
Compress-Archive -Path "$TempDir\*" -DestinationPath $ZipName -Force

# Cleanup
Remove-Item $TempDir -Recurse -Force

Write-Host "Packed: $ZipName" -ForegroundColor Green
