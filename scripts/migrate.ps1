# sim-ds migration script
# Herhangi bir simülasyon reposunu @weevolution/sim-ds ile bağlar.
#
# Kullanım:
#   .\migrate.ps1 -RepoPath "C:\path\to\black-swan-repo" -SimId "black-swan"
#
# Desteklenen sim ID'leri:
#   black-swan | hard-call | war-room | predator |
#   allocation-game | fast-forward | org-surgery

param(
    [Parameter(Mandatory=$true)]
    [string]$RepoPath,

    [Parameter(Mandatory=$true)]
    [ValidateSet("black-swan","hard-call","war-room","predator","allocation-game","fast-forward","org-surgery")]
    [string]$SimId
)

$SimDsPath = "C:\Users\arasm\Documents\stuff\sim-ds"
$ErrorActionPreference = "Stop"

# ── Renkler ──────────────────────────────────────────────────────
function Write-Step  { param($msg) Write-Host "`n[$SimId] $msg" -ForegroundColor Cyan }
function Write-Ok    { param($msg) Write-Host "  OK  $msg" -ForegroundColor Green }
function Write-Warn  { param($msg) Write-Host "  WARN $msg" -ForegroundColor Yellow }
function Write-Fail  { param($msg) Write-Host "  FAIL $msg" -ForegroundColor Red }

Write-Host "`n=== sim-ds migration: $SimId ===" -ForegroundColor Magenta

# ── 1. Frontend klasörünü bul ─────────────────────────────────────
Write-Step "Frontend klasörü aranıyor..."

$FrontendPath = $null

# Önce demo-frontend/ dene (Predator pattern)
if (Test-Path "$RepoPath\demo-frontend\package.json") {
    $FrontendPath = "$RepoPath\demo-frontend"
}
# Sonra src/ olan root'u dene
elseif (Test-Path "$RepoPath\package.json") {
    $pkg = Get-Content "$RepoPath\package.json" | ConvertFrom-Json
    if ($pkg.devDependencies.tailwindcss -or $pkg.dependencies.tailwindcss) {
        $FrontendPath = $RepoPath
    }
}
# Alt klasörlerde tara
else {
    $found = Get-ChildItem -Path $RepoPath -Recurse -Depth 2 -Name "package.json" |
             Where-Object { $_ -notlike "*node_modules*" } |
             Select-Object -First 1
    if ($found) {
        $FrontendPath = Split-Path "$RepoPath\$found"
    }
}

if (-not $FrontendPath) {
    Write-Fail "package.json bulunamadı: $RepoPath"
    exit 1
}
Write-Ok "Frontend: $FrontendPath"

# ── 2. Tailwind config var mı kontrol et ─────────────────────────
Write-Step "Tailwind config kontrol ediliyor..."

$TailwindConfig = $null
foreach ($name in @("tailwind.config.js","tailwind.config.ts","tailwind.config.mjs")) {
    if (Test-Path "$FrontendPath\$name") {
        $TailwindConfig = "$FrontendPath\$name"
        break
    }
}

if (-not $TailwindConfig) {
    Write-Fail "Tailwind config bulunamadı: $FrontendPath"
    exit 1
}
Write-Ok "Config: $TailwindConfig"

# ── 3. Entry point (main.tsx / main.ts / index.tsx) bul ──────────
Write-Step "Entry point aranıyor..."

$EntryPoint = $null
foreach ($name in @("src\main.tsx","src\main.ts","src\index.tsx","src\index.ts")) {
    if (Test-Path "$FrontendPath\$name") {
        $EntryPoint = "$FrontendPath\$name"
        break
    }
}

if (-not $EntryPoint) {
    Write-Warn "Entry point bulunamadı. CSS import'u manuel eklenecek."
}
else {
    Write-Ok "Entry: $EntryPoint"
}

