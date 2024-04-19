// npm run CalculBmi 180 74
interface Values {
  height: number;
  weight: number;
}

export const parseArguments = (args: string[]): Values => {
  console.log("Number of arguments:", args.length);
  args.forEach((arg) => {console.log(arg);});

  if (args.length < 2) throw new Error('Not enough arguments');
  if (args.length > 2) throw new Error('Too many arguments');

  if (!isNaN(Number(args[0])) && !isNaN(Number(args[1]))) {
    return {
      height: Number(args[0]),
      weight: Number(args[1])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (cm: number, kg: number): string => {
  if (kg === 0) throw new Error('Can\'t divide by 0!');
  if (kg < 0 ) throw new Error('Weight has to be a positive number');
  if (cm < 0 ) throw new Error('Height has to be a positive number');
  
  const bmi = kg / ((cm / 100) ** 2);

  if (bmi < 16) {
    return 'Underweight (Severe thinness)';
  } else if (bmi < 16.9 && bmi > 16) {
    return 'Underweight (Moderate thinness)';
  } else if (bmi < 18.4 && bmi > 17) {
    return 'Underweight (Mild thinness)';
  } else if (bmi < 24.9 && bmi > 18.5) {
    return 'Normal (healthy weight)';
  } else if (bmi < 29.9 && bmi > 25) {
    return 'Overweight (Pre-obese)';
  } else if (bmi < 34.9 && bmi > 30) {
    return 'Obese (Class I)';
  } else if (bmi < 39.9 && bmi > 35) {
    return 'Obese (Class II)';
  } else if (bmi >= 40) {
    return 'Obese (Class III)';
  }
  return '';
};
