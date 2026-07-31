# CSS Tutorial Outline (W3Schools Style)

## 1. CSS Introduction

### Overview
Learn CSS (Cascading Style Sheets) — the language used to style HTML elements on web pages. CSS controls layout, colors, fonts, spacing, and responsive design.

### Chapter 1: CSS Basics
- What is CSS?
- CSS vs HTML — What Each Does
- How CSS Works (Selectors, Properties, Values)
- Adding CSS to HTML (Inline, Internal, External)
- CSS Syntax (Selector `{ property: value; }`)
- CSS Comments (`/* comment */`)
- Your First CSS Style

**Example:**
```html
<h1 style="color: blue;">Hello World</h1>
```
```css
h1 {
  color: blue;
  font-size: 32px;
}
```

**Exercise:** Create an HTML file linked to an external CSS file and apply a background color to the body.
**Quiz:**
1. What does CSS stand for?
2. Name three ways to add CSS to HTML.
3. What is the syntax structure of a CSS rule?
4. Which CSS method is best for separating style from content?
5. How do you write a single-line comment in CSS?

---

### Chapter 2: CSS Selectors
- Element/Type Selectors (`p`, `div`, `h1`)
- Class Selectors (`.className`)
- ID Selectors (`#myId`)
- Universal Selector (`*`)
- Grouping Selectors (`h1, h2, h3`)
- Descendant Selectors (`div p`)
- Child Selectors (`ul > li`)
- Attribute Selectors (`[type="text"]`, `[href]`)
- Pseudo-classes (`:hover`, `:first-child`, `:nth-child()`)
- Pseudo-elements (`::before`, `::after`, `::first-line`)

**Example:**
```css
/* Element selector */
p { color: black; }

/* Class selector */
.highlight { background-color: yellow; }

/* ID selector */
#main-title { font-size: 40px; }

/* Descendant selector */
nav a { text-decoration: none; }

/* Pseudo-class */
a:hover { color: red; }

/* Pseudo-element */
p::first-line { font-weight: bold; }
```

**Exercise:** Style three paragraphs with different selectors: one by class, one by ID, and one by element type. Add a hover effect to links.
**Quiz:**
1. What selector targets an element with `class="intro"`?
2. How do you select an element with a specific ID?
3. Which selector targets all `<p>` elements inside `<div>`?
4. What does `::before` do?
5. Name a common pseudo-class used for links.

---

---

## 2. Formatting and Text

### Overview
Learn how to format text, control fonts, and define spacing using CSS.

### Chapter 3: CSS Fonts and Text
- Font Family (`font-family`)
- Font Size (`font-size`)
- Font Weight (`font-weight`, `@font-face`)
- Font Style (`font-style: italic`, `oblique`)
- Text Alignment (`text-align`)
- Text Decoration (`text-decoration: underline`, `line-through`, `overline`)
- Text Transform (`text-transform: uppercase`, `lowercase`, `capitalize`)
- Letter Spacing (`letter-spacing`) and Word Spacing (`word-spacing`)
- Line Height (`line-height`)
- Google Fonts and `@import`

**Example:**
```css
body {
  font-family: Arial, sans-serif;
  font-size: 16px;
  line-height: 1.6;
}
h1 {
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
}
a {
  text-decoration: none;
}
```

**Exercise:** Create a styled heading and paragraph using Google Fonts with custom font size, alignment, and line height.
**Quiz:**
1. What property sets the font family?
2. How do you center-align text?
3. What does `text-transform: uppercase` do?
4. Which property controls the height of a line of text?
5. How do you import a Google Font?

---

### Chapter 4: The Box Model
- Content, Padding, Border, Margin
- `width` and `height`
- `padding` (all sides, shorthand)
- `border` (width, style, color)
- `margin` (centering with `auto`)
- `box-sizing: border-box`
- `outline` vs `border`

**Example:**
```css
.box {
  width: 300px;
  padding: 20px;
  border: 2px solid #ccc;
  margin: 10px auto;
  box-sizing: border-box;
}
```

**Exercise:** Create a div with 200px width, 10px padding, 3px border, and 20px margin. Center it on the page.
**Quiz:**
1. What are the four parts of the CSS box model?
2. What is the difference between `margin` and `padding`?
3. Which value of `box-sizing` includes padding and border in the width?
4. How do you center a block horizontally?
5. What is the difference between `outline` and `border`?

---

---

## 3. Colors and Backgrounds

### Overview
Learn how to apply colors, gradients, and background images using CSS.

### Chapter 5: Colors in CSS
- Color Names (`red`, `blue`, `coral`)
- HEX Notation (`#FF0000`, `#F00`)
- RGB and RGBA (`rgb(255,0,0)`, `rgba(255,0,0,0.5)`)
- HSL and HSLA (`hsl(0,100%,50%)`, `hsla(0,100%,50%,0.5)`)
- `transparent` and `currentColor`
- Color Contrast and Accessibility

**Example:**
```css
h1 { color: #FF0000; }
.box { background-color: rgba(0, 0, 255, 0.3); }
.text { color: hsl(120, 100%, 25%); }
```

**Exercise:** Create a page with a heading, a paragraph, and a box, each using a different color format (HEX, RGBA, HSL).
**Quiz:**
1. What does `#FF0000` represent in HEX?
2. What is the fourth value in `rgba()`?
3. Which color format uses Hue, Saturation, and Lightness?
4. What does `transparent` do in CSS?
5. Why is color contrast important in CSS?

---

