npm.cmd run build
if ($LASTEXITCODE -eq 0) {
    & "C:\Program Files\Git\cmd\git.exe" add .
    & "C:\Program Files\Git\cmd\git.exe" commit -m "Update mobile Hero layout and floating feature bar spacing"
    & "C:\Program Files\Git\cmd\git.exe" push origin main
} else {
    exit 1
}
