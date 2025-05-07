# fssg - Fast, Simple Static Site Generator

## Description
fssg is a lightweight and fast static site generator written in POSIX-compliant shell script.
It converts Markdown files to HTML, applies a template, processes includes in HTML files, and copies static assets to a dist directory.
It's designed to be simple, fast, and easy to use for generating static websites.

## Features
- Converts `.md` files to HTML using the `markdown` command.
- Applies a template to generated HTML content.
- Processes include directives in HTML files (e.g., `<!-- INCLUDE: file.html -->`).
- Copies static files from `src/static/` to the output directory.
- Supports quiet and verbose modes for output control.
- Respects the `NO_COLOR` environment variable for plain text output.

## Installation
1. **Clone the repository or download the script**:
   - Save `fssg` in your project directory.

2. **Dependencies**:
   - Ensure you have the `markdown` command installed (e.g., via `apt install markdown` on Debian-based systems or `brew install markdown` on macOS).
   - Bash or a POSIX-compliant shell (most systems have this by default).

## Usage
To build your site, run the script from the command line:

```
./fssg [options]
```

For help, use:
```
./fssg -h
```

### Options
- `-h, --help`: Display this help message.
- `-q, --quiet`: Suppress all output except errors.
- `-v, --verbose`: Show detailed build information.

### Environment Variables
- `NO_COLOR`: Disable colored output. Set this to any value (e.g., `export NO_COLOR=1`) for plain text output, which is useful when piping output to other commands or in non-terminal environments.

## How It Works
1. **Input Structure**:
   - Place your Markdown files in the `src/` directory (e.g., `src/index.md`).
   - Use `src/template.html` for the HTML template (not copied to the output).
   - Use `src/includes/` for reusable HTML snippets.
   - Static assets like images or CSS should go in `src/static/`.

2. **Building the Site**:
   - The script processes `.md` files in `src/`, converts them to HTML, and applies the template if available.
   - It handles includes in `.html` files.
   - Output is generated in the `dist/` directory, which is created fresh each time.

3. **Example Workflow**:
   - Write content in `src/`.
   - Run `./fssg`.
   - Your built site will be in `dist/`, ready to serve.

## License
This project is licensed under the MIT License.

Copyright (c) xlc-dev 2025

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.