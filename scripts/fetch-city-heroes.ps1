# Downloads a real, licensed representative photo for ALL serviced cities from
# Wikimedia (each city's Wikipedia lead image), re-encoded to JPEG, into BOTH
#   public/images/cities/<slug>-hero.jpg   (per-city-page hero + OG image)
#   public/cities/<slug>.jpg               (cities-index thumbnail)
# and rewrites src/lib/city-images.json with CC attribution (by city name).
$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing
$UA   = "OnyxVikingSiteBot/1.0 (https://onyxvikingservice.com; contact@onyxvikingservice.com)"
$root = Split-Path $PSScriptRoot -Parent
$heroDir  = Join-Path $root "public\images\cities"
$thumbDir = Join-Path $root "public\cities"
New-Item -ItemType Directory -Force -Path $heroDir  | Out-Null
New-Item -ItemType Directory -Force -Path $thumbDir | Out-Null
$tmp = Join-Path $env:TEMP "city_dl.tmp"

# jpeg encoder q85
$jpgCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 85L)

# slug => name (exact, for city-images.json key)
$names = @{}
$citiesJson = Get-Content (Join-Path $root "src\data\cities.json") -Raw | ConvertFrom-Json
foreach ($c in $citiesJson) { $names[$c.slug] = $c.name }

# slug => Wikipedia article title (disambiguated)
$articles = [ordered]@{
  "agoura-hills"="Agoura Hills, California"; "altadena"="Altadena, California"
  "bel-air"="Bel Air, Los Angeles"; "beverly-hills"="Beverly Hills, California"
  "brentwood"="Brentwood, Los Angeles"; "calabasas"="Calabasas, California"
  "century-city"="Century City, Los Angeles"; "chatsworth"="Chatsworth, Los Angeles"
  "culver-city"="Culver City, California"; "el-segundo"="El Segundo, California"
  "encino"="Encino, Los Angeles"; "glendale"="Glendale, California"
  "granada-hills"="Granada Hills, Los Angeles"; "hancock-park"="Hancock Park, Los Angeles"
  "hermosa-beach"="Hermosa Beach, California"; "hidden-hills"="Hidden Hills, California"
  "hollywood"="Hollywood, Los Angeles"; "holmby-hills"="Holmby Hills, Los Angeles"
  "la-canada-flintridge"="La Cañada Flintridge, California"; "los-feliz"="Los Feliz, Los Angeles"
  "malibu"="Malibu, California"; "manhattan-beach"="Manhattan Beach, California"
  "marina-del-rey"="Marina del Rey, California"; "moorpark"="Moorpark, California"
  "newport-beach"="Newport Beach, California"; "pacific-palisades"="Pacific Palisades, Los Angeles"
  "palos-verdes"="Palos Verdes Estates, California"; "pasadena"="Pasadena, California"
  "playa-del-rey"="Playa del Rey, Los Angeles"; "playa-vista"="Playa Vista, Los Angeles"
  "porter-ranch"="Porter Ranch, Los Angeles"; "redondo-beach"="Redondo Beach, California"
  "san-marino"="San Marino, California"; "santa-barbara"="Santa Barbara, California"
  "santa-monica"="Santa Monica, California"; "sherman-oaks"="Sherman Oaks, Los Angeles"
  "sierra-madre"="Sierra Madre, California"; "simi-valley"="Simi Valley, California"
  "studio-city"="Studio City, Los Angeles"; "tarzana"="Tarzana, Los Angeles"
  "thousand-oaks"="Thousand Oaks, California"; "toluca-lake"="Toluca Lake, Los Angeles"
  "topanga"="Topanga, California"; "westchester"="Westchester, Los Angeles"
  "westlake-village"="Westlake Village, California"; "woodland-hills"="Woodland Hills, Los Angeles"
}

function Strip-Html([string]$s) {
  if (-not $s) { return "" }
  $t = [regex]::Replace($s, "<[^>]+>", "")
  $t = [System.Net.WebUtility]::HtmlDecode($t)
  return ($t -replace "\s+", " ").Trim()
}

$manifest = [ordered]@{}
$ok = 0; $fail = 0
foreach ($slug in ($articles.Keys | Sort-Object)) {
  $name = if ($names.ContainsKey($slug)) { $names[$slug] } else { $slug }
  $article = $articles[$slug]
  try {
    $enc = [uri]::EscapeDataString(($article -replace " ", "_"))
    $sum = Invoke-RestMethod -Uri "https://en.wikipedia.org/api/rest_v1/page/summary/$enc" -UserAgent $UA -TimeoutSec 40
    $srcUrl = $null
    if ($sum.originalimage -and $sum.originalimage.source) { $srcUrl = $sum.originalimage.source }
    elseif ($sum.thumbnail -and $sum.thumbnail.source) { $srcUrl = $sum.thumbnail.source }
    if (-not $srcUrl) { Write-Output "SKIP  $name (no lead image)"; $fail++; continue }

    $fileName = [uri]::UnescapeDataString(($srcUrl -split "/")[-1])
    if ($srcUrl -match "/thumb/") { $fileName = [uri]::UnescapeDataString((($srcUrl -split "/thumb/")[1] -split "/")[-2]) }
    $extOrig = [System.IO.Path]::GetExtension($fileName).ToLower()
    if ($extOrig -eq ".svg") { Write-Output "SKIP  $name (svg lead)"; $fail++; continue }

    $fp = "https://commons.wikimedia.org/wiki/Special:FilePath/" + [uri]::EscapeDataString($fileName) + "?width=1600"
    Invoke-WebRequest -Uri $fp -UserAgent $UA -OutFile $tmp -TimeoutSec 120

    # re-encode to real JPEG -> hero + thumb
    $img = [System.Drawing.Image]::FromFile($tmp)
    $bmp = New-Object System.Drawing.Bitmap($img)
    $bmp.Save((Join-Path $heroDir  "$slug-hero.jpg"), $jpgCodec, $ep)
    $bmp.Save((Join-Path $thumbDir "$slug.jpg"),      $jpgCodec, $ep)
    $bmp.Dispose(); $img.Dispose()

    $artist = ""; $license = ""
    try {
      $apiTitle = [uri]::EscapeDataString("File:$fileName")
      $info = Invoke-RestMethod -UserAgent $UA -TimeoutSec 40 -Uri ("https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=extmetadata&titles=$apiTitle")
      $page = ($info.query.pages.PSObject.Properties | Select-Object -First 1).Value
      $em = $page.imageinfo[0].extmetadata
      if ($em.Artist) { $artist = Strip-Html $em.Artist.value }
      if ($em.LicenseShortName) { $license = Strip-Html $em.LicenseShortName.value }
    } catch { }

    $manifest[$name] = [ordered]@{
      img     = "/cities/$slug.jpg"
      artist  = $artist
      license = $license
      source  = "https://commons.wikimedia.org/wiki/File:" + ($fileName -replace " ", "_")
    }
    $ok++
    "OK    {0,-22} {1} ({2})" -f $name, ($artist.Substring(0,[Math]::Min(38,$artist.Length))), $license
    Start-Sleep -Milliseconds 200
  } catch {
    Write-Output ("FAIL  {0}: {1}" -f $name, $_.Exception.Message)
    $fail++
  }
}

$json = $manifest | ConvertTo-Json -Depth 5
[System.IO.File]::WriteAllText((Join-Path $root "src\lib\city-images.json"), $json, (New-Object System.Text.UTF8Encoding($false)))
Remove-Item $tmp -ErrorAction SilentlyContinue
"`n--- $ok ok, $fail fail; wrote $($manifest.Count) entries to src/lib/city-images.json ---"