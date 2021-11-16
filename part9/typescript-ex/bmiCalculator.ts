const calculateBmi = (cm: number, kg: number): string => {
    const calculation = kg / Math.pow(cm / 100, 2);
    switch (true) {
        case (calculation < 16):
            return 'Underweight (Severe thinness)';
        case (calculation < 17):
            return 'Underweight (Moderate thinness)';
        case (calculation < 18.5):
            return 'Underweight (Mild thinness)	';
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

console.log(calculateBmi(180, 74));