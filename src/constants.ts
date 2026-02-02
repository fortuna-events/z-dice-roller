import type { Editor, Page } from "./interfaces";

export const DEFAULT_EDITOR: Editor = {
    numbersCols: 0,
    numbersText: "",
    overlayText: "",
};

export const DEFAULT_COLOR_HUE = "300";
export const DEFAULT_COLOR_SAT = "30%";

export const HELP_HEADER = [
    "Title and description (html, <h1> on plain text)",
    `Hue, Saturation (optional, "${DEFAULT_COLOR_HUE}, ${DEFAULT_COLOR_SAT}" by default)`,
];
export const HELP = [
    "Success message (html, <h2> on plain text)",
    "Failure message (html, <h2> on plain text)",
    "Dices to roll (as XdY)",
    "Minimum score to obtain (0+)",
    "Saved roll expiration in minutes (0+, optional, default to 1440 minutes)",
    "Roll button text (html, optional)",
];

export const SAMPLE_DATA =
    "Gambling time\n<h2>Have a <a href='https://orteil.dashnet.org/cookieclicker/'>cookie</a> !</h2>\nYou fail !\n2d6\n6";

export const DEFAULT_PAGE: Page = {
    error: null,
    header: "",
    hasColor: true,
    successText: "",
    failureText: "",
    diceCount: 1,
    diceSides: 6,
    targetScore: 0,
    hasExpirationMinutes: true,
    expirationMinutes: 24 * 60,
    buttonText: "<i icon='dices'></i> Roll the dice",
};

export const DICES = [
    "M12 12h.01z",
    "M16 16h.01zM8 8h.01z",
    "M12 12h.01zM16 16h.01zM8 8h.01z",
    "M16 8h.01zM16 16h.01zM8 8h.01zM8 16h.01z",
    "M12 12h.01zM16 8h.01zM16 16h.01zM8 8h.01zM8 16h.01z",
    "M16 8h.01zM16 12h.01zM16 16h.01zM8 8h.01zM8 12h.01zM8 16h.01z",
    "M12 12h.01zM16 8h.01zM16 12h.01zM16 16h.01zM8 8h.01zM8 12h.01zM8 16h.01z",
    "M16 8h.01zM16 12h.01zM16 16h.01zM8 8h.01zM8 12h.01zM8 16h.01zM12 10h.01zM12 14h.01z",
    "M12 12h.01zM16 8h.01zM16 12h.01zM16 16h.01zM8 8h.01zM8 12h.01zM8 16h.01zM12 16h.01zM12 8h.01z",
];

export const ROLLING_DURATION = 1000;