### Chapter 6: Backgrounds
- `background-color`
- `background-image` (URL, gradient)
- `background-repeat` (`no-repeat`, `repeat-x`, `repeat-y`)
- `background-position` (`center`, `top left`, `50% 50%`)
- `background-size` (`cover`, `contain`, `100px 100px`)
- `background-attachment` (`fixed`, `scroll`)
- Multiple Backgrounds
- CSS Gradients (linear, radial)

**Example:**
```css
 body {
  background-color: #f0f0f0;
  background-image: url("bg.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.gradient {
  background: linear-gradient(to right, red, blue);
}
```

**Exercise:** Create a hero section with a full-page background image (cover, no-repeat, fixed) and an overlay gradient.
**Quiz:**
1. Which value makes a background image not repeat?
2. What does `background-size: cover` do?
3. What is the difference between `linear-gradient` and `radial-gradient`?
4. How do you stack multiple backgrounds?
5. Which property keeps a background fixed while scrolling?

---

---

## 4. Layout and Positioning

### Overview
Learn the CSS layout techniques: normal flow, Flexbox, and Grid.

### Chapter 7: Display Property
- `display: block`, `inline`, `inline-block`
- `display: none` vs `visibility: hidden`
- `display: flex`
- `display: grid`
- `display: position`

**Example:**
```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.hidden {
  display: none;
}
```

**Exercise:** Convert a multi-div layout to use `display: flex` with `justify-content: space-between`.
**Quiz:**
1. What is the difference between `display: none` and `visibility: hidden`?
2. Which display value creates a flex container?
3. What does `display: inline-block` allow?
4. Which display value creates a grid container?
5. What does `display` default to for block elements?

---

### Chapter 8: Flexbox
- `flex-direction` (`row`, `column`, `row-reverse`, `column-reverse`)
- `flex-wrap` (`nowrap`, `wrap`, `wrap-reverse`)
- `justify-content` (`flex-start`, `flex-end`, `center`, `space-between`, `space-around`, `space-evenly`)
- `align-items` (`flex-start`, `flex-end`, `center`, `baseline`, `stretch`)
- `align-content`
- Flex Grow (`flex-grow` or `flex: 1`)
- Flex Shrink (`flex-shrink`)
- Flex Basis (`flex-basis`)
- Flex Shorthand (`flex: 1 1 auto`)

**Example:**
```css
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.item {
  flex: 1;
  margin: 10px;
}
```

**Exercise:** Create a responsive navigation bar using flexbox with evenly spaced links.
**Quiz:**
1. Which property aligns items along the main axis?
2. What does `flex-wrap: wrap` do?
3. What is the default value of `flex-direction`?
4. How do you make all flex items grow equally?
5. What does `align-items: stretch` do?

---

### Chapter 9: CSS Grid
- `display: grid`
- `grid-template-columns` and `grid-template-rows`
- `grid-template-areas`
- `gap` (grid gap)
- `grid-column` and `grid-row` for placement
- Auto-fit and Auto-fill
- Named Grid Lines
- `fr` (fractional) Unit
- `minmax()` in Grid
- Responsive Grid Layouts

**Example:**
```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.sidebar {
  grid-column: 1 / 3;
}
```

**Exercise:** Create a responsive 3-column layout using CSS Grid that becomes 2 columns on tablet and 1 column on mobile.
**Quiz:**
1. Which property defines grid columns?
2. What is the `fr` unit used for?
3. How do you span an item across 2 columns?
4. What does `auto-fill` do in `repeat()`?
5. Name the property that sets the gap between grid items.

---

---

## 5. Responsive Design

### Overview
Learn how to make web pages adapt to different screen sizes using CSS.

### Chapter 10: Media Queries
- Viewport Meta Tag (`<meta name="viewport">`)
- `@media` Rules
- Breakpoints (Common: 480px, 768px, 1024px, 1440px)
- Mobile-First vs Desktop-First
- `min-width` vs `max-width`
- Combining Media Queries
- Hide/Show Elements by Screen Size

**Example:**
```css
/* Mobile-first */
.container { display: flex; flex-direction: column; }

/* Tablet */
@media (min-width: 768px) {
  .container { flex-direction: row; }
}

/* Desktop */
@media (min-width: 1024px) {
  .container { max-width: 1200px; margin: auto; }
}
```

**Exercise:** Create a responsive two-column layout that stacks on mobile using media queries.
**Quiz:**
1. What does the viewport meta tag do?
2. What is the mobile-first approach?
3. What is a common tablet breakpoint width?
4. Which media query value targets screens wider than 768px?
5. What happens if you don't include a viewport meta tag?

---

---

## Cross-Language Exercises

### Project 1: Personal Portfolio Page
Build a single-page portfolio with: styled headings (Google Fonts), a box-model-based card layout, colored backgrounds and gradients, a responsive navigation bar using Flexbox, and a media query for mobile.

### Project 2: Company Landing Page
Create a landing page with: hero section with full background, CSS Grid for feature sections, styled buttons with hover effects, responsive typography, and a footer with styled links.

### Project 3: Blog Layout
Build a blog page with: styled article sections, Flexbox sidebar, responsive grid for image gallery, typography hierarchy, and print-friendly styles in a media query.

---

## Progress Tracking
- Each chapter ends with a summary and key takeaways
- Exercises are rated Easy / Medium / Hard
- Each chapter has a 5-question quiz for self-assessment
- Completion badges for each section

---

## Additional Resources
- W3Schools CSS Tutorial (w3schools.com/css)
- MDN Web Docs CSS Reference (developer.mozilla.org/en-US/docs/Web/CSS)
- CSS-Tricks (css-tricks.com)
- Flexbox Froggy (flexboxfroggy.com)
- Grid Garden (cssgridgarden.com)
'''