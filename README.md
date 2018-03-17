## SimpleCopy.js

Copy DOM, textarea or fields values to clipboard, no Flash, only 1Kb minify

### Setup

Include lib

```html
<script src="simplecopy.min.js"></script>
```

## Usage

Copying content from a element:

```javascript
SimpleCopy.copy("{selector}");
```

Select text in a element:

```javascript
SimpleCopy.select("{selector}");
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
