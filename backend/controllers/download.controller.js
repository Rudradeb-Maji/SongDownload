import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Download handler function
async function downloadSong(req, res) {
  try {
    console.log(req.body);

    const { website, songId, songTitle, artist } = req.body;

    // Step 1: Get redirect URL
    const url = `${website}/files/download/id/${songId}`;
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const responseUrl = response.request.res.responseUrl;

    // Step 2: Define your custom download path
    const downloadDir = "C:/Users/rudra/Downloads";
    const artistDir = path.join(downloadDir, `${artist}`);

    // Step 3: Ensure directories exist
    if (!fs.existsSync(downloadDir)) fs.mkdirSync(downloadDir);
    if (!fs.existsSync(artistDir)) fs.mkdirSync(artistDir);

    // Step 4: Download MP3 as stream from the final URL
    const mp3Response = await axios({
      method: "GET",
      url: responseUrl,
      responseType: "stream",
    });

    // Step 5: Set file writer path
    const filePath = path.join(artistDir, `${songTitle}.mp3`);
    const writer = fs.createWriteStream(filePath);

    // Pipe stream to file
    mp3Response.data.pipe(writer);

    // Step 6: Respond once download finishes
    writer.on("finish", () => {
      res.status(200).json({ message: `✅ Downloaded: ${songTitle}.mp3` });
    });

    writer.on("error", (err) => {
      console.error("❌ Download error:", err);
      res.status(500).json({ message: "❌ Download error", error: err });
    });

  } catch (error) {
    console.error("❌ Error in downloadSong:", error);
    res.status(500).json({ message: "❌ Server error", error });
  }
}

export default downloadSong;
