import type { Editor, Page } from "@/interfaces";
import { clone } from "./objects";
import {
    DEFAULT_COLOR_HUE,
    DEFAULT_COLOR_SAT,
    DEFAULT_EDITOR,
    DEFAULT_PAGE,
    HELP_HEADER,
    HELP,
} from "@/constants";
import { changeDocumentColor } from "./colors";

export function parseEditor(value: string, parsed: Page): Editor {
    const editor = clone(DEFAULT_EDITOR);
    const debugDataSplit = value.split("\n");
    const headerSize = HELP_HEADER.length - (parsed.hasColor ? 0 : 1);
    const size =
        headerSize + HELP.length - (parsed.hasExpirationMinutes ? 0 : 1);
    const lines = Array(size).fill(0);
    editor.numbersText = debugDataSplit
        .map((_value, index) => (index + 1).toString() + `.`)
        .join("\n");
    editor.overlayText = lines
        .map((_value, index) => {
            if (
                debugDataSplit.length > index &&
                (debugDataSplit[index] ?? "").trim().length
            ) {
                return " ".repeat((debugDataSplit[index] ?? "").length);
            } else if (headerSize > index) {
                return HELP_HEADER[index];
            } else if (parsed.hasExpirationMinutes && index == size - 2) {
                return HELP[HELP.length - 2];
            } else if (size > index) {
                return HELP[index - headerSize];
            }
            return "";
        })
        .join("\n");
    editor.numbersCols = editor.numbersText.length.toString().length + 1;
    return editor;
}

function addHtmlIfMissing(value: string, tag: string): string {
    if (!/<[^>]*>/u.test(value)) {
        return `<${tag}>${value}</${tag}>`;
    }
    return value;
}

export function parsePage(value: string): Page {
    const parsed = clone(DEFAULT_PAGE);
    const parts = value.split("\n");
    if (parts.length < 1 || !parts[0]?.length) {
        parsed.error = "no data";
        return parsed;
    }
    let lineNumber = 0;
    parsed.header = addHtmlIfMissing(parts.shift()!, "h1");
    // parse color if found
    if (parts[0].length && /^\d+(.\d+)?,\s+\d+(.\d+)?%$/u.test(parts[0])) {
        const rawPart = parts.shift()!.split(",");
        changeDocumentColor(
            rawPart[0] ?? DEFAULT_COLOR_HUE,
            rawPart[1] ?? DEFAULT_COLOR_SAT,
        );
    } else if (parts[0].length) {
        // not a color
        parsed.hasColor = false;
        changeDocumentColor(DEFAULT_COLOR_HUE, DEFAULT_COLOR_SAT);
    } else {
        parts.shift(); // consume empty line
        changeDocumentColor(DEFAULT_COLOR_HUE, DEFAULT_COLOR_SAT);
    }
    lineNumber++;
    if (parts.length < 1) {
        parsed.error = "not enough data";
        return parsed;
    }
    parsed.successText = addHtmlIfMissing(parts.shift()!, "h2");
    lineNumber++;
    if (parts.length < 1) {
        parsed.error = "not enough data";
        return parsed;
    }
    parsed.failureText = addHtmlIfMissing(parts.shift()!, "h2");
    lineNumber++;
    if (parts.length < 1) {
        parsed.error = "not enough data";
        return parsed;
    }
    const rawDice = parts.shift()!;
    lineNumber++;
    if (/^\d+d\d$/u.test(rawDice)) {
        parsed.diceCount = parseInt(rawDice.split("d")[0]!, 10);
        parsed.diceSides = parseInt(rawDice.split("d")[1]!, 10);
    } else {
        parsed.error = `invalid dices (line ${lineNumber.toFixed(0)})`;
    }
    if (parts.length < 1) {
        parsed.error = "not enough data";
        return parsed;
    }
    const rawTarget = parts.shift()!;
    lineNumber++;
    if (/^\d+$/u.test(rawTarget)) {
        parsed.targetScore = parseInt(rawTarget, 10);
    } else {
        parsed.error = `invalid target score (line ${lineNumber.toFixed(0)})`;
    }
    if (parts.length && /^\d+$/u.test(parts[0])) {
        parsed.expirationMinutes = parseInt(parts.shift()!, 10);
        lineNumber++;
    } else if (parts.length && parts[0].length) {
        parsed.hasExpirationMinutes = false;
    } else {
        parts.shift(); // consume empty line
        lineNumber++;
    }
    if (parts.length) {
        parsed.buttonText = parts.shift()!;
        lineNumber++;
    }
    return parsed;
}
