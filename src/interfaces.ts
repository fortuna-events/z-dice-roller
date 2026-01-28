export interface Editor {
    numbersCols: number;
    numbersText: string;
    overlayText: string;
}

// TODO: 5. implement custom logic
export interface Page {
    error: boolean;
    header: string;
    hasColor: boolean;
    parts: string[];
}
