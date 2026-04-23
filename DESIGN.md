# Design System Document: The Intellectual Lens

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Curator"**

This design system rejects the "SaaS-in-a-box" aesthetic in favor of a sophisticated, high-end editorial experience. We are not just building a tool; we are building an environment for literacy and growth. The system bridges the gap between traditional academic prestige and cutting-edge AI precision.

To move beyond the generic, we utilize **Asymmetric Balance**. While the typography remains grounded and legible, layout elements should feel "curated"—utilizing expansive negative space, overlapping glass layers, and a hierarchy driven by tonal shifts rather than rigid lines. We treat the interface like a premium digital publication: breathable, authoritative, and calm.

---

## 2. Colors & Surface Philosophy
The palette is rooted in 'Trustworthy Blues' and 'Academic Teals' to establish a sense of expert-led innovation.

### The "No-Line" Rule
**Explicit Instruction:** Traditional 1px solid borders for sectioning are strictly prohibited. 
Boundaries must be defined through:
1.  **Background Color Shifts:** Use `surface-container-low` sections sitting atop a `surface` background.
2.  **Tonal Transitions:** Define areas through soft changes in depth, never with hard outlines.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of fine vellum paper. 
- **Base Layer:** `surface` (#f8f9fa).
- **Secondary Sectioning:** `surface-container-low` (#f3f4f5).
- **Interactive Containers:** `surface-container-lowest` (#ffffff) to provide a subtle "pop" against the background.
- **Emphasis Areas:** `surface-container-high` (#e7e8e9) for sidebars or utility panels.

### The "Glass & Gradient" Rule
To evoke a "Tech-Forward" feel, use **Glassmorphism** for floating elements (like analysis overlays). Apply `surface-container-lowest` at 70% opacity with a `24px` backdrop blur. 
- **Signature Texture:** For primary CTAs and Hero sections, utilize a linear gradient from `primary` (#004e59) to `primary-container` (#176774) at a 135-degree angle. This adds "soul" and depth that flat hex codes cannot provide.

---

## 3. Typography: The Literary/Tech Synthesis
We employ a "Bi-Scriptual" approach to typography to balance the educational heritage with modern AI utility.

- **The Voice (Display & Headline): Newsreader.** This serif evokes the feeling of a classic novel or a prestigious journal. It should be used for large titles to ground the brand in "literary" roots. Use `display-lg` for hero statements and `headline-md` for section starters.
- **The Engine (UI & Body): Manrope.** A highly legible, tech-forward sans-serif. Manrope provides the "clean and professional" feel required for data density. Use `body-lg` for reading passages and `label-md` for AI-generated metadata.

**Hierarchy Strategy:** 
- Headlines use a tighter letter-spacing (-0.02em) to feel authoritative.
- Body text uses a generous line-height (1.6) to ensure the "Reading Fluency" experience is stress-free and accessible.

---

## 4. Elevation & Depth
In this system, depth is a functional tool, not a stylistic flourish.

- **The Layering Principle:** Stacking surface tiers creates a soft, natural lift. Place a `surface-container-lowest` card on a `surface-container-low` section to create separation without needing a single pixel of stroke.
- **Ambient Shadows:** For elevated elements (modals/dropdowns), use "Long-Tail Shadows."
    - *Blur:* 32px to 64px.
    - *Opacity:* 4% - 6%.
    - *Color:* Use a tinted version of `on-surface` (#191c1d) to mimic natural light refraction.
- **The "Ghost Border" Fallback:** If a border is essential for accessibility, use `outline-variant` (#bec8cb) at 20% opacity. 100% opaque borders are forbidden.

---

## 5. Components & Interface Elements

### Buttons
- **Primary:** Gradient-filled (`primary` to `primary-container`). Roundedness: `full`. Use for the main "Start Reading" or "Analyze" actions.
- **Secondary:** Transparent background with a `Ghost Border` and `primary` text.
- **Tertiary:** No background, `primary` text. High-contrast hover state using `surface-container-highest`.

### Accuracy Feedback Visualization (Signature Component)
Reading fluency requires immediate, high-contrast feedback:
- **Correct:** `tertiary` (#0c5037) text with a `tertiary-fixed` (#b1f0ce) subtle highlight.
- **Hesitation:** `secondary` (#2b4cda) text with a `secondary-fixed` highlight.
- **Error:** `error` (#ba1a1a) text with a `error-container` (#ffdad6) highlight.
*Note: Highlights should use the `sm` (0.25rem) roundedness for a "marker-stroke" feel.*

### Cards & Lists
- **Rule:** Forbid the use of divider lines.
- **Implementation:** Separate list items using `12px` of vertical white space. Use `surface-container-low` background on hover to define the interactive area. Use `md` (0.75rem) roundedness for cards to maintain a "soft" minimalist feel.

### Input Fields
- Use `surface-container-highest` for the field background.
- Replace the bottom border with a subtle 2px highlight in `primary` that only appears on `:focus`.
- Labels should always use `label-md` in `on-surface-variant` to stay secondary to the user's input.

---

## 6. Do's and Don'ts

### Do
- **Do** use asymmetrical margins. If the left margin is 80px, try a right margin of 120px for editorial flair.
- **Do** use `display-lg` Newsreader for empty states to make the AI feel "poetic" rather than "broken."
- **Do** rely on `primary-fixed` (#a8eefd) for subtle background tints in AI-processing states.

### Don't
- **Don't** use pure black (#000000) for text. Always use `on-surface` (#191c1d) to maintain the soft-white/gray aesthetic.
- **Don't** use standard `0.5rem` roundedness for everything. Use `full` for buttons and `xl` (1.5rem) for large decorative containers to create visual variety.
- **Don't** use "Drop Shadows" on cards. Use "Tonal Layering" (background shifts) first. Shadows are for floating layers only.