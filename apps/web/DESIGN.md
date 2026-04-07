# The Design System: Editorial Minimalism

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Silent Architect."** 

In an era of noisy interfaces, this system succeeds through restraint and intentionality. It moves beyond the "generic SaaS" look by treating the chat interface as a high-end editorial publication. We replace rigid, claustrophobic grid lines with **Atmospheric Space** and **Tonal Depth**. The goal is a "disappearing UI"—where the interface recedes, and the conversation becomes the focal point. We achieve a premium feel not through decoration, but through the obsessive calibration of white space, subtle surface nesting, and high-contrast typography.

---

## 2. Colors & Surface Philosophy
The palette is a sophisticated monochrome range designed to mimic the tactile quality of premium stationery and architectural materials.

### The "No-Line" Rule
**Explicit Instruction:** Traditional 1px solid borders are prohibited for sectioning. We do not "box in" our users. Boundaries must be defined exclusively through background color shifts or tonal transitions.
*   *Example:* A chat sidebar (`surface-container-low`) should sit against the main chat window (`surface`) without a vertical line. The change in hex value is the boundary.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the `surface-container` tiers to create "nested" depth:
*   **Base Layer:** `surface` (#f9f9f9) - The canvas.
*   **Secondary Regions:** `surface-container-low` (#f2f4f4) - Used for sidebars or inactive utility panels.
*   **Active Elements:** `surface-container-lowest` (#ffffff) - Used for cards or the message input area to create a soft, natural lift.
*   **Emphasis Zones:** `surface-container-high` (#e4e9ea) - Used for hovering states or "pinned" content.

### Glassmorphism & Signature Textures
While the system avoids loud gradients, we use **Optical Polish**:
*   **Floating Headers:** Use `surface` at 80% opacity with a `backdrop-blur: 12px`. This prevents the "hard cut" look when scrolling messages.
*   **Interactive Softness:** For main CTAs, use a nearly imperceptible vertical gradient from `primary` (#5f5e61) to `primary_dim` (#535255) to provide a "milled metal" feel rather than flat plastic.

---

## 3. Typography
We use **Inter** as a structural tool. The hierarchy is extreme: oversized displays for headers and tiny, high-tracking labels for metadata.

*   **Display (lg/md):** Reserved for empty states or onboarding. It should feel authoritative.
*   **Headline (sm):** Used for Channel names or Contact headers.
*   **Title (sm):** Used for the name of the sender in the chat thread. Bold weight to anchor the message.
*   **Body (md):** The primary reading experience. Line height should be generous (1.5–1.6) to ensure readability during long-form exchanges.
*   **Label (sm):** Used for timestamps and status indicators. Set to `on_surface_variant` (#5a6061) to recede visually.

---

## 4. Elevation & Depth
In this design system, elevation is a product of **Tonal Layering**, not shadows.

*   **The Layering Principle:** To lift a message bubble, place a `surface-container-lowest` (#ffffff) bubble on a `surface` (#f9f9f9) background. The 2-unit hex shift is enough for the human eye to perceive depth.
*   **Ambient Shadows:** Use only for high-level overlays (modals/popovers). Shadows must be "Ambient": `box-shadow: 0 10px 30px -10px rgba(45, 52, 53, 0.08)`. Never use pure black shadows; always tint them with `on_surface`.
*   **The "Ghost Border" Fallback:** If accessibility requires a border (e.g., in high-contrast modes), use `outline_variant` at 15% opacity. It should be felt, not seen.

---

## 5. Components

### Buttons
*   **Primary:** `primary` background, `on_primary` text. No border. `lg` (0.5rem) roundedness.
*   **Secondary:** `surface-container-high` background. Feels like a part of the UI, not an addition.
*   **Ghost:** No background. `on_surface` text. Used for secondary actions like "Attach File."

### Input Fields
*   **Style:** Minimalist. No border. Use `surface-container-lowest` as the background.
*   **Focus State:** Do not use a glow. Change the background to `surface-container-high` or use a 1px `primary` bottom-border only.

### Message Bubbles (Cards)
*   **Incoming:** `surface-container-highest` background. No border.
*   **Outgoing:** `primary` background. `on_primary` text.
*   **Spacing:** Use `spacing.4` (1rem) between different speakers and `spacing.1` (0.25rem) between consecutive messages from the same speaker.

### Avatars
*   **Shape:** `lg` (0.5rem) roundedness to match the system's geometry.
*   **Ring:** Use a 2px "offset" ring using the background color of the container it sits in to create a "cut-out" look.

---

## 6. Do’s and Don’ts

### Do
*   **Use Asymmetric Margins:** Give the chat thread more breathing room on the left than the right to create an editorial flow.
*   **Embrace Whitespace:** Use `spacing.10` or `spacing.12` between major layout blocks. 
*   **Subtle Animation:** Use "Spring" transitions (stiffness: 300, damping: 30) for message entries to mimic organic movement.

### Don’t
*   **Don't use Dividers:** Never use `<hr>` or border-bottom to separate messages. Use `spacing.4` (1rem) of white space instead.
*   **Don't use Pure Black:** Use `on_background` (#2d3435) for text. Pure #000000 is too harsh for an editorial experience.
*   **Don't Over-round:** Stick to the `lg` (0.5rem) scale. Avoid fully circular buttons unless they are standalone floating action buttons.