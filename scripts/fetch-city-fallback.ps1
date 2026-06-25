# Fallback fetch for cities whose Wikipedia article had no usable lead image.
# Uses Commons search (namespace 6) and picks the first real photo, skipping
# maps/seals/logos. Appends to src/lib/city-images.json.
$ErrorActionPreference = "Stop"
$UA = "OnyxVikingSiteBot/1.0 (https://onyxvikingservice.com; contact@onyxvikingservice.com)"
$root = Split-Path $PSScriptRoot -Parent
$outDir = Join-Path $root "public\cities"

$targets = @(
  @{ slug = "holmby-hills";         name = "Holmby Hills";         q = "Holmby Hills Los Angeles" }
  @{ slug = "la-canada-flintridge"; name = "La Cañada Flintridge"; q = "La Cañada Flintridge California" }
)
$bad = "map","seal","logo","flag","coat_of_arms","coat of arms","locator","location_map","diagram","icon"

function Strip-Html([string]$s) {
  if (-not $s) { return "" }
  $t = [regex]::Replace($s, "<[^>]+>", "")
  $t = [System.Net.WebUtility]::HtmlDecode($t)
  return ($t -replace "\s+", " ").Trim()
}

$jsonPath = Join-Path $root "src\lib\city-images.json"
$manifest = Get-Content $jsonPath -Raw | ConvertFrom-Json
# convert to ordered hashtable we can add to
$m = [ordered]@{}
foreach ($p in $manifest.PSObject.Properties) { $m[$p.Name] = $p.Value }

foreach ($t in $targets) {
  try {
    $q = [uri]::EscapeDataString($t.q)
    $url = "https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrlimit=25&gsrsearch=$q&prop=imageinfo&iiprop=url|extmetadata|mime&iiurlwidth=1280"
    $res = Invoke-RestMethod -Uri $url -UserAgent $UA -TimeoutSec 60
    $pages = @($res.query.pages.PSObject.Properties | ForEach-Object { $_.Value }) | Sort-Object { $_.index }
    $chosen = $null
    foreach ($p in $pages) {
      $title = $p.title
      $low = $title.ToLower()
      if ($p.imageinfo -and $p.imageinfo[0].mime -match "image/(jpeg|png)") {
        $skip = $false
        foreach ($b in $bad) { if ($low -match [regex]::Escape($b)) { $skip = $true; break } }
        if (-not $skip) { $chosen = $p; break }
      }
    }
    if (-not $chosen) { Write-Host "NONE  $($t.name)"; continue }

    $ii = $chosen.imageinfo[0]
    $thumb = $ii.thumburl
    $ext = [System.IO.Path]::GetExtension(($thumb -split "\?")[0]).ToLower()
    if ($ext -eq "" -or $ext -eq ".svg") { $ext = ".jpg" }
    $destRel = "/cities/$($t.slug)$ext"
    $dest = Join-Path $outDir "$($t.slug)$ext"
    Invoke-WebRequest -Uri $thumb -UserAgent $UA -OutFile $dest -TimeoutSec 90

    $artist = ""; $license = ""
    $em = $ii.extmetadata
    if ($em.Artist) { $artist = Strip-Html $em.Artist.value }
    if ($em.LicenseShortName) { $license = Strip-Html $em.LicenseShortName.value }
    $fileTitle = ($chosen.title -replace "^File:", "") -replace " ", "_"

    $m[$t.name] = [ordered]@{
      img     = $destRel
      artist  = $artist
      license = $license
      source  = "https://commons.wikimedia.org/wiki/File:$fileTitle"
    }
    $kb = [math]::Round((Get-Item $dest).Length / 1KB)
    "OK    {0,-22} {1,6}KB  {2} ({3})  [{4}]" -f $t.name, $kb, $artist, $license, $chosen.title
  } catch {
    Write-Host ("FAIL  {0}: {1}" -f $t.name, $_.Exception.Message)
  }
}

$json = $m | ConvertTo-Json -Depth 5
[System.IO.File]::WriteAllText($jsonPath, $json, (New-Object System.Text.UTF8Encoding($false)))
"`n--- manifest now has $($m.Count) entries ---"
