// npm run calculateExercises
interface Exercises {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: () => boolean;
  rating: () => number;
  ratingDescription: () => string;
}

const calculateExercises = (exercises: number[], target: number): Exercises => {
  const periodLength = exercises.length
  const trainingDays = exercises.filter((day) => day > 0).length
  const sum = exercises.reduce((s, c) => s + c, 0)
  const average = sum / periodLength
  
  const success = () => {
    if (average < target) {
      return false
    }
    return true
  }

  const rating = () => {
    if (trainingDays === periodLength) {
      return 3
    } else if (trainingDays > 3 && trainingDays < 6) {
      return 2
    }
    return 1
  }

  const ratingDescription = () => {
    const ratingValue = rating()
    if (ratingValue === 3) {
      return ('Good job!')
    } else if (ratingValue === 2) {
      return ('OK')
    }
    return ('you can do more')
  } 

  return {
    periodLength,
    trainingDays,
    target,
    average,
    success,
    rating,
    ratingDescription
  }
}

const weeklyExercises = [3, 0, 2, 4.5, 0, 3, 1]
const target = 2
const result = calculateExercises(weeklyExercises, target)

function printExercises(ex: Exercises) {
  console.log({
    "periodLength": ex.periodLength,
    "trainingDays": ex.trainingDays,
    "target": target,
    "average": ex.average,
    "success": ex.success(),
    "rating": ex.rating(),
    "ratingDescription": ex.ratingDescription()
    }
  );
}
 
printExercises(result)