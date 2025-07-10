import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import siteRouter from "./Routes/sites.route.js";
import downloadRouter from "./Routes/download.route.js";
dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*", // or '*' for all
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

const port = 3000 || process.env.PORT;
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/site", siteRouter);
app.use("/download", downloadRouter);
app.use('/temp', express.static('temp'));
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

// const artist = "Dj RX Remix (Paharpur Se)";
// const website = "https://barmanmusic.com";

// const songList = await barmanMusicScrapeSongLinks(artist);


