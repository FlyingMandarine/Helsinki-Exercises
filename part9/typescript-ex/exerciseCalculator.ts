interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const parseExerciseArguments = (args: Array<string>) => {
    if (args.length < 4) throw new Error('Not enough arguments.');

    args.forEach((value: string, index: number) => {
        if (index > 1 && isNaN(Number(value))) throw new Error('All provided values must be numbers.');
    });

    const hoursArray: Array<number> = [];

    process.argv.forEach((value: string, index: number) => {
        if (index > 2) {
            hoursArray.push(Number(value));
        }
    });

    return {
        hours: hoursArray,
        target: Number(process.argv[2])
    };
};

const calculateExercises = (hours: Array<number>, target: number): Result => {
    const periodLength = hours.length;
    const trainingDays = hours.filter(h => h !== 0).length;

    const add = (accumulator: number, a: number): number => {
        return accumulator + a;
    };
    const average = hours.reduce(add, 0) / periodLength;

    const success = average < target ? false : true;

    const rating = (average: number): number => {
        const successPercent = average / target * 100;
        switch (true) {
            case (successPercent < 50):
                return 1;
            case (successPercent < 100):
                return 2;
            case (successPercent >= 100):
                return 3;
        }
        return 0;
    };

    const ratingDescription = (rating: number): string => {
        switch (rating) {
            case 1:
                return 'You achieved less than half of your target. You need to work harder!';
            case 2:
                return 'You achieved at least half of your target. Could be better!';
            case 3:
                return 'You reached your target for the week. Well done!';
        }
        return 'An error has occurred.';
    };

    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success,
        rating: rating(average),
        ratingDescription: ratingDescription(rating(average)),
        target: target,
        average: average,
    };
};

try {
    const { hours, target } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(hours, target));
} catch (error: unknown) {
    let errorMessage = 'An error has occurred.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}