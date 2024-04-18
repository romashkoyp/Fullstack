const calculateBmi = (cm: number, kg: number) : number => {
  if (kg === 0) throw new Error('Can\'t divide by 0!');
  if (kg < 0 ) throw new Error('Weight has to be a positive number');
  if (cm < 0 ) throw new Error('Height has to be a positive number');
  return kg / ((cm / 100) ** 2)
}

try {
  const bmi = calculateBmi(180, 74);
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
