# Vue Panel System

It's a website solution for admin panel for any website

Panel is built with TS, Eslint, Prettier, Vue and custom API service.

## Installation

- Download code
- run command `npm i` or `npm install`
- run command `npm run build`
- run application using command `npm run dev`

## Adding 📦 SVG Icon in System

This project includes a scalable, type‑safe SVG icon system powered by **vite-svg-loader**.  
It allows you to import SVG files as Vue components and use them anywhere in the app with full control over size, color, and stroke.

---

### ✅ 1. Add SVG Files

Place your SVG files inside:

```
src/assets/icons/
```

Example:

```
src/assets/icons/expand.svg
src/assets/icons/collapse.svg
```

SVGs should ideally use:

```svg
stroke="currentColor"
fill="none"
```

This allows the icon to inherit color from CSS or props.

---

### ✅ 2. Updating files for a New Icon (Step‑by‑Step)

1. Drop your SVG into `src/assets/icons/`
2. Import it in `icons.ts`
3. Add it to the `icons` object
4. Use it anywhere via `<SvgIcon name="your-icon-name" />`

That’s it.

---

## API Service Documentation

In this system we use custom API Service. [Read API service documentation](API_Service_README.md)