## simplecopy.js

Copy DOM, textarea or fields values to clipboard, no Flash, only 1Kb minify

### Setup

Include lib

```html
<script src="simplecopy.min.js"></script>
```

## Usage

Coping:

```javascript
SimpleCopy.copy("{selector}");
```

Select:

```javascript
SimpleCopy.select("{selector}");
```

Set text in clipboard:

```javascript
SimpleCopy.text("Hello, world!");
```

Copy content from element defined in data attributes:

```html
<button data-simplecopy-target="{selector}">Copy</button>
```

Select content from element defined in data attributes:

```html
<button data-simplecopy-target="{selector}" data-simplecopy-select="true">Select text</button>
```

Set text in clipboard by data attribute:

```html
<button data-simplecopy-text="Hello, world!">Copy text</button>
```
