## SimpleCopy.js

Copy DOM, textarea or fields values to clipboard, no Flash, only 1.64kB minify (0.82kB gzipped)

### Setup

Include lib

```html
<script src="simplecopy.min.js"></script>
```

## Usage

Copying content from a element using selector:

```javascript
SimpleCopy.copy("{selector}");
```

Copying text from a element using selector:

```javascript
SimpleCopy.copy("{selector}", { "text": true });
```

Copying content from a element:

```javascript
var element = document.querySelector(".foobar");
SimpleCopy.copy(element);
```

Copying text from a element:

```javascript
var element = document.querySelector(".foobar");
SimpleCopy.copy(element, { "text": true });
```

Select text in a element using selector:

```javascript
SimpleCopy.select("{selector}");
```

Select text in a element:

```javascript
var element = document.querySelector(".foobar");
SimpleCopy.select(element);
```

Set text in clipboard:

```javascript
SimpleCopy.data("Hello, world!");
```

Copy content from element defined in data attributes:

```html
<button data-simplecopy-target="{selector}">Copy</button>
```

Select content from element defined in data attributes:

```html
<button data-simplecopy-target="{selector}" data-simplecopy-select="true">Select text</button>
```

Copy html content without format:

```html
<button data-simplecopy-target="{selector}" data-simplecopy-text="true">Copy</button>
```

Set text in clipboard by data attribute:

```html
<button data-simplecopy-data="Hello, world!">Copy text</button>
```

### Copying values from select[multiple]

Using API for copy multiple values in `<select multiple></select>`:

```javascript
SimpleCopy.copy("{selector}", {
    "text": true,
    "multiple": ","
});
```

In example comma is used to join multiple values, returning `foo,bar,baz`, if change to:

```javascript
SimpleCopy.copy("{selector}", {
    "text": true,
    "multiple": "|"
});

You can use data attribute for copy multiple values in `<select multiple></select>`, example:

<select multiple class="foobar">
    <option value="foo">Foo</option>
    <option value="Bar" multiple>Bar</option>
    <option value="Baz">Baz</option>
    <option value="fooled you!" multiple>Bazinga</option>
</select>

<button
    data-simplecopy-target=".foobar"
    data-simplecopy-text="true"
    data-simplecopy-multiple=","
>Copy</button>
