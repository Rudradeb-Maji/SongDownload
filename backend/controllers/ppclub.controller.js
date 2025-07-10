import puppeteer from "puppeteer";

async function ppClubScrapeSongLinks(req, res) {
  const givenArtist = req.body.artist;
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const website = "https://djppclub.in"
  await page.goto(website, {
    waitUntil: "networkidle2",
  });
  const songData = await page.evaluate((website,givenArtist) => {
    const container = document.querySelector(".updates");
    if (!container) return [];

    const items = container.querySelectorAll("div");
    const data = [];

    items.forEach((el) => {
      const fontTag = el.querySelector("font b");
      const aTag = el.querySelector("b a");
      const abTag = el.querySelector("a b")
      const artist = fontTag?.innerText.trim().replace(':-','').trim();
      if (artist === givenArtist) {
        const url = aTag?.getAttribute("href")?.trim();
        const parts = url.split("/");
        const downloadId = parts[4];
        const downloadUrl = `${website}/files/download/id/${downloadId}`;
        const title = abTag?.innerText.trim();
        if (url) {
          data.push({
            artist,
            title,
            downloadUrl,
          });
        }
      }
      else return
    });

    return data;
  },website,givenArtist);
  await browser.close();
  if (songData.length) {
    return res.status(200).json({message:"Successfully fetched",data:songData});
  }
  else return res.status(200).json({message:"No song found",data:songData});
}

export default ppClubScrapeSongLinks;
