import express from 'express';
const app = express();

// import 

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    //res.send('height: ' + req.query.height + ' weight: ' + req.query.weight);

    const result = {
        weight: req.query.weight,
        height: req.query.height,
        bmi: "hello"
    }

    res.json(result)
})

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});