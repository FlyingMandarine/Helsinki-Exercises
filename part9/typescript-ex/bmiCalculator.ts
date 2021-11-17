const parseBmiArguments = (cm: string, kg: string) => {
    if (isNaN(Number(cm)) || isNaN(Number(kg))) {
        throw new Error('malformatted parameters');
    }

    return {
        cm: Number(cm),
        kg: Number(kg)
    };
}

export const calculateBmi = (height: string, weight: string): string => {
    const { cm, kg } = parseBmiArguments(height, weight);

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
    return 'An error has occurred.';
}

// try {
//     const { cm, kg } = parseBmiArguments(process.argv);
//     console.log(calculateBmi(cm, kg));
// } catch (error: unknown) {
//     let errorMessage = 'An error has occurred.';
//     if (error instanceof Error) {
//         errorMessage += ' Error: ' + error.message;
//     }
//     console.log(errorMessage);
// }