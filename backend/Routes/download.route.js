import express from 'express';
import axios from 'axios';
import fs from 'fs-extra';
import archiver from 'archiver';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const downloadRouter = express.Router();

downloadRouter.post('/downloadall', async (req, res) => {
  const { songs } = req.body;

  if (!songs || !songs.length) {
    return res.status(400).json({ message: 'No songs provided' });
  }

  const folderId = uuidv4();
  const tempFolder = `./temp/${folderId}`;
  await fs.ensureDir(tempFolder);

  try {
    // Download each song to the temp folder
    for (const song of songs) {
      const response = await axios.get(song.downloadUrl, { responseType: 'stream' });
      const filePath = path.join(tempFolder, `${song.title}.mp3`);
      const writer = fs.createWriteStream(filePath);
      response.data.pipe(writer);
      await new Promise((resolve) => writer.on('finish', resolve));
    }

    // Create ZIP archive
    const zipPath = `./temp/${folderId}.zip`;
    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    archive.pipe(output);
    archive.directory(tempFolder, false);
    await archive.finalize();

    output.on('close', () => {
      // Send ZIP file URL (you can use res.download or serve via static folder)
      res.json({ zipUrl: `http://localhost:3000/temp/${folderId}.zip` });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Download failed' });
  }
});

export default downloadRouter;
