import puppeteer from "puppeteer";

async function barmanMusicScrapeSongLinks(req,res) {
  const givenArtist = req.body.artist
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const website = "https://barmanmusic.com"
  await page.goto(website, {
    waitUntil: "networkidle2",
  });
  const songData = await page.evaluate((givenArtist,website) => {
    const container = document.querySelector(".featured");
    if (!container) return [];

    const items = container.querySelectorAll(".updates");
    const data = [];

    items.forEach((el) => {
      const bTag = el.querySelector("span b");
      const aTag = el.querySelector("a");

      const artist = bTag?.innerText.trim();
      if (artist === givenArtist) {
        const url = aTag?.getAttribute("href")?.trim();
        const parts = url.split("/");
        const downloadId = parts[4];
        const downloadUrl = `${website}/files/download/id/${downloadId}`;
        const title = aTag?.innerText.trim();
        
        if (url) {
          data.push({
            artist,
            title,
            downloadUrl,
          });
        }
      }
    });

    return data;
  }, givenArtist,website);
  await browser.close();
  if (songData.length) {
    return res.status(200).json({message:"Successfully fetched",data:songData});
  }
  else return res.status(200).json({message:"No song found",data:songData});
  
}

export default barmanMusicScrapeSongLinks;