# ── 4. sim-ds yolunu hesapla ──────────────────────────────────────
function Get-RelPath {
    param([string]$From, [string]$To)
    $fromParts = $From.TrimEnd('\').Split('\')
    $toParts   = $To.TrimEnd('\').Split('\')
    $i = 0
    while ($i -lt $fromParts.Length -and $i -lt $toParts.Length -and
           $fromParts[$i] -eq $toParts[$i]) { $i++ }
    $up   = @(".." ) * ($fromParts.Length - $i)
    $down = $toParts[$i..($toParts.Length - 1)]
    return ($up + $down) -join "/"
}
$RelativePath = Get-RelPath -From $FrontendPath -To $SimDsPath

# ── 5. package.json güncelle ──────────────────────────────────────
Write-Step "package.json güncelleniyor..."

$PkgFile = "$FrontendPath\package.json"
$PkgContent = Get-Content $PkgFile -Raw

if ($PkgContent -like "*@weevolution/sim-ds*") {
    Write-Warn "sim-ds zaten ekli, atlanıyor."
}
else {
    # "dependencies": { satırından sonra ekle
    $NewDep = "`"@weevolution/sim-ds`": `"file:$RelativePath`","
    $PkgContent = $PkgContent -replace '("dependencies"\s*:\s*\{)', "`$1`n    $NewDep"
    Set-Content $PkgFile $PkgContent -Encoding utf8
    Write-Ok "Bağımlılık eklendi: file:$RelativePath"
}

# ── 6. tailwind.config.js güncelle ───────────────────────────────
Write-Step "Tailwind config güncelleniyor..."

$TwContent = Get-Content $TailwindConfig -Raw

if ($TwContent -like "*sim-ds*") {
    Write-Warn "sim-ds preset zaten ekli, atlanıyor."
}
else {
    # Import satırını en başa ekle
    $Import = "import simDsConfig from '@weevolution/sim-ds/tailwind'`n`n"

    # Preset'i ekle
    if ($TwContent -like "*presets:*") {
        Write-Warn "presets zaten var. simDsConfig'i mevcut listeye manuel ekleyin."
    }
    else {
        # export default { veya export default defineConfig({ sonrasına ekle
        $TwContent = $TwContent -replace '(export default\s+(?:defineConfig\()?)\{', "$`$1{`n  presets: [simDsConfig],"
    }

    $TwContent = $Import + $TwContent
    Set-Content $TailwindConfig $TwContent -Encoding utf8
    Write-Ok "Preset eklendi."
}

# ── 7. Entry point'e CSS import ekle ─────────────────────────────
Write-Step "CSS import'ları ekleniyor..."

if ($EntryPoint) {
    $EntryContent = Get-Content $EntryPoint -Raw

    if ($EntryContent -like "*sim-ds/css*") {
        Write-Warn "CSS import'ları zaten ekli, atlanıyor."
    }
    else {
        $CssImports = "import '@weevolution/sim-ds/css/shared.css';`nimport '@weevolution/sim-ds/css/themes/$SimId.css';`n"

        # İlk import satırından önce ekle
        $EntryContent = $EntryContent -replace "(import\s)", "$CssImports`$1"
        # Sadece bir kere ekle
        $EntryContent = $EntryContent -replace "($([regex]::Escape($CssImports))){2,}", $CssImports
        Set-Content $EntryPoint $EntryContent -Encoding utf8
        Write-Ok "CSS import'ları eklendi."
    }
}

# ── 8. npm install ────────────────────────────────────────────────
Write-Step "npm install çalıştırılıyor..."

Push-Location $FrontendPath
try {
    $result = npm install 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Ok "Bağımlılıklar kuruldu."
    }
    else {
        Write-Fail "npm install başarısız:`n$result"
        exit 1
    }
}
finally {
    Pop-Location
}

# ── Özet ─────────────────────────────────────────────────────────
Write-Host "`n=== Tamamlandı: $SimId ===" -ForegroundColor Green
Write-Host "  Sonraki adım: npm run dev çalıştırıp <div class=`"bg-sim-primary`"> test edin." -ForegroundColor White
