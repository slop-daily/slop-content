# Submitting Slop Content

Default submission path is a GitLab merge request. Email patches are supported
as an advanced option for contributors who want a lightweight Git-based flow.

## Default: GitLab merge request

1. Add a Markdown file at `posts/YYYY/MM/your-slug.md`.
2. Follow the frontmatter schema in the template below.
3. Open a merge request with context and source links.

If you do not have push access, fork
`https://gitlab.com/slop-daily/slop-content` and open a merge request from your
fork.

## Email patch submission (advanced)

Send a Git patch email to `submissions@slopdaily.com`.

Requirements
- File path must be `posts/YYYY/MM/your-slug.md`.
- Frontmatter must match the required schema.
- Tags must be a non-empty list.
- `tool` must be set.
- Commit subject must be `Add post: Your Title`.

Steps
1. Clone the repo and create a branch.
2. Add your post and commit it.
3. Send the patch email with `git send-email`.

Example
```bash
git clone https://gitlab.com/slop-daily/slop-content.git
cd slop-content
git checkout -b add-post-your-slug
git add posts/YYYY/MM/your-slug.md
git commit -m "Add post: Your Title"
git send-email --to submissions@slopdaily.com --subject-prefix="[slop-content]" HEAD^..HEAD
```

If `git send-email` is not configured, use the merge request path instead.
For configuration help, run `git help send-email` and set up an SMTP server in
your Git config.

## Frontmatter template

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

## Validation

You can validate frontmatter locally with:

```bash
bun run validate
```

If you do not have bun installed, run:

```bash
nix-shell -p bun --run "bun run validate"
```
