# Berth
Convert URL's into links without affecting HTML elements.

Before:

```html
Lorem ipsum <a href="https://github.com/">dolor</a> sit amet, https://github.com/DiegoLopesLima/berth consectetur adipisicing elit. Reprehenderit, tempore?
```

After:

```html
Lorem ipsum <a href="https://github.com/">dolor</a> sit amet, <a href="https://github.com/DiegoLopesLima/berth" target="_blank">https://github.com/DiegoLopesLima/berth</a> consectetur adipisicing elit. Reprehenderit, tempore?
```
