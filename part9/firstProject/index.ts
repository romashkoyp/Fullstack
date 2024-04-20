import express from 'express';
import bodyParser from 'body-parser';
import { parseArguments, calculateBmi } from './bmiCalculator';
import { 
  parsArguments,
  calculateExercises,
  printExercises 
} from './exerciseCalculator';
const app = express();
app.use(bodyParser.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
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

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const start = parsArguments({ daily_exercises, target });
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    console.log('This is data after parsArguments function');
    console.log(start);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result = calculateExercises(start);
    console.log('This is data after calculateExercises function');
    console.log(result);
    console.log('This is data after printExercises function');
    const print = printExercises(result);
    return res.status(200).json(print);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'No exercise data provided'
      || error.message === 'No target value provided') {
        return res.status(400).json({ error: 'parameters missing' });
      } else if (error.message === 'Provided values were not correct numbers!') {
        return res.status(400).json({ error: 'malformatted parameters' });
      } else {
        return res.status(400).json({ error: 'malformatted parameters' });
      }
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
