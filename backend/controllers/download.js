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
    res.status(200).json({ message: responseUrl });
  } catch (error) {
    console.error("❌ Error in downloadSong:", error);
    res.status(500).json({ message: "❌ Server error", error });
  }
}

export default downloadSong;
