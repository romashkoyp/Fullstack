import express from 'express';
import { parseArguments, calculateBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get(`/bmi`, (req, res) => {
  try {
    const { height, weight } = parseArguments([req.query.height as string, req.query.weight as string]);
    const bmi = calculateBmi(height, weight);

    res.status(200).json({
      weight: weight,
      height: height,
      bmi: bmi
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: "malformatted parameters" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
