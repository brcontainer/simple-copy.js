## simple-copy.js

Copy DOM, textarea or fields values to clipboard, no Flash, only 2.3kB minified (1.14kB gzipped).

### Setup

Include lib

```html
<script src="simple-copy.min.js"></script>
```

Or use CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/simple-copy.js@0.4/simple-copy.min.js"></script>
```

Import:

```javascript
const SimpleCopy = require('simple-copy.js');
```

Import ES6 (and "libs" like Angular/Vue-cli):

```javascript
import SimpleCopy from 'simple-copy.js'
```

RequireJS:

```javascript
define(['folder/foo/bar/simple-copy'], function (SimpleCopy) {
    ...
});
```

## Usage

Copying content from a element using selector:

```javascript
SimpleCopy.copy("<selector>");
```

Copying text from a element using selector:

```javascript
SimpleCopy.copy("<selector>", { "text": true });
```

Copying entire element using selector:

```javascript
SimpleCopy.copy("<selector>", { "node": true });
```

Copying content from a element using selector:

```javascript
var element = document.querySelector(".foobar");
SimpleCopy.copy(element);
```

Copying text from a element using selector:

```javascript
var element = document.getElementById("idelement");
SimpleCopy.copy(element, { "text": true });
```

Copying entire element:

```javascript
var element = document.getElementsByClassName("<class>");
SimpleCopy.copy(element[0], { "node": true });
```

Select text in a element using selector:

```javascript
SimpleCopy.select("<selector>");
```

Select content in a element:

```javascript
var element = document.querySelector(".foobar");
SimpleCopy.select(element);
```

Select entire node:

```javascript
var element = document.querySelector(".foobar");
SimpleCopy.select(element, { "node": true });
```

Set text in clipboard:

```javascript
SimpleCopy.data("Hello, world!");
```

Copy content from element defined in data attributes:

```html
<button data-simplecopy-target="<selector>">Copy</button>
```

Copy entire element defined in data attributes:

```html
<button data-simplecopy-target="<selector>" data-simplecopy-node="true">Copy</button>
```

Select content from element defined in data attributes:

```html
<button data-simplecopy-target="<selector>" data-simplecopy-select="true">Select text</button>
```

Copy html content without format:

```html
<button data-simplecopy-target="<selector>" data-simplecopy-text="true">Copy</button>
```

Set text in clipboard by data attribute:

```html
<button data-simplecopy-data="Hello, world!">Copy text</button>
```

### Copying values from select[multiple]

Using API for copy multiple values in `<select multiple></select>`:

```javascript
SimpleCopy.copy("<selector>", { "multiple": "," });
```

In example comma is used to join multiple values, returning `foo,bar,baz`, if change to:

```javascript
SimpleCopy.copy("<selector>", { "multiple": "|" });
```

Returns: `foo|bar|baz`

You can use data attribute for copy multiple values in `<select multiple></select>`, example:

```html
<select multiple class="foobar">
    <option value="foo">Foo</option>
    <option value="Bar" multiple>Bar</option>
    <option value="Baz">Baz</option>
    <option value="fooled you!" multiple>Bazinga</option>
</select>

<button
    data-simplecopy-target=".foobar"
    data-simplecopy-multiple=","
>Copy</button>
```

### API

Method | Description
--- | ---
`SimpleCopy.copy(target[, options])` | Copy the contents of an HTML element
`SimpleCopy.select(target[, options]);` | Select the contents of an HTML element
`SimpleCopy.data(text);` | Set plain text in clipboard

### Options

In `SimpleCopy.copy` and `SimpleCopy.select` you can define behavior, example:

```javascript
SimpleCopy.copy(target, {
    "text": true
});
```

Property | type | default | description
--- | --- | --- | ---
`text:` | `bool` | `false` | If `true` copy node without markup (only text). Available only `SimpleCopy.copy`
`node:` | `bool` | `false` | If `true` copy entire node, if `false` copy node contents. Available in `SimpleCopy.copy` and `SimpleCopy.select`
`multiple:` | `string` | `null` | This property is only used when copy `<select multiple>` only, if `multiple` is not defined only first option selected is setted in clipboard, if define a "separator" like `;` is setted in clipboard something like this: `foo;bar;baz` (for each selected option). Available only `SimpleCopy.copy`

### HTML5 data attribute

Property | equivalent | example | description
--- | --- | --- | ---
`data-simplecopy-target` | - | `<button data-simplecopy-target="<selector>">Copy</button>` | -
`data-simplecopy-select` | `SimpleCopy.select(<selector>)` | `<button data-simplecopy-target="<selector>" data-simplecopy-select="true">Copy</button>` | -
`data-simplecopy-text` | `text:` | `<button data-simplecopy-target="<selector>" data-simplecopy-text="true">Copy</button>` | -
`data-simplecopy-node` | `node:` | `<button data-simplecopy-target="<selector>" data-simplecopy-node="true">Copy</button>` | -
`data-simplecopy-multiple` | `multiple:` | `<button data-simplecopy-target="<selector>" data-simplecopy-multiple=";">Copy</button>` | -
`data-simplecopy-data` | `SimpleCopy.data(<text>)` | `<button data-simplecopy-data="<text>">Copy</button>` | -
`simple-copy-ignore` | - | `<element data-simplecopy-ignore="true">.....</element>` | Ignore element if parents elements has `data-simplecopy-text` or if uses `SimpleCopy.copy(target, { "text": true });`

### jQuery clipboard API

Method | Equivalent |
--- | ---
`$("<selector>").simpleCopy("copy")` | `SimpleCopy.copy("<selector>")`
`$(element).simpleCopy("copy")` | `SimpleCopy.copy(element)`
`$("<selector>").simpleCopy("copy", { "text": true })` | `SimpleCopy.copy("<selector>", { "text": true })`
`$("<selector>").simpleCopy("copy", { "node": true })` | `SimpleCopy.copy("<selector>", { "node": true })`
`$("<selector>").simpleCopy("copy", { "multiple": ";" })` | `SimpleCopy.copy("<selector>", { "multiple": ";" })`
`$("<selector>").simpleCopy("select")` | `SimpleCopy.select("<selector>")`
`$(element).simpleCopy("select")` | `SimpleCopy.select(element)`
`$("<selector>").simpleCopy("select", { "node": true })` | `SimpleCopy.select("<selector>", { "node": true })`

## Browser Support

![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![IE9+](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png)
--- | --- | --- | --- | --- | ---
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | 10+ ✔ | 9+ ✔
