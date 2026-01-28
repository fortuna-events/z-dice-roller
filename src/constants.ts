import type { Editor, Page } from "./interfaces";

export const DEFAULT_EDITOR: Editor = {
    numbersCols: 0,
    numbersText: "",
    overlayText: "",
};

// TODO: 2. change hue and saturation
export const DEFAULT_COLOR_HUE = "0";
export const DEFAULT_COLOR_SAT = "0%";

// TODO: 3. change data format
export const HELP_HEADER = [
    "Title and description (html, <h1> on plain text)",
    `Hue, Saturation (optional, "${DEFAULT_COLOR_HUE}, ${DEFAULT_COLOR_SAT}" by default)`,
];
export const HELP_PART = ["Data (html)"];

// TODO: 4. change sample
export const SAMPLE_DATA =
    "Url encoded app template\n<i>Italic text</i>\n<b>Bold text</b>\n<pre>code text</pre>\n<a href='https://google.com'>link</a>";

// TODO: 5. implement custom logic
export const DEFAULT_PAGE: Page = {
    error: false,
    header: "",
    hasColor: true,
    parts: [],
};
