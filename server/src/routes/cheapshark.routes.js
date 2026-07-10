import { Router } from 'express';
import { searchGameByTitle, getGameDeals, findBestMatch } from '../services/cheapshark.service.js';

const router = Router();

router.get('/search', async (req, res) => {
  try {
    const { title } = req.query;
    const data = await searchGameByTitle(title);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/deals/:id', async (req, res) => {
  try {
    const data = await getGameDeals(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/match', async (req, res) => {
  try {
    const { title } = req.query;
    const match = await findBestMatch(title);
    res.json(match);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;