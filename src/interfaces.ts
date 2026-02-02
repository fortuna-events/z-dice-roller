export interface Editor {
    numbersCols: number;
    numbersText: string;
    overlayText: string;
}

export interface Page {
    error: string | null;
    header: string;
    hasColor: boolean;
    successText: string;
    failureText: string;
    diceCount: number;
    diceSides: number;
    targetScore: number;
    hasExpirationMinutes: boolean;
    expirationMinutes: number;
    buttonText: string;
}
