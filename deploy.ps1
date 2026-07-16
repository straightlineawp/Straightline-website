npm.cmd run build
if ($LASTEXITCODE -eq 0) {
    & "C:\Program Files\Git\cmd\git.exe" add .
    & "C:\Program Files\Git\cmd\git.exe" commit -m "Update routing, consolidate About pages, add favicons, force 34m height stat"
    & "C:\Program Files\Git\cmd\git.exe" push origin main
} else {
    Write-Error "Build failed, not pushing to GitHub."
}
