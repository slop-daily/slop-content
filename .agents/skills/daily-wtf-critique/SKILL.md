---
name: daily-wtf-critique
description: Write a Daily WTF-style article critiquing bad AI-generated code from a given snippet.
compatibility: opencode
metadata:
  audience: readers
  output: markdown
---
## What I do
- Turn a code snippet into a short Daily WTF-style writeup that explains what went wrong and why it is risky or absurd.
- Use dry, snarky humor to mock the AI-generated code and the broader vibe-coding evangelism around it.
- Produce a ready-to-publish Markdown article with frontmatter and a minimal snippet.

## Inputs I expect
- A code snippet (required).
- Optional context: language, intended behavior, tool used, author handle, and date.

## Repo access check
- Target repo: https://gitlab.com/slop-daily/slop-content
- If you do not have push access, fork the repo and open an MR from the fork.

## Output format
- Markdown with valid frontmatter.
- Frontmatter fields: title, date, tags, author, excerpt, tool, featured (optional), codeLanguage (optional).
- Keep excerpt under 300 characters.
- Use a fenced code block with a language when known.

## Style guidance
- Use short paragraphs.
- State the failure plainly, then explain the consequence.
- Add one to three concise "WTF" observations, each tied to a specific line or pattern.
- Include a brief jab at vibe-coding evangelism, not at any individual.
- End with a brief lesson learned.

## Safety and quality
- Never include secrets, tokens, emails, or private URLs.
- Redact or generalize any sensitive data.
- Mock the code and the hype, not individuals.
- Avoid speculative fixes or refactors; describe what happened.

## If information is missing
- Infer language from the snippet if possible.
- If author or tool is unknown, use "unknown" and "unspecified" in frontmatter.
- If date is missing, use today’s date.
