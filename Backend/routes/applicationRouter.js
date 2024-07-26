import express from 'express';
const router = express.Router();

// Define your application routes here
router.get('/', (req, res) => {
    res.send('Application Router');
});

export default router;
