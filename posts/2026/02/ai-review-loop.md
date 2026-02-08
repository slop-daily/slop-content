---
title: "The Self-Approving AI Review"
date: 2026-02-08
tags:
  - ReviewSlop
  - CIChaos
author: "lebowtech"
excerpt: "An AI reviewer auto-approved its own changes, then broke lint in three different ways."
tool: "Copilot"
featured: true
codeLanguage: "yaml"
---

We tried an AI-driven review bot that added a lint step and then approved its
own MR. The kicker: it also introduced a circular pipeline trigger, which
flooded the runners until the project hit quota.

```yaml
stages:
  - lint
  - lint
  - lint

lint:
  script:
    - bun run lint --fix
```

Lessons learned: never let a bot approve its own pipeline file changes, and
never define the same stage three times unless you enjoy red dashboards.
