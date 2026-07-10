import { Router } from 'express';
import { searchGameByTitle, getGameDealsWithStoreNames } from '../services/cheapshark.service.js';

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
    const data = await getGameDealsWithStoreNames(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;