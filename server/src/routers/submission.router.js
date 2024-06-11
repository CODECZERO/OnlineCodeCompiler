import { Router } from 'express';
import Submission  from '../controler/submission.controler.js';

const router = Router();
router.post('/submit', Submission);

export default router;
