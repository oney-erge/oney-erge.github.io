const host = "oneyerge.com";
const key = "c713c47a62ed44e59c27472bde3080a3";
const keyLocation = `https://${host}/${key}.txt`;

const sitemapResponse = await fetch(`https://${host}/sitemap.xml?deploy=${Date.now()}`);
if (!sitemapResponse.ok) {
  throw new Error(`Could not read the deployed sitemap (HTTP ${sitemapResponse.status}).`);
}

const sitemap = await sitemapResponse.text();
const urlList = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
if (!urlList.length) {
  throw new Error("The deployed sitemap did not contain any canonical URLs.");
}
const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation, urlList }),
});

if (!response.ok && response.status !== 202) {
  throw new Error(`IndexNow returned HTTP ${response.status}: ${await response.text()}`);
}

console.log(`Submitted ${urlList.length} canonical URLs to IndexNow (HTTP ${response.status}).`);
