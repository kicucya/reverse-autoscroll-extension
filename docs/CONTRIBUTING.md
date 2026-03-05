# Contributing

Thanks for contributing.

## Workflow
1. Fork the repository
2. Create a feature branch
3. Keep changes focused and small
4. Open a pull request with:
   - Problem statement
   - Change summary
   - Test notes (which pages and how you verified behavior)

## Code Style
- Keep the content script dependency-free
- Avoid adding permissions unless required
- Keep autoscroll behavior stable across refresh rates

## Manual Test Checklist
- Middle click release toggles autoscroll
- Native autoscroll UI is suppressed
- Indicator appears at click point and does not block events
- Reverse direction works for both X and Y axes
- Deadzone prevents jitter near center
- Exits on any click, `Esc`, and window blur
- Works on `http`/`https` pages and not on restricted pages
