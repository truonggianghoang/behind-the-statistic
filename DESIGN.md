# Design Brief

## Direction

Behind the Statistic — a warm editorial public-awareness site that turns abstract issues into human, dignified stories.

## Tone

Refined editorial warmth: serious and trustworthy, never clinical or institutional — sophisticated typography on a soft cream page so heavy topics feel held, not shouted.

## Differentiation

The "human ledger" signature — large Fraunces display numerals and quiet hairline rules that reframe every statistic as a person, paired with a plum empathy accent that appears only on moments of connection.

## Color Palette

| Token      | OKLCH          | Role                                    |
| ---------- | -------------- | --------------------------------------- |
| background | 0.975 0.012 85 | Warm cream page base                    |
| foreground | 0.235 0.028 65 | Warm near-black body text               |
| card       | 0.995 0.006 85 | Raised content surfaces                 |
| primary    | 0.42 0.075 190 | Deep teal — trust, CTAs, nav            |
| accent     | 0.5 0.115 345  | Warm plum — empathy, highlights, focus  |
| muted      | 0.945 0.018 85 | Section alternation, quiet panels       |

## Typography

- Display: Fraunces — hero, section headings, pull quotes, large numerals
- Body: Figtree — paragraphs, UI labels, navigation, buttons
- Mono: Geist Mono — citations, sources, small metadata
- Scale: hero `text-5xl md:text-7xl font-bold tracking-tight`, h2 `text-3xl md:text-5xl font-bold tracking-tight`, label `text-sm font-semibold tracking-widest uppercase`, body `text-base md:text-lg leading-relaxed`

## Elevation & Depth

Cream base with crisp white cards lifted by two warm-tinted shadow tiers (`shadow-subtle`, `shadow-elevated`); depth comes from layered surfaces and hairline rules, never heavy drop shadows.

## Structural Zones

| Zone    | Background        | Border     | Notes                                          |
| ------- | ----------------- | ---------- | ---------------------------------------------- |
| Header  | `bg-card/90` blur | `border-b` | Sticky, translucent, subtle on scroll          |
| Content | `bg-background`   | —          | Alternate `bg-muted/40` and `grain` sections   |
| Footer  | `bg-muted/50`     | `border-t` | Crisis-support note + disclaimer, warm muted   |

## Spacing & Rhythm

Generous vertical rhythm: sections `py-20 md:py-28`, content max-width `max-w-6xl`, group gaps `gap-6 md:gap-8`, micro-spacing in multiples of 4px.

## Component Patterns

- Buttons: pill (`rounded-full`), teal primary / plum accent / outline secondary, `hover:-translate-y-0.5` + shadow lift
- Cards: `rounded-2xl`, `bg-card`, hairline border, `shadow-subtle` → `shadow-elevated` on hover
- Badges: pill, `bg-accent/10 text-accent` for category tags, uppercase tracking-wide

## Motion

- Entrance: `fade-up` 0.6s ease-out, staggered 80ms, triggered once on scroll
- Hover: 0.3s `--transition-smooth` lift on cards/buttons, underline slide on links
- Decorative: slow `float` on hero orb only; all motion disabled under reduced-motion

## Constraints

- AA+ contrast everywhere; body text ≥ 4.5:1, large display ≥ 3:1
- Only teal + plum as accents — no third hue, no gradients on body text
- No pop-ups, no autoplay, no distracting effects; motion is subtle and optional
- Never invent statistics, studies, or sources; citations stay visually discreet

## Signature Detail

The "human ledger" numeral treatment — oversized Fraunces figures set against a thin teal rule with a plum underline, turning data points into a quiet, humanizing typographic moment.
