type CopyableElement = HTMLElement | MathMLElement | SVGElement;

/**
 * Writes content (string or Blob) to the clipboard with a specific MIME type.
 *
 * @param source - String, text, or binary to copy
 * @param [type] - Changes the MIME type (if omitted, the default will be the Blob type, or text/plain for others).
 */
declare function write(source: Blob | string | number, type?: string): Promise<void>;

/**
 * Copies the outerHTML of the provided HTML, MathML or SVG element.
 *
 * @param elementOrSelector - Element or Seletor.
 */
declare function copy(elementOrSelector: CopyableElement | string): Promise<void>;

/**
 * Copies only the textContent (visible text) of the provided HTML, MathML or SVG element.
 *
 * @param elementOrSelector - Element or Seletor.
 */
declare function copyText(elementOrSelector: CopyableElement | string): Promise<void>;

export { write, copy, copyText };
