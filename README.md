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

Using it from any project
- Provide a snippet directly, or
- Provide a repo URL/local path plus file path (and line range if possible).

Global OpenCode setup (skills)
- OpenCode supports global skill paths via `skills.paths` in
  `~/.config/opencode/opencode.json`.
- Add the slop-content skill path so it is available in any session:

```
"skills": {
  "paths": [
    "/absolute/path/to/slop-content/.agents/skills"
  ]
}
```

Global OpenCode setup (agent)
- The OpenCode config schema does not include a global agent path.
- To use the agent anywhere, copy or symlink it into each repo’s
  `.opencode/agents/` directory, for example:

```
mkdir -p /path/to/your-project/.opencode/agents
ln -s /absolute/path/to/slop-content/.opencode/agents/daily-wtf-critic.md \
  /path/to/your-project/.opencode/agents/daily-wtf-critic.md
```

Using with Claude (or other tools)
- Use `.agents/skills/daily-wtf-critique/SKILL.md` as the prompt template.
- Provide the snippet and required frontmatter fields; follow the output format.

If you do not have push access, fork `https://gitlab.com/slop-daily/slop-content`
and open a merge request from your fork.

## Model attribution

Only mention a specific model when you have evidence (tool output, logs, or
screenshots). If unknown, omit the model or say “model unknown.”

Last updated to verify CI triggers.

Pipeline check: content update triggers site deploy.
