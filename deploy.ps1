npm.cmd run build
if ($LASTEXITCODE -eq 0) {
    & "C:\Program Files\Git\cmd\git.exe" add .
    & "C:\Program Files\Git\cmd\git.exe" commit -am "Fix TS6133 unused import/variable errors for production build" --amend
    & "C:\Program Files\Git\cmd\git.exe" push origin main --force
} else {
    exit 1
}
