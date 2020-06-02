export function pluralize(digit, endings) {
    const tens = digit % 100;
    const units = digit % 10;

    if (tens >= 11 && tens <= 19) {
        return endings[2];
    }

    switch (units) {
        case (1):
            return endings[0];
        case (2):
        case (3):
        case (4):
            return endings[1];
        default:
            return endings[2];
    }
}

export function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}
