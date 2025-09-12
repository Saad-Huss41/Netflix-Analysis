# Assets Directory

This directory contains static assets for the videogame sales dashboard.

## Directory Structure

- `images/` - Images, icons, logos
- `fonts/` - Custom fonts (if needed)
- `icons/` - Icon files (SVG, PNG)

## Usage

Place any static assets like:
- Dashboard logo
- Platform icons (PlayStation, Xbox, Nintendo, etc.)
- Genre icons
- Background images
- Favicon

The CSS and JavaScript files can reference assets in this directory using relative paths like:
```css
background-image: url('../assets/images/logo.png');
```

```html
<img src="assets/icons/platform-icon.svg" alt="Platform">
```