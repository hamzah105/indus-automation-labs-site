Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$repositoryRoot = Split-Path -Parent $PSScriptRoot
$packageRoot = Join-Path $repositoryRoot "packages\matterflux"
$distPath = Join-Path $packageRoot "dist"
$downloadsPath = Join-Path $repositoryRoot "public\downloads"
$zipPath = Join-Path $downloadsPath "matterflux-v0.1.0.zip"

if (-not (Test-Path -LiteralPath $distPath -PathType Container)) {
  throw "MatterFlux dist directory is missing. Run npm run matterflux:build first."
}

New-Item -ItemType Directory -Path $downloadsPath -Force | Out-Null

if (Test-Path -LiteralPath $zipPath) {
  Remove-Item -LiteralPath $zipPath -Force
}

$releaseFiles = @(
  $distPath,
  (Join-Path $packageRoot "examples"),
  (Join-Path $packageRoot "README.md"),
  (Join-Path $packageRoot "LICENSE"),
  (Join-Path $packageRoot "package.json")
)

Compress-Archive -LiteralPath $releaseFiles -DestinationPath $zipPath -CompressionLevel Optimal
Write-Output "Created $zipPath"
