# External AI evaluation pack

Use this pack during the release gate with ChatGPT and Claude. Give each assistant only the public URL, the copied prompt, and one fixture at a time.

Record the provider, model, date, source-access state, output, rubric result, and material failure. Do not store confidential job descriptions in this repository.

## Manual smoke checks

The chatgpt-incognito-skolverket-digital-strategist-2026-08-24 fixture preserves an observed ChatGPT incognito response. It found useful evidence, but its wide Markdown table hid the strength label until the reviewer scrolled horizontally.

For that fixture, verify that the response:

1. Uses the stated public sources only.
2. Starts with an executive summary of at most four bullets.
3. States the fit, strongest matches, main gap, and confidence in that summary.
4. Does not use a Markdown table for evidence-backed matches.
5. Starts each match with the strength label.
6. Keeps the strength label visible without horizontal scrolling at the evaluator's normal browser width.

The chatgpt-incognito-skolverket-digital-strategist-followup-2026-08-24 fixture stores the exact copied prompt and its repeat response. It tests that the self-contained prompt produces an executive summary and strength-first numbered matches without a wide Markdown table.

