interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export const calculateExercises = (hours: Array<number>, target: number): Result => {
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