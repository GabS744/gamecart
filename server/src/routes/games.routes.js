import { Router } from 'express';
import { getGames, getGameById } from '../services/rawg.service.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { search, page } = req.query;
    const data = await getGames(search, page);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = await getGameById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;