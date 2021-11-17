import express from 'express';
const app = express();
app.use(express.json());

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

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

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const dailyEx: Array<number> = req.body.daily_exercises;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const target: number = req.body.target;

    if (!dailyEx || !target) {
        return res.status(400).json({
            error: "parameters missing"
        });
    } else if (dailyEx.some(isNaN) || isNaN(Number(target))) {
        return res.status(400).json({
            error: "malformatted parameters"
        });
    }

    const result = calculateExercises(dailyEx, target);
    return res.json(result);
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});