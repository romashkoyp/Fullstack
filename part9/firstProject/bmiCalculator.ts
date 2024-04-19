// npm run CalculBmi
interface Values {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): Values => {
  // console.log(args.length)
  // console.log(args[0])
  // console.log(args[1])
  console.log(args[2]) //height
  console.log(args[3]) //weight
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBmi = (cm: number, kg: number) : number => {
  if (kg === 0) throw new Error('Can\'t divide by 0!');
  if (kg < 0 ) throw new Error('Weight has to be a positive number');
  if (cm < 0 ) throw new Error('Height has to be a positive number');
  return kg / ((cm / 100) ** 2)
}

try {
  const { height, weight } = parseArguments(process.argv)
  const bmi = calculateBmi(height, weight);
  console.log(`BMI is: ${bmi}`)
  if (bmi < 16) {
    console.log('Underweight (Severe thinness)');
  } else if (bmi < 16.9 && bmi > 16) {
    console.log('Underweight (Moderate thinness)');
  } else if (bmi < 18.4 && bmi > 17) {
    console.log('Underweight (Mild thinness)');
  } else if (bmi < 24.9 && bmi > 18.5) {
    console.log('Normal (healthy weight)');
  } else if (bmi < 29.9 && bmi > 25) {
    console.log('Overweight (Pre-obese)');
  } else if (bmi < 34.9 && bmi > 30) {
    console.log('Obese (Class I)');
  } else if (bmi < 39.9 && bmi > 35) {
    console.log('Obese (Class II)');
  } else if (bmi > 40 || bmi === 40) {
    console.log('Obese (Class II)');
  }
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: '
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
