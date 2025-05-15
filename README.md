# fssg - Fast, Simple Static Site Generator

fssg is a lightweight and fast static site generator written in POSIX-compliant shell script.
It converts Markdown files to HTML, applies a template, processes includes and conditionals in HTML files, hoists `<style>` and `<script>` blocks,
copies static assets, and produces a `dist` directory with the generated site. It's designed to be simple, fast, and easy to use for generating static websites.

## Features

- The script is fully POSIX-compliant, ensuring portability across Unix-like systems.
- No external Markdown parser is required, reducing dependencies.
- Converts `.md` files to HTML with a custom Markdown parser supporting headers, links, bold, italic, strikethrough, tables, and horizontal rules.
- Applies an HTML template (`src/template.html`) to generated content, supporting `{{content}}` and `{{title}}` placeholders.
- Processes include directives: `{{include: file.html}}` for direct inclusion and `{{include-block: file.html}}...{{endinclude}}` for parameterized templates.
- Hoists `<style>` blocks to `<head>` and `<script>` blocks to the end of `<body>`, deduplicating them.
- Supports conditional directives: `{{IF_PAGE: file.html}}`, `{{ELIF_PAGE: file.html}}`, `{{ELSE_PAGE}}`, `{{ENDIF_PAGE}}`, and `{{IF_EXT: ext}}`, `{{ELIF_EXT: ext}}`, `{{ELSE_EXT}}`, `{{ENDIF_EXT}}`.
- Copies static files from `src/static/` to `dist/static/`.
- Handles `{{title: Custom Title}}` directives in source files to override default titles from filenames.

## Installation

1. **Clone the repository or download the script**:

   - Save `fssg` in your project directory.

2. **Dependencies**:
   - Requires a POSIX-compliant shell (e.g., `sh`, `bash`).
   - Commands like `awk`, `sed`, `find`, and `cp` (standard in POSIX systems).

## Usage

To build your site, run:

```sh
./fssg
```

For help:

```sh
./fssg -h
```

For example, to shut the script up and run with 50 parallel jobs:

```sh
./fssg -q -j 50
```

### Options

- `-h, --help`: Display the help message.
- `-q, --quiet`: Suppress all output except errors.
- `-v, --verbose`: Show detailed build information.
- `-j, --jobs`: Specify the number of parallel jobs (default: 4).

### Environment Variables

- `NO_COLOR`: Disable colored output (set to any value, e.g., `export NO_COLOR=1`).
- `QUIET`: Suppress all output except errors (set to `1` to enable).
- `VERBOSE`: Show detailed build information (set to `1` to enable).
- `MAX_JOBS`: Set the number of parallel jobs (default: 4).

## How It Works

1. **Input Structure**:

   - Place Markdown (`.md`) or HTML (`.html`) files in `src/` (e.g., `src/index.md`).
   - Use `src/template.html` for the HTML template (not copied to output, but used as a base for each page).
   - Place reusable HTML snippets in `src/includes/`.
   - Store static assets (e.g., CSS, images, fonts) in `src/static/`.

2. **Building the Site**:

   - Markdown files are parsed into HTML using a custom AWK script.
   - HTML files are processed directly without the markdown parser.
   - The script applies the template, processes includes, conditionals, and hoists `<style>` and `<script>` blocks.
   - Output is generated in the `dist/` directory, created fresh each build.
   - Static assets are copied to `dist/static/`.

3. **Processing Steps**:

   - **Markdown Parsing**: Converts `.md` files to HTML, supporting headers (`#`), links (`[text](url)`), bold (`**text**`), italic (`*text*`), strikethrough (`~~text~~`), tables (`|...|`), and more.
   - **Title Handling**: Uses `{{title: Custom Title}}` or generates a title from the filename.
   - **Conditionals**: Supports `IF_PAGE`, `ELIF_PAGE`, `ELSE_PAGE`, `ENDIF_PAGE` for page-specific content, and `IF_EXT`, `ELIF_EXT`, `ELSE_EXT`, `ENDIF_EXT` for extension-specific content.
   - **Includes**: Handles `{{include: file.html}}` and `{{include-block: file.html param="value"}}...{{endinclude}}`.
   - **Style/Script Hoisting**: Moves `<style>` to `<head>` and `<script>` to the end of `<body>`, removing duplicates.
   - **Static Assets**: Copies `src/static/` to `dist/static/`.

## Example

Here is a simple example to get started with fssg:

**src/index.md**:

```markdown
{{title: Home Page}}

# Welcome

This is my **very cool** site.
```

**src/template.html**:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>{{title}}</title>
  </head>
  <body>
    {{content}}
  </body>
</html>
```

**Run**:

```sh
./fssg
```

**Output** (`dist/index.html`):

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Home Page</title>
  </head>
  <body>
    <h1>Welcome</h1>
    <p>This is my <strong>very cool</strong> site.</p>
  </body>
</html>
```