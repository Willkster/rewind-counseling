# REWind Counseling

Static site for REWind Counseling, Kailua HI. Plain HTML, CSS and vanilla JS.
No build step, no dependencies, hosted on GitHub Pages.

**Status: preview build.** This is checkpoint 1, the homepage only, for design
review. It is `noindex` and the domain still points at the live Squarespace site.

## Local

Open `index.html` in a browser. That is the whole workflow.

## Structure

```
index.html          homepage
assets/css/site.css shared tokens and components
assets/js/site.js   scroll reveal, mobile nav, cursor spotlight
assets/img/         logo, mark, brand pattern tile, headshots
robots.txt          disallow all while previewing
```

## Brand

Sampled off the logo, not guessed.

- Navy `#001939`
- Teal `#348C91`, with `#1F6B70` when teal needs to pass contrast as text
- Sand `#F7F4EF`
- Fraunces for headings, Inter for body

`assets/img/pattern.png` is a generated 300px brick tile carrying the logo mark
at quarter positions, used at very low opacity behind sections.

## Booking

All Book buttons point at the practice's existing SimplePractice client portal.
It is a plain outbound link, no backend involved. The URL appears in several
places in `index.html`; search for `clientsecure.me` to change it.

## Motion

Tuned for a clinical audience: reveal once, gentle stagger, slow hero settle.
Nothing loops or bounces.

- `prefers-reduced-motion: reduce` skips all JS effects and shows everything
- With JS disabled the page renders complete and static
- The cursor spotlight is gated on `(hover: hover)` so phones never get it

## Not done yet

Checkpoint 2 adds the other pages (services, meet the team, about, contact,
appointments), JSON-LD schema, sitemap and per page meta descriptions.
Checkpoint 3 is the domain cutover, documented separately in `CUTOVER.md` when
we get there.

## Open questions for the practice

See `../Website Assets/harvested-copy/facts-and-copy.md`. The short list:
insurance accepted, office hours, whether the Squarespace service prices are
real, and real photos of the Kailua office.
