import express from 'express';
const app = express();

import { calculateBmi } from './bmiCalculator';

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const bmi = calculateBmi(String(req.query.height), String(req.query.weight));

    const result = {
        weight: req.query.weight,
        height: req.query.height,
        bmi: bmi
    };

    res.json(result);
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});