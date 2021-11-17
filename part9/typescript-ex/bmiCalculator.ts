const parseBmiArguments = (args: Array<string>) => {
    if (args.length < 4) throw new Error('Not enough arguments.');
    if (args.length > 4) throw new Error('Too many arguments.');

    args.forEach((value: string, index: number) => {
        if (index > 1 && isNaN(Number(value))) throw new Error('All provided values must be numbers.');
    });

    return {
        cm: Number(process.argv[2]),
        kg: Number(process.argv[3])
    }
}

const calculateBmi = (cm: number, kg: number): string => {
    const calculation = kg / Math.pow(cm / 100, 2);
    
    switch (true) {
        case (calculation < 16):
            return 'Underweight (Severe thinness)';
        case (calculation < 17):
            return 'Underweight (Moderate thinness)';
        case (calculation < 18.5):
            return 'Underweight (Mild thinness)';
        case (calculation < 25):
            return 'Normal (healthy weight)';
        case (calculation < 30):
            return 'Overweight (Pre-obese)';
        case (calculation < 35):
            return 'Obese (Class I)';
        case (calculation < 40):
            return 'Obese (Class II)';
        case (calculation >= 40):
            return 'Obese (Class III)';
    }
}

try {
    const { cm, kg } = parseBmiArguments(process.argv);
    console.log(calculateBmi(cm, kg));
} catch (error: unknown) {
    let errorMessage = 'An error has occurred.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}