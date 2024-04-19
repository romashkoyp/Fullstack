// npm run calculateExercises
interface Exercises {
  target: number;
  values: number[];
  periodLength: number;
  trainingDays: number;
  average: number;
  success: () => boolean;
  rating: () => number;
  ratingDescription: () => string;
}

const parsArguments = (args: string[]): Exercises => {
  console.log("Number of arguments:", args.length);
  args.forEach((arg) => {console.log(arg);});
  
  if (args.length < 4) throw new Error('Not enough arguments');

  const target = Number(args[2]);
  const values = args.slice(3).map(Number);

  if (isNaN(target) || target < 0 || target === 0 || values.some(isNaN) || values.some(value => value < 0)) {
    throw new Error('Provided values were not correct numbers!');
  }
  return {
    target,
    values,
    periodLength: 0,
    trainingDays: 0,
    average: 0,
    success: () => false,
    rating: () => 0,
    ratingDescription: () => '',
  };
};

const calculateExercises = (target: number, exercises: number[]): Exercises => {
  const periodLength = exercises.length;
  const trainingDays = exercises.filter((day) => day > 0).length;
  const sum = exercises.reduce((s, c) => s + c, 0);
  const average = sum / periodLength;
  
  const success = () => {
    if (average < target) {
      return false;
    }
    return true;
  };

  const rating = () => {
    const calcRating = (trainingDays / periodLength) * 100;
    if (calcRating > 89) {
      return 3;
    } else if (calcRating > 50 && calcRating < 88) {
      return 2;
    }
    return 1;
  };

  const ratingDescription = () => {
    const ratingValue = rating();
    if (ratingValue === 3) {
      return ('Good job!');
    } else if (ratingValue === 2) {
      return ('OK');
    }
    return ('you can do more');
  }; 

  return {
    periodLength,
    trainingDays,
    target,
    average,
    success,
    rating,
    ratingDescription,
    values: []
  };
};

function printExercises(ex: Exercises) {
  console.log({
    "periodLength": ex.periodLength,
    "trainingDays": ex.trainingDays,
    "target": ex.target,
    "average": ex.average,
    "success": ex.success(),
    "rating": ex.rating(),
    "ratingDescription": ex.ratingDescription()
    }
  );
}

try {
  const { target, values } = parsArguments(process.argv);
  const result = calculateExercises(target, values);
  printExercises(result);
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}