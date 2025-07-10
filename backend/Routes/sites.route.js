import express from 'express';
import barmanMusicScrapeSongLinks from '../controllers/barmanmusic.controller.js';
import swagataMobileScrapeSongLinks from '../controllers/swagatamobile.controller.js';
import ppClubScrapeSongLinks from '../controllers/ppclub.controller.js';
const siteRouter = express.Router();

siteRouter.post('/barmanmusic',barmanMusicScrapeSongLinks)
siteRouter.post('/swagatamobile',swagataMobileScrapeSongLinks)
siteRouter.post('/djppclub',ppClubScrapeSongLinks)
export default siteRouter