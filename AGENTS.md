# Agent Guidelines for slop-content

This repo is content-only. There is no application code in this workspace.
Use these notes to keep submissions consistent and safe.

## Quick context

- Repo purpose: public markdown submissions for Slop Daily.
- Primary changes: add or edit markdown posts under `posts/YYYY/MM/`.
- CI: GitLab pipeline triggers a downstream site deploy when content changes.

## Build / lint / test commands

### Frontmatter validation

Validate all post frontmatter with:

```bash
bun run validate
```

This checks:
- Required fields: title, date, tags, author, excerpt, tool
- Date format (YYYY-MM-DD)
- Excerpt length (max 300 characters)
- Tags is a non-empty array
- YAML syntax validity

Run with bun (available via nix-shell):
```bash
nix-shell -p bun --run "bun run validate"
```

### Single test execution

Not applicable. This is a content-only repository without a test framework.

## Required post format

Posts are Markdown files stored at `posts/YYYY/MM/slug.md`.

### Required frontmatter fields

- `title`
- `date` (YYYY-MM-DD)
- `tags` (list with at least one tag)
- `author`
- `excerpt`
- `tool`

### Optional frontmatter fields

- `featured` (true/false)
- `codeLanguage`
- `canonical`
- `originalSource`

### Frontmatter template

```
---
title: "Your Title"
date: 2026-02-08
tags:
  - CodeSlop
author: "Handle or Name"
excerpt: "Short summary of what went wrong."
tool: "Tool name (e.g., Cursor, Copilot, Claude)"
featured: false
---
```

## Content style and formatting

General
- Use Markdown.
- Keep the tone factual and concise.
- Provide enough context to understand the failure.
- Keep excerpts under 300 characters.
- Remove or redact any sensitive data from snippets.

Spacing and layout
- Use a blank line after frontmatter.
- Prefer short paragraphs over long blocks.
- Use fenced code blocks for snippets; add a language when known.
- Avoid trailing whitespace.

Code snippets
- Keep snippets minimal and relevant.
- Never include secrets or private tokens.
- If a snippet includes identifiers, keep them consistent with the text.
- Use `codeLanguage` in frontmatter when a code block is central to the post.

## Naming conventions

Files and paths
- File location must match the date: `posts/YYYY/MM/slug.md`.
- `slug` should be lowercase with hyphens.
- Keep slug short and descriptive.

Frontmatter values
- `title` in Title Case is preferred.
- `tags` should be concise and consistent; avoid duplicates.
- `author` should match the public handle or name used elsewhere.

## Imports, types, and error handling

This repo does not contain source code with imports or types. For markdown
content, apply the following equivalents:

- Imports: not applicable.
- Types: not applicable.
- Error handling: describe the failure clearly and list the outcome.

If you add code examples inside posts, keep them minimal and accurate, and
avoid speculative fixes. The post should describe what happened, not attempt
to refactor the codebase.

## Safety and privacy

- Never add secrets, API keys, or private URLs.
- Remove emails, internal hostnames, tokens, and access codes.
- When quoting logs, redact sensitive values and user data.

## Git and CI notes

- This repo’s `.gitlab-ci.yml` triggers a pipeline in another project.
- Do not modify CI unless explicitly requested.
- Content changes are enough to trigger the deploy pipeline.

## Skill and agent usage

This repo includes a skill and an OpenCode agent for drafting posts:

- Skill: `.agents/skills/daily-wtf-critique/SKILL.md`
- Agent: `.opencode/agents/daily-wtf-critic.md`

Recommended flow:

1) Provide a code snippet and any context you have (tool, intent, date).
2) Ask the `daily-wtf-critic` agent to draft a post using the
   `daily-wtf-critique` skill.
3) Review the output for accuracy, redactions, and frontmatter correctness.
4) Save the file under `posts/YYYY/MM/slug.md`.

Keep the excerpt under 300 characters and include a language tag on the
code fence when known.

Global OpenCode setup

- Skills can be loaded globally via `skills.paths` in
  `~/.config/opencode/opencode.json`.
- Example:

```
"skills": {
  "paths": [
    "/absolute/path/to/slop-content/.agents/skills"
  ]
}
```

- The config schema does not include a global agent path.
- To use the agent anywhere, copy or symlink
  `.opencode/agents/daily-wtf-critic.md` into each repo’s
  `.opencode/agents/` directory.

## Model attribution (infer carefully)

If you can reliably identify the model used to generate the code, mention it
in the post body. Acceptable evidence includes:

- The tool explicitly reporting the model name/version.
- Logs, metadata, or screenshots provided with the submission.
- Repro steps that show the model selection.

If the model is unclear, do not guess. Use phrasing like “model unknown” or
omit model attribution entirely. Keep `tool` in frontmatter as the tool name
only (e.g., Copilot, Cursor, Claude), and reserve model details for the body.

## Cursor and Copilot rules

No Cursor rules found in `.cursor/rules/` or `.cursorrules`.
No Copilot instructions found in `.github/copilot-instructions.md`.

If any of these files are added later, update this document to include them.

## Common tasks checklist

- Add a new post under the correct date folder.
- Validate required frontmatter is present.
- Ensure excerpt is under 300 characters.
- Confirm no sensitive data appears in text or snippets.
- Keep tags consistent and minimal.

## When unsure

- Read `README.md` and `CONTRIBUTING.md` first.
- Follow existing posts in the same month for formatting clues.
- Prefer safe defaults: concise text, minimal snippets, no private data.
