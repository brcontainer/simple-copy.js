Copy DOM elements, textarea content, or form field values to the clipboard.
Only **1.8kB minified**.

## Installation

Install via NPM:

```bash
npm install simple-copy.js
```

Import in your project:

```javascript
import SimpleCopy from 'simple-copy.js';
```

## Browser usage

Include the script after downloading the repository:

```html
<script src="dist/simple-copy.min.js"></script>
```

Or use a CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/simple-copy.js@2.0/dist/simple-copy.min.js"></script>
```

## Usage

### Copy HTML from an element

Using a selector:

```javascript
SimpleCopy.copy('<selector>');
```

Using a DOM element:

```javascript
const element = document.querySelector('.foobar');
SimpleCopy.copy(element);
```

### Copy text from an element or form field

Using a selector:

```javascript
SimpleCopy.copyText('<selector>');
```

Using a DOM element:

```javascript
const element = document.getElementById('idelement');
SimpleCopy.copyText(element);
```

This method automatically handles:

* `textContent` for regular elements
* `value` for inputs, textareas, and selects

### Write arbitrary content to the clipboard

Write plain text:

```javascript
SimpleCopy.write('Hello, world!');
```

Write text with a custom MIME type:

```javascript
const data = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="50"/>
</svg>`;

try {
    SimpleCopy.write(data, 'image/svg+xml');
} catch (err) {
    console.error(err.name, err.message);
}
```

Write a `Blob`:

```javascript
const obj = { hello: 'world' };
const blob = new Blob([JSON.stringify(obj, null, 2)], {
    type: 'application/json',
});

try {
    SimpleCopy.write(blob);
} catch (err) {
    console.error(err.name, err.message);
}
```

## Using HTML data attributes

You can delegate copy actions directly from the DOM using `data-*` attributes.

Copy an element as HTML:

```html
<button data-simple-copy="<selector>">Copy</button>
```

Copy only the text content:

```html
<button data-simple-copy-text="<selector>">Copy</button>
```

Write static text to the clipboard:

```html
<button data-simple-copy-write="Hello, world!">Copy text</button>
```

## API

| Method                          | Description                                           |
| ------------------------------- | ----------------------------------------------------- |
| `SimpleCopy.copy(selector)`     | Finds an element and copies its HTML to the clipboard |
| `SimpleCopy.copy(element)`      | Copies the element HTML to the clipboard              |
| `SimpleCopy.copyText(selector)` | Finds an element and copies its text content          |
| `SimpleCopy.copyText(element)`  | Copies the element text content                       |
| `SimpleCopy.write(text)`        | Writes plain text to the clipboard                    |
| `SimpleCopy.write(data, type)`  | Writes text or Blob with a specific MIME type         |

## HTML5 data attributes

| Attribute                | Equivalent API call             | Example                                                    |
| ------------------------ | ------------------------------- | ---------------------------------------------------------- |
| `data-simple-copy`       | `SimpleCopy.copy(selector)`     | `<button data-simple-copy="<selector>">Copy</button>`      |
| `data-simple-copy-text`  | `SimpleCopy.copyText(selector)` | `<button data-simple-copy-text="<selector>">Copy</button>` |
| `data-simple-copy-write` | `SimpleCopy.write(text)`        | `<button data-simple-copy-write="Hello">Copy</button>`     |
