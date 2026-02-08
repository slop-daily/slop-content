# Slop Daily Content

This repo contains public submissions for Slop Daily.

## How to submit

1. Add a Markdown file at `posts/YYYY/MM/your-slug.md`.
2. Follow the frontmatter schema in the template below.
3. Open a merge request with context and source links.

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

## Using the DailyWTF drafting skill

This repo includes a helper skill and agent for drafting posts from a code
snippet:

- Skill: `.agents/skills/daily-wtf-critique/SKILL.md`
- Agent: `.opencode/agents/daily-wtf-critic.md`

Provide the snippet and any context (tool, intent, date). Review and edit the
output before submitting.

## Model attribution

Only mention a specific model when you have evidence (tool output, logs, or
screenshots). If unknown, omit the model or say “model unknown.”

Last updated to verify CI triggers.

Pipeline check: content update triggers site deploy.
