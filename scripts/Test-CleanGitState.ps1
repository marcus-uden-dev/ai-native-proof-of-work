[CmdletBinding()]
param(
    [Parameter()]
    [string]$RepositoryPath = (Get-Location).Path
)

$ErrorActionPreference = 'Stop'

try {
    $repoRoot = (& git -C $RepositoryPath rev-parse --show-toplevel 2>$null).Trim()
} catch {
    Write-Error "Unable to inspect Git state at '$RepositoryPath'."
    exit 2
}

if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($repoRoot)) {
    Write-Error "Not a Git repository: '$RepositoryPath'."
    exit 2
}

$branch = & git -C $repoRoot status --short --branch | Select-Object -First 1
$changes = @(& git -C $repoRoot status --porcelain=v1 --untracked-files=all)

if ($LASTEXITCODE -ne 0) {
    Write-Error "Git status failed for '$repoRoot'."
    exit 2
}

Write-Output $branch

if ($changes.Count -gt 0) {
    Write-Output $changes
    Write-Error "Repository is not clean. Resolve or intentionally commit the listed changes before continuing."
    exit 1
}

Write-Output 'Repository working tree is clean.'
exit 0
