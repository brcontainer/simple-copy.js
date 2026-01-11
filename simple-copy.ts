/*
 * simple-copy.js 2.0.0
 *
 * Copyright (c) 2026 Guilherme Nascimento (brcontainer@yahoo.com.br)
 *
 * Released under the MIT license
 */

type CopyableElement = HTMLElement | MathMLElement | SVGElement;
type Callback = (value: string) => Promise<void>;

const elementSelectors = [
    'data-simple-copy',
    'data-simple-copy-text',
    'data-simple-copy-write'
];

const matchSelector = `[${elementSelectors.join('],[')}]`;

/**
 * Resolve element from selector or return a element
 *
 * @param elementOrSelector - The HTML, MathML or SVG element to be copied.
 */
function resolveElement(elementOrSelector: CopyableElement | string): CopyableElement
{
    if (typeof elementOrSelector !== 'string') {
        return elementOrSelector;
    }

    const element = document.querySelector<CopyableElement>(elementOrSelector);

    if (element === null) {
        throw new Error(`Element not found for selector: ${elementOrSelector}`);
    }

    return element;
}

/**
 * Writes content (string or Blob) to the clipboard with a specific MIME type.
 *
 * @param source - String, text, or binary to copy
 * @param [type] - Changes the MIME type (if omitted, the default will be the Blob type, or text/plain for others).
 */
async function write(source: Blob | string | number, type?: string): Promise<void>
{
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
        throw new Error('Clipboard API is not supported');
    }

    if (source instanceof Blob) {
        if (!type) {
            type = source.type;

            if (!type) {
                throw new Error('Blob type is missing');
            }
        }
    } else {
        type = type ?? 'text/plain';

        if (typeof source !== 'string') {
            source = String(source);
        }
    }

    if (type === 'text/plain') {
        if (source instanceof Blob) {
            source = await source.text();
        }

        await navigator.clipboard.writeText(source);
    } else {
        if (!navigator.clipboard.write) {
            throw new Error('Clipboard.write() method is not supported by your browser');
        }

        if (typeof ClipboardItem === 'undefined') {
            throw new Error('ClipboardItem is not supported');
        }

        await navigator.clipboard.write([
            new ClipboardItem({
                [type]: source
            })
        ]);
    }
}

/**
 * Copies the outerHTML of the provided HTML, MathML or SVG element.
 *
 * @param elementOrSelector - Element or Seletor.
 */
async function copy(elementOrSelector: CopyableElement | string): Promise<void>
{
    const element = resolveElement(elementOrSelector);
    return write(element.outerHTML, 'text/html');
}

/**
 * Copies only the textContent (visible text) of the provided HTML, MathML or SVG element.
 *
 * @param elementOrSelector - Element or Seletor.
 */
async function copyText(elementOrSelector: CopyableElement | string): Promise<void>
{
    const element = resolveElement(elementOrSelector);
    const dataset = element.dataset;

    let output = '';

    if (dataset.simpleCopyPrepend !== undefined) {
        output += dataset.simpleCopyPrepend;
    }

    let content;

    if (
        element instanceof HTMLInputElement ||
        element instanceof HTMLTextAreaElement ||
        element instanceof HTMLSelectElement
    ) {
        content = element.value;
    } else {
        content = element.textContent ?? '';
    }

    output += content;

    if (dataset.simpleCopyAppend !== undefined) {
        output += dataset.simpleCopyAppend;
    }

    return write(output, 'text/plain');
}

/**
 * Delegate click events for use `data-simple-copy-*` attributes
 *
 * @param entry
 * @param node
 * @param attr
 * @param callback
 */
function trigger(entry: string, node: CopyableElement, attr: string, callback: Callback) {
    if (entry) {
        callback(entry);
    } else {
        console.error(`${attr} attribute is empty`, node);
    }
}

/**
 * Delegate click events for use `data-simple-copy-*` attributes
 *
 * @param event
 */
function setupDom(event: MouseEvent): void
{
    if (event.button !== 0) return;

    if (
        event.target instanceof HTMLElement ||
        event.target instanceof MathMLElement ||
        event.target instanceof SVGElement
    ) {
        let element: CopyableElement | null = event.target;

        if (element) {
            element = element.closest<CopyableElement>(matchSelector);
        }

        if (!element) return;

        const dataset = element.dataset;

        if (dataset.simpleCopyWrite !== undefined) {
            trigger(dataset.simpleCopyWrite, element, 'data-simple-copy-write', write);
        } else if (dataset.simpleCopyText !== undefined) {
            trigger(dataset.simpleCopyText, element, 'data-simple-copy-text', copyText);
        } else if (dataset.simpleCopy !== undefined) {
            trigger(dataset.simpleCopy, element, 'data-simple-copy', copy);
        }
    }
}

document.addEventListener('click', setupDom);

export { write, copy, copyText };
