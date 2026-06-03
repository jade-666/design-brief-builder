#!/usr/bin/env node

"use strict";

const fs = require("fs");
const os = require("os");
const path = require("path");
const readline = require("readline");

const SKILL_NAME = "design-brief-builder";
const SOURCE_DIR = path.join(__dirname, "..", SKILL_NAME);

// Each target maps a user-facing label to the skills directory it installs into.
const TARGETS = {
  "claude-global": {
    label: "Claude Code (global, all projects)",
    dir: path.join(os.homedir(), ".claude", "skills"),
  },
  "claude-project": {
    label: "Claude Code (current project)",
    dir: path.join(process.cwd(), ".claude", "skills"),
  },
  cursor: {
    label: "Cursor",
    dir: path.join(os.homedir(), ".cursor", "skills"),
  },
  codex: {
    label: "Codex",
    dir: path.join(os.homedir(), ".agents", "skills"),
  },
};

// Accept aliases so `npx design-brief-builder cursor` works without prompts.
const ALIASES = {
  claude: "claude-global",
  "claude-code": "claude-global",
  global: "claude-global",
  project: "claude-project",
  cursor: "cursor",
  codex: "codex",
};

function fail(message) {
  console.error(`\n✗ ${message}\n`);
  process.exit(1);
}

function install(targetKey) {
  const target = TARGETS[targetKey];
  if (!fs.existsSync(SOURCE_DIR)) {
    fail(`Skill source directory not found: ${SOURCE_DIR}`);
  }

  const destination = path.join(target.dir, SKILL_NAME);
  fs.mkdirSync(target.dir, { recursive: true });
  fs.cpSync(SOURCE_DIR, destination, { recursive: true });

  console.log(`\n✓ Installed to ${destination}`);
  console.log(`\nStart a new session and call /${SKILL_NAME} to use it.\n`);
}

function chooseInteractively() {
  const keys = Object.keys(TARGETS);
  console.log("\nDesign Brief Builder — choose an install target:\n");
  keys.forEach((key, index) => {
    console.log(`  ${index + 1}) ${TARGETS[key].label}`);
  });

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("\nEnter a number (1-" + keys.length + "): ", (answer) => {
    rl.close();
    const index = parseInt(answer.trim(), 10) - 1;
    if (Number.isNaN(index) || index < 0 || index >= keys.length) {
      fail("Invalid selection.");
    }
    install(keys[index]);
  });
}

function main() {
  const arg = process.argv[2];

  if (arg === "-h" || arg === "--help") {
    console.log(`
Usage:
  npx ${SKILL_NAME}                Run interactively and choose an install target
  npx ${SKILL_NAME} claude         Install to Claude Code (global)
  npx ${SKILL_NAME} project        Install to the current project's .claude/skills
  npx ${SKILL_NAME} cursor         Install to Cursor
  npx ${SKILL_NAME} codex          Install to Codex
`);
    return;
  }

  if (arg) {
    const targetKey = ALIASES[arg.toLowerCase()];
    if (!targetKey) {
      fail(`Unknown target "${arg}". Options: claude / project / cursor / codex (or run with no argument to choose interactively).`);
    }
    install(targetKey);
    return;
  }

  if (!process.stdin.isTTY) {
    fail("In a non-interactive environment, specify a target, e.g. npx " + SKILL_NAME + " cursor");
  }

  chooseInteractively();
}

main();
