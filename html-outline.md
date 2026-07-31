# HTML Tutorial Outline (W3Schools Style)

## 1. Introduction

### Overview
Learn the basics of HTML — the building block of every web page. HTML defines the structure and content of a webpage using elements represented by tags.

### Chapter 1: HTML Basics
- What is HTML?
- How a Web Browser Reads HTML
- HTML Document Structure (`<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`)
- Your First HTML Page
- View Source in Browser
- HTML File Extension (`.html`, `.htm`)
- HTML Editors (VS Code, Notepad, Online Editors)

**Example:**
```html
<!DOCTYPE html>
<html>
  <head>
    <title>My First Page</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
    <p>This is my first HTML page.</p>
  </body>
</html>
```

**Exercise:** Create a minimal HTML page with a title and a heading. Open it in a browser.
**Quiz:**
1. What does HTML stand for?
2. Which tag defines the main content area?
3. What is the file extension for an HTML file?
4. Which tag is used to define the document title?
5. Is HTML a programming language?

---

### Chapter 2: HTML Elements
- Opening and Closing Tags
- Self-Closing (Void) Tags (`<br>`, `<hr>`, `<img>`, `<input>`)
- Nested Elements
- HTML Element Anatomy (`<tag attribute="value">content</tag>`)
- Block-Level vs Inline Elements (`<div>` vs `<span>`)
- HTML Attribute Reference (`href`, `src`, `alt`, `class`, `id`)

**Example:**
```html
<p>This is a <strong>bold</strong> paragraph.</p>
<img src="photo.jpg" alt="A photo" />
<a href="https://example.com">Visit Example</a>
```

**Exercise:** Create a page that uses at least 5 different HTML elements including block and inline elements.
**Quiz:**
1. Name two void (self-closing) HTML tags.
2. What is the difference between a block and inline element?
3. Which attribute provides alternate text for images?
4. How do you create a link to another page?
5. What does `<strong>` render as in the browser?

---

### Chapter 3: HTML Headings
- `<h1>` through `<h6>` Tags
- Default Heading Sizes and Styling
- When to Use Which Heading Level
- Accessibility Tips (Screen Readers and Headings)
- Heading Hierarchy Best Practices

**Example:**
```html
<h1>Main Title</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>
<p>Paragraph under the subsection.</p>
```

**Exercise:** Create a page with 3 levels of headings (h1, h2, h3) for an article structure.
**Quiz:**
1. How many levels of headings does HTML have?
2. Which heading is the most important?
3. Is `<h1>` typically the largest or smallest heading?
4. Why is proper heading hierarchy important for accessibility?
5. Can you skip heading levels (e.g., go from h1 to h3)?

---

### Chapter 4: HTML Paragraphs and Text
- The `<p>` Tag
- Text Formatting Tags (`<strong>`, `<em>`, `<b>`, `<i>`, `<mark>`, `<small>`, `<del>`, `<ins>`, `<sub>`, `<sup>`)
- Whitespace and Line Breaks (`<br>`, `<pre>`)
- Special Characters and HTML Entities (`&copy;`, `&reg;`, `&lt;`, `&gt;`, `&amp;`)
- The `<blockquote>` and `<cite>` Tags
- Defining Abbreviations (`<abbr>`)

**Example:**
```html
<p>This is a <em>paragraph</em> with some <strong>bold text</strong>.</p>
<p>Use <code>&lt;br&gt;</code> for a line break.</p>
<p>Copyright &copy; 2026</p>
<pre>
  Text      with
  preserved spaces
</pre>
```

**Exercise:** Write a paragraph that uses at least 4 different text formatting tags and includes an HTML entity.
**Quiz:**
1. Which tag makes text bold without semantic importance?
2. What does `<em>` render as (italic or bold)?
3. How do you display the less-than sign (`<`) in HTML?
4. Which tag defines a long quotation?
5. What does `<small>` do?

---

