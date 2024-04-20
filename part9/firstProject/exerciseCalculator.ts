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

export const parsArguments = (data: {
  daily_exercises: number[];
  target: number
}): Exercises => {
  const { daily_exercises, target } = data;
  console.log("Number of values:", daily_exercises.length);
  daily_exercises.forEach((ex) => {console.log(ex);});

  if (!Array.isArray(daily_exercises) || daily_exercises.length === 0) {
    throw new Error('No exercise data provided');
  }

  if (!target) {
    throw new Error('No target value provided');
  }

  if (daily_exercises.some(value => isNaN(value) || value < 0) || isNaN(target) || target <= 0) {
    throw new Error('Provided values were not correct numbers!');
  }

  return {
    target,
    values: daily_exercises,
    periodLength: 0,
    trainingDays: 0,
    average: 0,
    success: () => false,
    rating: () => 0,
    ratingDescription: () => '',
  };
};

export const calculateExercises = (data: Exercises): Exercises => {
  const { target, values: daily_exercises } = data;
  const periodLength = daily_exercises.length;
  const trainingDays = daily_exercises.filter((day) => day > 0).length;
  const sum = daily_exercises.reduce((s, c) => s + c, 0);
  const average = sum / periodLength;
  
  const success = () => average >= target;

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
    values: daily_exercises,
  };
};

export function printExercises(ex: Exercises) {
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
  return {
    "periodLength": ex.periodLength,
    "trainingDays": ex.trainingDays,
    "target": ex.target,
    "average": ex.average,
    "success": ex.success(),
    "rating": ex.rating(),
    "ratingDescription": ex.ratingDescription()
  };
}

// try {
//   const { target, values } = parsArguments(process.argv);
//   const result = calculateExercises(target, values);
//   printExercises(result);
// } catch (error: unknown) {
//   let errorMessage = 'Something went wrong: ';
//   if (error instanceof Error) {
//     errorMessage += error.message;
//   }
//   console.log(errorMessage);
// }