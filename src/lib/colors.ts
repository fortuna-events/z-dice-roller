export function changeDocumentColor(hue: string, sat: string) {
    document
        .querySelector<HTMLElement>(":root")
        ?.style.setProperty("--hue-primary", hue.trim());
    document
        .querySelector<HTMLElement>(":root")
        ?.style.setProperty("--sat-primary", sat.trim());
}