### Chapter 5: HTML Lists
- Unordered Lists (`<ul>` with `<li>`)
- Ordered Lists (`<ol>` with `<li>`)
- List Item (`<li>`)
- Nested (Multi-Level) Lists
- Description Lists (`<dl>`, `<dt>`, `<dd>`)
- Styling List Types (`list-style-type`)

**Example:**
```html
<ul>
  <li>Milk</li>
  <li>Bread</li>
  <li>Eggs</li>
</ul>
<ol>
  <li>First step</li>
  <li>Second step</li>
</ol>
<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language</dd>
</dl>
```

**Exercise:** Create a webpage with an unordered grocery list and an ordered recipe steps list, both nested one level deep.
**Quiz:**
1. What tag is used for each item in an unordered list?
2. Which tag creates a numbered list?
3. How do you create a nested list?
4. What tags make up a description list?
5. What is the difference between `<ul>` and `<ol>`?

---

### Chapter 6: Links and Navigation
- The `<a>` Tag and `href` Attribute
- Absolute vs Relative URLs
- Opening Links in New Tabs (`target="_blank"`)
- Link States (`:link`, `:visited`, `:hover`, `:active`)
- Anchor Links (`#section-id`)
- Email Links (`mailto:`)
- Phone Links (`tel:`)
- Download Links (`download` attribute)

**Example:**
```html
<a href="https://www.w3schools.com">W3Schools</a>
<a href="page2.html">Internal Link</a>
<a href="#section1">Jump to Section</a>
<a href="mailto:info@example.com">Email Us</a>
<a href="file.pdf" download>Download PDF</a>
```

**Exercise:** Create a navigation bar with 3 internal links, 1 external link, and an anchor link to a section on the same page.
**Quiz:**
1. Which attribute defines the link destination?
2. How do you open a link in a new tab?
3. What does `target="_blank"` do?
4. What is an anchor link used for?
5. Which protocol is used for email links?

---

---

## 2. Formatting

### Overview
Learn how to format text, add emphasis, and present code in HTML.

### Chapter 7: Text Formatting
- Bold and Italic (`<b>`, `<strong>`, `<i>`, `<em>`)
- Marked/Highlighted Text (`<mark>`)
- Deleted and Inserted Text (`<del>`, `<ins>`)
- Subscript and Superscript (`<sub>`, `<sup>`)
- Monospace/Code Text (`<code>`, `<kbd>`, `<samp>`, `<var>`)
- Text Direction (`<bdo>`, `dir` attribute)

**Example:**
```html
<p>This is <b>bold</b> and <i>italic</i>.</p>
<p>Use <code>&lt;div&gt;</code> for a block.</p>
<p>H<sub>2</sub>O and E = mc<sup>2</sup></p>
<p>The result: <mark>highlighted</mark></p>
```

**Exercise:** Format a scientific paragraph using sub/superscripts and include at least two styled text elements.
**Quiz:**
1. What is the semantic difference between `<strong>` and `<b>`?
2. Which tag marks text for deletion?
3. Which tag writes subscript text?
4. What does `<kbd>` represent?
5. How do you display a code snippet inline?

---

### Chapter 8: Block and Inline Elements
- Block-Level Elements (`<div>`, `<p>`, `<h1>`–`<h6>`, `<ul>`, `<ol>`, `<section>`)
- Inline Elements (`<span>`, `<a>`, `<strong>`, `<em>`)
- The `<div>` Container
- The `<span>` Container
- Grouping Content (`<section>`, `<article>`, `<aside>`, `<header>`, `<footer>`)
- Separation of Structure and Style (Why use `<div>` and `<span>` for CSS)

**Example:**
```html
<div class="container">
  <section>
    <h2>Article Title</h2>
    <p>A <span>highlighted</span> word.</p>
  </section>
</div>
```

