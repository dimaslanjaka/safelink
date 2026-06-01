---
description: >-
Automatically generate and execute conventional commits from staged git changes using git-diff output. Supports multiple commits from a single staged diff.
mode: all
---

User does NOT need to provide diff manually.

If no staged changes exist, stop and ask user to stage files first.

## Workflow

### 1. Check staged changes

Run:

```bash
git diff --staged
```

If staged diff is empty:

* stop immediately
* ask user to stage files first

Never create commits without staged changes.

---

## 2. Generate diff artifacts

Run:

```bash
git-diff -s
```

Expected outputs:

* `tmp/git-diff/*.txt`
* `tmp/git-diff/gpt-*.txt`
* `tmp/git-diff/opencode-*.txt`

Prefer:

* `tmp/git-diff/gpt-*.txt`

If multiple files exist:

* use the latest modified file

---

## 3. Load and analyze diff

Analyze:

* changed files
* modules/scopes
* feature additions
* fixes
* refactors
* tests
* tooling changes
* documentation updates

Determine:

* commit type
* commit scope
* whether multiple commits are required

---

## 4. Commit splitting rules

Split into multiple commits when:

* unrelated features exist
* fixes and refactors are mixed
* tests are separate from implementation
* tooling changes are independent
* multiple modules changed independently
* docs changes are unrelated

Prefer:

* logically isolated commits
* independently buildable commits
* clean history

If uncertain:

* prefer a single commit

---

## 5. Conventional Commit Rules

Every commit MUST follow Conventional Commits.

Allowed types:

* feat
* fix
* refactor
* chore
* test
* docs
* perf
* ci

Scope:

* optional but preferred
* use module/folder/package name if clear

Examples:

```text
feat(cli): add recursive cleanup support
fix(proxy): resolve invalid timeout handling
refactor(parser): simplify token normalization
```

---

## 6. Commit Message Requirements

The agent MUST generate commit messages in the following format by default:

```text
<type>(<scope>): <summary>

- concise summary of major changes
- summarize added/refactored/removed behavior
- mention aliases, integrations, tooling, docs, tests, or architecture updates
- include migration or compatibility notes if relevant

BREAKING CHANGE: <required only when API/contracts changed>
```

Preferred style example:

```text
feat(cli): add downloader command with multiple aliases and documentation

- add downloader CLI for downloading files via HTTP/HTTPS streams
- support automatic filename resolution and custom output paths
- add downloader command aliases (download, fetch-file, file-downloader, download-file)
- register downloader binaries in package and build config
- add downloader usage documentation and examples

BREAKING CHANGE: parser hooks renamed <run only any staged file API has changed/refactored>
```

Rules:

* ALWAYS use bullet-list body format for non-trivial commits
* ALWAYS summarize logical changes instead of implementation details
* ALWAYS mention docs/tests/tooling updates when relevant
* ALWAYS mention aliases or exposed commands when added
* ALWAYS mention package/build/config registration changes when applicable
* ALWAYS include BREAKING CHANGE footer when APIs, hooks, contracts, CLI behavior, or exports changed
* NEVER use "Why / Changes / Impact" section headings
* NEVER dump file-by-file descriptions
* NEVER generate empty-body commits except for tiny typo/docs-only changes
* Keep title under 72 characters
* Use imperative mood
* No icons
* UTF-8 encoding
* LF end of line

The body is REQUIRED when:

* multiple files changed
* feature affects behavior
* refactor exists
* tooling/build/config changed
* tests changed
* docs changed
* more than 20 lines changed
* architecture affected

Good examples:

```text
feat(parser): support async token resolvers

- add async parser lifecycle support
- normalize async token resolution flow
- update parser typings and runtime validation
- add integration tests for async parsing
- document async resolver usage and migration notes
```

```text
refactor(api): simplify plugin registration flow

- remove legacy plugin bootstrap logic
- normalize plugin initialization pipeline
- simplify internal registry handling
- update related tests and developer documentation

BREAKING CHANGE: legacy plugin registration hooks removed
```

```text
fix(proxy): resolve invalid timeout handling

- prevent timeout override during retry flow
- normalize timeout fallback behavior
- add regression tests for retry handling
```

---

## 7. Multi-Commit Output Format

If multiple commits are required:

```text
COMMIT 1:
<title>

<body>

COMMIT 2:
<title>

<body>
```

Each commit MUST include:

* title
* body if non-trivial

---

## 8. Execution Phase

### Step A: Stage relevant changes

Use selective staging when splitting commits.

Preferred:

```bash
git add <files>
```

Optional:

```bash
git add -p
```

Only include relevant files per commit.

---

### Step B: Commit

NEVER use:

```bash
git commit -m "<full multiline message>"
```

because many environments truncate multiline content.

#### 1. Create a text file for the commit message.

Example `commit.txt`:

```text
feat(api): redesign parser interface

- simplify plugin integration flow
- refactor parser lifecycle
- rename parser hooks
- simplify initialization behavior
- update migration documentation

BREAKING CHANGE: parser hooks renamed
```

Then commit using:

```bash
git commit -F commit.txt
```

Or:

```bash
git commit --file commit.txt
```

This is the simplest and most cross-platform method for long multiline commits.
