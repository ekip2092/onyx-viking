# Downloads a real, licensed representative photo for each serviced city from
# Wikimedia (via each city's Wikipedia lead image), scaled to ~1280px, into
# public/cities/, and writes src/lib/city-images.json with attribution.
$ErrorActionPreference = "Stop"
$UA = "OnyxVikingSiteBot/1.0 (https://onyxvikingservice.com; contact@onyxvikingservice.com)"
$root = Split-Path $PSScriptRoot -Parent
$outDir = Join-Path $root "public\cities"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

# slug => @{ name = exact name in site.ts; article = Wikipedia article title }
$cities = [ordered]@{
  "beverly-hills"        = @{ name = "Beverly Hills";        article = "Beverly Hills, California" }
  "bel-air"              = @{ name = "Bel Air";              article = "Bel Air, Los Angeles" }
  "holmby-hills"         = @{ name = "Holmby Hills";         article = "Holmby Hills, Los Angeles" }
  "brentwood"            = @{ name = "Brentwood";            article = "Brentwood, Los Angeles" }
  "pacific-palisades"    = @{ name = "Pacific Palisades";    article = "Pacific Palisades, Los Angeles" }
  "malibu"               = @{ name = "Malibu";               article = "Malibu, California" }
  "santa-monica"         = @{ name = "Santa Monica";         article = "Santa Monica, California" }
  "hancock-park"         = @{ name = "Hancock Park";         article = "Hancock Park, Los Angeles" }
  "encino"               = @{ name = "Encino";               article = "Encino, Los Angeles" }
  "sherman-oaks"         = @{ name = "Sherman Oaks";         article = "Sherman Oaks, Los Angeles" }
  "studio-city"          = @{ name = "Studio City";          article = "Studio City, Los Angeles" }
  "tarzana"              = @{ name = "Tarzana";              article = "Tarzana, Los Angeles" }
  "calabasas"            = @{ name = "Calabasas";            article = "Calabasas, California" }
  "hidden-hills"         = @{ name = "Hidden Hills";         article = "Hidden Hills, California" }
  "toluca-lake"          = @{ name = "Toluca Lake";          article = "Toluca Lake, Los Angeles" }
  "woodland-hills"       = @{ name = "Woodland Hills";       article = "Woodland Hills, Los Angeles" }
  "pasadena"             = @{ name = "Pasadena";             article = "Pasadena, California" }
  "san-marino"           = @{ name = "San Marino";           article = "San Marino, California" }
  "la-canada-flintridge" = @{ name = "La Cañada Flintridge"; article = "La Cañada Flintridge, California" }
  "sierra-madre"         = @{ name = "Sierra Madre";         article = "Sierra Madre, California" }
  "glendale"             = @{ name = "Glendale";             article = "Glendale, California" }
  "los-feliz"            = @{ name = "Los Feliz";            article = "Los Feliz, Los Angeles" }
  "manhattan-beach"      = @{ name = "Manhattan Beach";      article = "Manhattan Beach, California" }
  "palos-verdes"         = @{ name = "Palos Verdes";         article = "Palos Verdes Estates, California" }
  "hermosa-beach"        = @{ name = "Hermosa Beach";        article = "Hermosa Beach, California" }
  "redondo-beach"        = @{ name = "Redondo Beach";        article = "Redondo Beach, California" }
  "newport-beach"        = @{ name = "Newport Beach";        article = "Newport Beach, California" }
  "santa-barbara"        = @{ name = "Santa Barbara";        article = "Santa Barbara, California" }
}

function Strip-Html([string]$s) {
  if (-not $s) { return "" }
  $t = [regex]::Replace($s, "<[^>]+>", "")
  $t = [System.Net.WebUtility]::HtmlDecode($t)
  return ($t -replace "\s+", " ").Trim()
}

$manifest = [ordered]@{}
foreach ($slug in $cities.Keys) {
  $name = $cities[$slug].name
  $article = $cities[$slug].article
  try {
    $enc = [uri]::EscapeDataString(($article -replace " ", "_"))
    $sum = Invoke-RestMethod -Uri "https://en.wikipedia.org/api/rest_v1/page/summary/$enc" -UserAgent $UA -TimeoutSec 40
    $srcUrl = $null
    if ($sum.originalimage -and $sum.originalimage.source) { $srcUrl = $sum.originalimage.source }
    elseif ($sum.thumbnail -and $sum.thumbnail.source) { $srcUrl = $sum.thumbnail.source }
    if (-not $srcUrl) { Write-Host "SKIP  $name (no lead image)"; continue }

    # filename on Commons = last path segment, url-decoded
    $fileName = [uri]::UnescapeDataString(($srcUrl -split "/")[-1])
    # thumbnails embed the original after /thumb/...; strip a trailing "NNNpx-Name"
    if ($srcUrl -match "/thumb/") { $fileName = [uri]::UnescapeDataString((($srcUrl -split "/thumb/")[1] -split "/")[-2]) }

    $ext = [System.IO.Path]::GetExtension($fileName).ToLower()
    if ($ext -eq "" -or $ext -eq ".svg") { $ext = ".jpg" }
    $destRel = "/cities/$slug$ext"
    $dest = Join-Path $outDir "$slug$ext"

    # scaled render (~1280px wide) via Special:FilePath
    $fp = "https://commons.wikimedia.org/wiki/Special:FilePath/" + [uri]::EscapeDataString($fileName) + "?width=1280"
    Invoke-WebRequest -Uri $fp -UserAgent $UA -OutFile $dest -TimeoutSec 90

    # attribution from Commons imageinfo
    $artist = ""; $license = ""
    try {
      $apiTitle = [uri]::EscapeDataString("File:$fileName")
      $info = Invoke-RestMethod -UserAgent $UA -TimeoutSec 40 -Uri ("https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=extmetadata&titles=$apiTitle")
      $page = ($info.query.pages.PSObject.Properties | Select-Object -First 1).Value
      $em = $page.imageinfo[0].extmetadata
      if ($em.Artist) { $artist = Strip-Html $em.Artist.value }
      if ($em.LicenseShortName) { $license = Strip-Html $em.LicenseShortName.value }
    } catch { }

    $kb = [math]::Round((Get-Item $dest).Length / 1KB)
    $manifest[$name] = [ordered]@{
      img     = $destRel
      artist  = $artist
      license = $license
      source  = "https://commons.wikimedia.org/wiki/File:" + ($fileName -replace " ", "_")
    }
    "OK    {0,-22} {1,6}KB  {2} ({3})" -f $name, $kb, ($artist.Substring(0,[Math]::Min(40,$artist.Length))), $license
    Start-Sleep -Milliseconds 250
  } catch {
    Write-Host ("FAIL  {0}: {1}" -f $name, $_.Exception.Message)
  }
}

$json = $manifest | ConvertTo-Json -Depth 5
$jsonPath = Join-Path $root "src\lib\city-images.json"
[System.IO.File]::WriteAllText($jsonPath, $json, (New-Object System.Text.UTF8Encoding($false)))
"`n--- wrote $($manifest.Count)/$($cities.Count) entries to src/lib/city-images.json ---"