**Exercise:** Create a page that uses `<section>`, `<article>`, `div`, and `span` together in a meaningful layout.
**Quiz:**
1. Name three block-level elements.
2. Name three inline elements.
3. What is the purpose of `<div>`?
4. What is the difference between `<section>` and `<div>`?
5. Which element is used for inline styling wrappers?

---

---

## 3. Links and Images

### Overview
Learn how to link pages together and embed images and multimedia in HTML.

### Chapter 9: Links Deep Dive
- `href` vs `src` Attributes
- Relative Paths (`./`, `../`, subdirectories)
- Absolute vs Relative URLs
- Fragment Identifiers and Named Anchors
- `rel` Attribute (`noopener noreferrer`)
- Download Links and `download` Attribute
- Accessible Links (Meaningful Link Text)

**Example:**
```html
<a href="https://www.example.com" target="_blank" rel="noopener noreferrer">
  External Link
</a>
<a href="images/photo.jpg" download>
  Download Photo
</a>
<a href="#footer">Back to Top</a>
```

**Exercise:** Create a page with 4 links: one external, one internal (same directory), one to a subdirectory file, and one download link.
**Quiz:**
1. What does `rel="noopener noreferrer"` do?
2. How do you reference a file in a subdirectory?
3. Which attribute makes a link downloadable?
4. What is a fragment identifier?
5. Why should external links include `rel="noopener noreferrer"`?

---

### Chapter 10: Images
- The `<img>` Tag with `src` and `alt`
- Responsive Images (`srcset`, `sizes`)
- Image Formats (`JPEG`, `PNG`, `WebP`, `SVG`, `GIF`)
- Decorative vs Informative Images
- Width and Height Attributes
- Lazy Loading (`loading="lazy"`)
- Figure and Figcaption (`<figure>`, `<figcaption>`)
- Image Maps (`<map>` and `usemap`)

**Example:**
```html
<img src="photo.jpg" alt="A sunset over the ocean" width="600" />
<img srcset="photo-400.jpg 400w, photo-800.jpg 800w" sizes="(max-width: 600px) 400px" alt="Responsive" />
<figure>
  <img src="chart.png" alt="Bar chart" />
  <figcaption>Figure 1: Monthly sales</figcaption>
</figure>
```

**Exercise:** Create a page with 3 images using different formats (JPEG, WebP, SVG) and add alt text for all.
**Quiz:**
1. Which attribute is required on `<img>` for accessibility?
2. Which image format supports transparency?
3. What is the purpose of `srcset`?
4. What does `loading="lazy"` do?
5. Which tags wrap an image with a caption?

---

### Chapter 11: Multimedia
- Embedding Video (`<video>`)
- Video Controls, Autoplay, Loops
- Embedding Audio (`<audio>`)
- YouTube/Vimeo Embeds (`<iframe>`)
- Responsive Video (`<video>` with `max-width: 100%`)
- Multiple Sources (`<source>` tag)

**Example:**
```html
<video controls width="640">
  <source src="movie.mp4" type="video/mp4" />
  <source src="movie.webm" type="video/webm" />
  Your browser does not support the video tag.
</video>
<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video" allowfullscreen></iframe>
```

**Exercise:** Embed a YouTube video and a local video with controls and fallback text on the same page.
**Quiz:**
1. Which tag embeds a video?
2. What attribute adds video controls (play/pause)?
3. What is the `<source>` tag used for?
4. How do you embed a YouTube video?
5. Why is responsive video important?

---

---

## 4. Tables

### Overview
Learn how to create and style HTML tables for structured data presentation.

### Chapter 12: Basic Tables
- The `<table>` Element
- Table Rows (`<tr>`)
- Table Header Cells (`<th>`)
- Table Data Cells (`<td>`)
- Table Caption (`<caption>`)
- Table Structure (`<thead>`, `<tbody>`, `<tfoot>`)
- Basic Table Syntax

**Example:**
```html
<table>
  <caption>Student Grades</caption>
  <thead>
    <tr>
      <th>Name</th>
      <th>Grade</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Alice</td>
      <td>A</td>
    </tr>
  </tbody>
</table>
```

