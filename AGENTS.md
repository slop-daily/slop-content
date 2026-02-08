# Agent Guidelines for slop-content

This repo is content-only. There is no application code in this workspace.
Use these notes to keep submissions consistent and safe.

## Quick context

- Repo purpose: public markdown submissions for Slop Daily.
- Primary changes: add or edit markdown posts under `posts/YYYY/MM/`.
- CI: GitLab pipeline triggers a downstream site deploy when content changes.

## Build / lint / test commands

There are no local build, lint, or test commands defined in this repo.

- No `package.json`, `pyproject.toml`, `Makefile`, or test runner config.
- `.gitlab-ci.yml` only triggers the site pipeline; it does not run tests here.

### Single test execution

Not applicable. There is no test framework in this repository.

If you believe tests exist, confirm first by locating a config file and update
this document with verified commands.

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
