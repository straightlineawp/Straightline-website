npm.cmd run build
if ($LASTEXITCODE -eq 0) {
    & "C:\Program Files\Git\cmd\git.exe" add .
    & "C:\Program Files\Git\cmd\git.exe" commit -m "Update UI: tech specs layout, forms, mobile hero, and footer"
    & "C:\Program Files\Git\cmd\git.exe" push origin main
} else {
    Write-Error "Build failed, not pushing to GitHub."
}