**Exercise:** Create a table of 3 students with Name, Age, and Grade columns using `<thead>` and `<tbody>`.
**Quiz:**
1. Which tag defines a table row?
2. What is the difference between `<th>` and `<td>`?
3. Which tag wraps the table header?
4. How do you add a caption to a table?
5. What is the purpose of `<tbody>`?

---

### Chapter 13: Table Rows and Cells
- Merging Cells with `colspan` and `rowspan`
- Nested Tables
- Empty Cells and `&nbsp;`
- Adding Footer Rows (`<tfoot>`)
- Table Row Grouping (`<thead>`, `<tbody>`, `<tfoot>`)
- Cell Padding and Spacing (HTML attributes vs CSS)
- Defining Scope and Headers for Accessibility

**Example:**
```html
<table>
  <tr>
    <th colspan="2">Full Name</th>
    <th>Score</th>
  </tr>
  <tr>
    <td rowspan="2">Alice</td>
    <td>Smith</td>
    <td>95</td>
  </tr>
  <tr>
    <td>Jones</td>
    <td>88</td>
  </tr>
</table>
```

**Exercise:** Create a timetable with merged headers (colspan) and merged cells (rowspan) for a 2-day schedule.
**Quiz:**
1. What attribute merges columns horizontally?
2. What attribute merges rows vertically?
3. How do you handle empty table cells for accessibility?
4. Which tag groups the table footer rows?
5. Why is `scope` important in `<th>`?

---

---

## 5. Forms

### Overview
Learn how to build HTML forms for user input and data collection.

### Chapter 14: Form Basics
- The `<form>` Element
- Input Types: `text`, `password`, `email`, `number`, `tel`, `url`
- The `<label>` Element and `for` Attribute
- `name` and `id` Attribute Pairing
- Placeholder Text (`placeholder`)
- Required Fields (`required`)
- Autocomplete Attributes

**Example:**
```html
<form>
  <label for="name">Name:</label>
  <input type="text" id="name" name="name" placeholder="Your name" required />
  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required />
  <button type="submit">Submit</button>
</form>
```

**Exercise:** Create a signup form with name, email, password fields all marked required.
**Quiz:**
1. Which element wraps form inputs?
2. What is the purpose of `<label for="...">`?
3. Which input type is for email addresses?
4. What does `required` do?
5. Name two input types for numeric data.

---

### Chapter 15: Advanced Form Controls
- Textarea (`<textarea>`)
- Select/Dropdown Menus (`<select>`, `<option>`, `<optgroup>`)
- Checkboxes (`<input type="checkbox">`)
- Radio Buttons (`<input type="radio">`)
- File Upload (`<input type="file">`)
- Hidden Inputs (`<input type="hidden">`)
- Buttons (`<button>`, `<input type="submit">`, `<input type="reset">`)
- Fieldset and Legend (`<fieldset>`, `<legend>`)

**example:**
```html
<fieldset>
  <legend>Membership</legend>
  <input type="radio" id="free" name="plan" value="free" />
  <label for="free">Free</label>
  <input type="radio" id="premium" name="plan" value="premium" />
  <label for="premium">Premium</label>
</fieldset>
<select name="country" id="country">
  <option value="us">United States</option>
  <option value="uk">United Kingdom</option>
</select>
```

**Exercise:** Build a registration form with a dropdown for country, radio buttons for plan selection, a textarea for bio, and a file upload for your profile picture.
**Quiz:**
1. Which element creates a multi-line text input?
2. What tag groups radio buttons together?
3. Which input type allows file uploads?
4. What is the difference between `<button>` and `<input type="submit">`?
5. What are `<fieldset>` and `<legend>` used for?

---

---

## 6. Semantic HTML

### Overview
Learn how to use meaningful HTML5 elements to improve accessibility and SEO.

