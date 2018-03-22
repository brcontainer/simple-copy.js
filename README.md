## SimpleCopy.js

Copy DOM, textarea or fields values to clipboard, no Flash, only 1.69kB minified (0.90kB gzipped)

### Setup

Include lib

```html
<script src="simplecopy.min.js"></script>
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
`SimpleCopy.copy(target[, options])` | Copy a html element
`SimpleCopy.select(target[, options]);` | Select a html element
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
`multiple:` | `string` | `null` | This property is only used when copy `<select multiple>` only, if `multiple` is not defined is setted in clipboard only.  value from first selected option, if define a "separator" like `;` is setted in clipboard something like this: `foo;bar;baz` (for each selected option). Available only `SimpleCopy.copy`

### HTML5 data attribute

Property | equivalent | example
--- | --- | ---
`data-simplecopy-target` | - | `<button data-simplecopy-target="<selector>">Copy</button>`
`data-simplecopy-select` | `SimpleCopy.select(<selector>)` | `<button data-simplecopy-target="<selector>" data-simplecopy-select="true">Copy</button>`
`data-simplecopy-text` | `text:` | `<button data-simplecopy-target="<selector>" data-simplecopy-text="true">Copy</button>`
`data-simplecopy-node` | `node:` | `<button data-simplecopy-target="<selector>" data-simplecopy-node="true">Copy</button>`
`data-simplecopy-multiple` | `multiple:` | `<button data-simplecopy-target="<selector>" data-simplecopy-multiple=";">Copy</button>`
`data-simplecopy-data` | `SimpleCopy.data(<text>)` | `<button data-simplecopy-data="<text>">Copy</button>`
