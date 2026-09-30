# Website (Jekyll)

Personal site: Jekyll 4 (minima base), Bootstrap 5 via CDN, custom CSS/JS. Deployed as the GitHub Pages user site (doitfornoreason.github.io).

## Commands

- Serve locally: `bundle exec jekyll serve` (plain `jekyll serve` fails: Gemfile pins bigdecimal 4.1.2 but global ruby activates 3.3.1).
- Build check: `bundle exec jekyll build`.
- No npm workflow: `package.json` / `package-lock.json` are vestigial (see WORK_LOG audit 2026-08-21).

## Structure

- Pages: `index.md`, `about.md`, `cool-stuff.md`; posts in `_posts/`; project articles in `_projects/`.
- Layouts and includes: `_layouts/`, `_includes/` (head, header, footer, scroll-progress).
- Styles: `assets/css/` - `modern.css` (theme variables + feature styles), `main.css`, `animations.css`, `interactions.css`.
- Scripts: `assets/js/interactions.js` (nav, dark mode, carousel, page features). `assets/js/scroll.js` is orphaned duplicate fade-in logic, unlinked from layouts.

## Conventions

- Theme variables live in `assets/css/modern.css` under `:root` (light) and `html[data-theme="dark"]` (dark): `--primary`, `--secondary`, `--accent`, `--text`, `--text-light`, `--bg`, `--bg-alt`, `--border`, `--card-bg`, `--hero-from`, `--hero-to`, `--header-height`. Never hard-code colors; use the variables so dark mode follows automatically.
- Feature-specific styles go in `assets/css/modern.css`; generic hover/interaction effects in `assets/css/interactions.css`.
- Feature JS goes in `assets/js/interactions.js` as an element-guarded `DOMContentLoaded` block that returns early when the section is absent.
- Dark mode: `data-theme` and `data-bs-theme` on `<html>`, set by the synchronous head script (localStorage key `theme`) and the toggle button in `_includes/header.html`. Always update both attributes together (see interactions.js).
- Home page sections live in `index.md` with a `data-section-name` attribute; keep the order hero -> intro -> features -> gallery.
- Content `.md` files may be rendered to PDF via LaTeX: plain ASCII only, no exotic unicode.

## Verification

- Serve with the command above and exercise the changed page in a real browser (check the browser console for errors), in both light and dark themes.
- Never run `jekyll serve` without `bundle exec`.