### Chapter 16: Semantic Elements
- `<header>`, `<nav>`, `<main>`, `<footer>`
- `<section>`, `<article>`, `<aside>`
- When to Use `<div>` vs Semantic Elements
- Screen Reader and SEO Benefits
- Document Outline Model

**Example:**
```html
<body>
  <header><h1>My Website</h1></header>
  <nav><a href="/">Home</a> | <a href="/about">About</a></nav>
  <main>
    <article>
      <h2>Blog Post</h2>
      <p>Content here.</p>
    </article>
    <aside>Related links</aside>
  </main>
  <footer>&copy; 2026</footer>
</body>
```

**Exercise:** Convert a `<div>`-based layout to use semantic HTML5 elements.
**Quiz:**
1. Which element defines navigational links?
2. What is the purpose of `<main>`?
3. Which element represents independent, self-contained content?
4. Name three benefits of semantic HTML.
5. What is the difference between `<section>` and `<article>`?

---

### Chapter 17: Accessibility (A11y)
- Alt Text for Images
- ARIA Labels and Roles
- Focus Management and Tab Order
- Color Contrast and Readability
- Skip Navigation Links
- Accessible Forms (Labels, Fieldset, Errors)

**Example:**
```html
<img src="chart.png" alt="Bar chart showing Q1 sales data" />
<nav aria-label="Main navigation">...</nav>
<a href="#main-content" class="skip-link">Skip to main content</a>
```

**Exercise:** Audit a 3-page site for accessibility issues and fix missing alt text and label associations.
**Quiz:**
1. What does `alt` stand for on images?
2. What is ARIA?
3. Why is color contrast important?
4. What is a skip navigation link?
5. What do `aria-label` and `aria-labelledby` do?

---

---

## 7. HTML5 Features

### Overview
Explore modern HTML5 features for rich web applications.

### Chapter 18: HTML5 APIs and Elements
- `<canvas>` for Drawing Graphics
- `<datalist>` for Autocomplete Inputs
- `<details>` and `<summary>` for Disclosure Widgets
- `<dialog>` for Modal/Popup Dialogs
- Drag and Drop API
- Local Storage with JavaScript Integration
- Geolocation API
- Web Workers (Basic)

**Example:**
```html
<canvas id="myCanvas" width="400" height="200"></canvas>
<details>
  <summary>Click for more info</summary>
  <p>Hidden content revealed.</p>
</details>
<input list="browsers" />
<datalist id="browsers">
  <option value="Chrome">
  <option value="Firefox">
</datalist>
```

**Exercise:** Create a page with a canvas element (draw a rectangle) and a `<details>`/`<summary>` disclosure widget.
**Quiz:**
1. Which element is used for vector drawing?
2. What tags create a collapsible section?
3. Which element provides built-in autocomplete suggestions?
4. What is the `<dialog>` element used for?
5. Name one HTML5 API that requires JavaScript integration.

---

---

## Cross-Language Exercises

### Project 1: Personal Portfolio Page
Build a single-page portfolio with: headings, paragraphs, an image, a navigation bar of links, an HTML table of your skills, and a contact form.

### Project 2: Recipe Webpage
Create a recipe page with: an image, an ordered list of ingredients, an unordered list of steps, a details/summary section for nutrition info, and a form for user ratings.

### Project 3: Product Landing Page
Build a landing page for a product with: a header, hero section with image and call-to-action button, a features table, an embedded YouTube video, and a signup form.

---

## Progress Tracking
- Each chapter ends with a summary and key takeaways
- Exercises are rated Easy / Medium / Hard
- Each chapter has a 5-question quiz for self-assessment
- Completion badges for each section

---

## Additional Resources
- W3Schools HTML Tutorial (w3schools.com/html)
- MDN Web Docs (developer.mozilla.org)
- HTML5 Doctor (html5doctor.com)
- Accessible HTML Guide (a11yproject.com)
'''