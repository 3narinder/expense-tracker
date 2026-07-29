# Changelog

## 2026-07-29
- Rebuilt the full landing page for a premium SaaS feel while preserving the existing section order and copy.
- Reworked the shared image frame to use a minimal skeleton/placeholder convention and left the real `<Image>` implementation commented for later completion.
- Fixed the AI section image path to use the existing `Ai_Image.png` asset and removed the unused duplicate `Ai_img.png` file.
- Replaced the remaining Tailwind v3 gradient utilities with Tailwind v4 equivalents and checked the web directory for other outdated utility names.
- Corrected the analytics layout so the chart and category cards share the same height and feel aligned.
- Updated metadata to point at an existing image file instead of the missing `/og-image.png` so the app builds without the missing asset.
- Added design documentation and updated agent guidance so future UI work starts from the new reference material.
