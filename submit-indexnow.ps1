# ============================================================================
# IndexNow submission for Landed Digital
# ----------------------------------------------------------------------------
# Instantly notifies Bing (and therefore ChatGPT / Copilot search, which use
# Bing's index) plus Yandex and Seznam that pages are new or updated.
# Google does NOT use IndexNow: use Search Console for Google.
#
# Run after publishing new or changed pages:
#     powershell -ExecutionPolicy Bypass -File submit-indexnow.ps1
#
# To submit only specific pages, pass them as arguments:
#     powershell -ExecutionPolicy Bypass -File submit-indexnow.ps1 resources.html
# ============================================================================

param([string[]]$Pages)

$host_        = 'digital.landedgroupau.com'
$key          = 'c43480b8622a43178c3cd8968138d21a'
$keyLocation  = "https://$host_/$key.txt"

# Default: every page in the sitemap
$allPages = @(
  '', 'free-review-setup.html', 'google.html', 'reviews.html', 'ai-office.html',
  'websites.html', 'packages.html', 'results.html', 'industries.html', 'about.html',
  'contact.html', 'resources.html', 'how-nfc-review-cards-work.html',
  'how-to-get-more-google-reviews.html', 'google-business-profile-checklist.html',
  'what-an-ai-receptionist-does.html', 'privacy.html', 'terms.html', 'disclaimer.html'
)

if ($Pages -and $Pages.Count -gt 0) { $target = $Pages } else { $target = $allPages }
$urlList = $target | ForEach-Object { "https://$host_/$_" }

$body = @{
  host        = $host_
  key         = $key
  keyLocation = $keyLocation
  urlList     = $urlList
} | ConvertTo-Json -Depth 3

Write-Output "Submitting $($urlList.Count) URLs to IndexNow..."
try {
  $r = Invoke-WebRequest -Uri 'https://api.indexnow.org/indexnow' `
                         -Method POST `
                         -ContentType 'application/json; charset=utf-8' `
                         -Body $body `
                         -UseBasicParsing
  Write-Output "Response: $($r.StatusCode) $($r.StatusDescription)"
  if ($r.StatusCode -eq 200) { Write-Output "Accepted. Bing will crawl these shortly." }
  elseif ($r.StatusCode -eq 202) { Write-Output "Accepted, key validation pending." }
} catch {
  Write-Output "Failed: $($_.Exception.Message)"
  Write-Output "Check that https://$host_/$key.txt is reachable and returns the key."
}
