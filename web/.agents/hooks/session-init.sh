#!/bin/bash
# session-init.sh - Loads context at session start (PreInvocation / SessionStart hook)

input=""
if [ ! -t 0 ]; then
  read -t 1 -r input || true
fi

IS_ANTIGRAVITY=0
INVOCATION_NUM=1
if [ -n "$input" ]; then
  INVOCATION_NUM=$(node -e "try{const i=JSON.parse(process.argv[1]);process.stdout.write(String(i.invocationNum??1))}catch{}" -- "$input" 2>/dev/null)
  IS_ANTIGRAVITY=$(node -e "try{const i=JSON.parse(process.argv[1]);process.stdout.write((i.conversationId||i.invocationNum)?'1':'0')}catch{}" -- "$input" 2>/dev/null)
fi

# Only inject session context on the very first invocation in Antigravity
if [ "$IS_ANTIGRAVITY" = "1" ] && [ "${INVOCATION_NUM:-1}" -gt 1 ]; then
  echo "{}"
  exit 0
fi

PROJECT_ROOT=$(git rev-parse --show-toplevel 2>/dev/null || echo ".")
STATE_FILE="$PROJECT_ROOT/.planning/STATE.md"

# Reset delivery-gate bookkeeping for the new session (edit counter + one-shot marker)
GIT_DIR=$(git rev-parse --git-dir 2>/dev/null)
if [ -n "$GIT_DIR" ] && [ -d "$GIT_DIR" ]; then
  echo 0 > "$GIT_DIR/frame-edit-count" 2>/dev/null
  rm -f "$GIT_DIR/frame-delivery-gate-fired" 2>/dev/null
fi

# Write session start timestamp for telemetry
SESSIONS_DIR="$PROJECT_ROOT/.planning/sessions"
if [ -d "$SESSIONS_DIR" ] && command -v git >/dev/null 2>&1; then
  SESSION_FILE="$SESSIONS_DIR/$(date -u +"%Y-%m-%dT%H-%M-%SZ").json"
  BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "unknown")
  TASK=$(grep "^- Task:" "$STATE_FILE" 2>/dev/null | head -1 | sed 's/.*Task: //' || echo "")
  printf '{"started_at":"%s","branch":"%s","task":"%s"}\n' \
    "$(date -u +"%Y-%m-%dT%H:%M:%SZ")" "$BRANCH" "$TASK" > "$SESSION_FILE"
fi

emit_output() {
  local msg="$1"
  if [ "$IS_ANTIGRAVITY" = "1" ]; then
    node -e "process.stdout.write(JSON.stringify({injectSteps:[{ephemeralMessage:process.argv[1]}]}))" -- "$msg"
  else
    printf "%s\n" "$msg"
  fi
}

# Onboarding: STATE.md missing or not yet filled (only template headers)
if [ ! -f "$STATE_FILE" ] || ! grep -q "^- Phase:" "$STATE_FILE" 2>/dev/null; then
  TEXT=$(cat << 'EOF'
╔══════════════════════════════════════════╗
║         FRAME — Getting Started          ║
╚══════════════════════════════════════════╝

  FRAME is installed but not yet initialized.

  Next step: run /frame:init (or /frame-init in Antigravity)
  This will scan your project and fill in
  MAP.md, rules (GEMINI.md / CLAUDE.md), and STATE.md.
EOF
)
  emit_output "$TEXT"
  exit 0
fi

LAST_ACTIVITY=0
if [[ "$OSTYPE" == "darwin"* ]]; then
  LAST_ACTIVITY=$(stat -f %m "$STATE_FILE" 2>/dev/null || echo 0)
else
  LAST_ACTIVITY=$(stat -c %Y "$STATE_FILE" 2>/dev/null || echo 0)
fi
NOW=$(date +%s)
ELAPSED=$(( NOW - LAST_ACTIVITY ))

PHASE=$(grep "^- Phase:" "$STATE_FILE" 2>/dev/null | head -1 | sed 's/.*Phase: //')
FEATURE=$(grep "^- Feature:" "$STATE_FILE" 2>/dev/null | head -1 | sed 's/.*Feature: //')
TASK=$(grep "^- Task:" "$STATE_FILE" 2>/dev/null | head -1 | sed 's/.*Task: //')

# STATE.md bloat check — history blocks accumulate and are never trimmed automatically.
# Threshold: 200 lines (a healthy STATE.md is the current block + a few history blocks).
STATE_BLOAT_THRESHOLD=200
STATE_LINES=$(wc -l < "$STATE_FILE" 2>/dev/null | tr -d ' ')
STATE_WARN=""
if [ "${STATE_LINES:-0}" -gt "$STATE_BLOAT_THRESHOLD" ]; then
  STATE_WARN="⚠ FRAME: STATE.md has grown to ${STATE_LINES} lines — run /frame:cleanup-memory to archive old history blocks."
fi

# < 2 hours: one-liner
if [ "$ELAPSED" -lt 7200 ]; then
  OUT="FRAME | Phase: ${PHASE:-?} | Feature: ${FEATURE:-?} | Task: ${TASK:-?}"
  [ -n "$STATE_WARN" ] && OUT="${OUT}\n${STATE_WARN}"
  emit_output "$OUT"
  exit 0
fi

# 2-24 hours: brief digest
if [ "$ELAPSED" -lt 86400 ]; then
  COMMITS=$(git log --oneline -3 2>/dev/null | sed 's/^/    /')
  OUT=$(cat << EOF
╔══════════════════════════════════════════╗
║           FRAME — Welcome back           ║
╚══════════════════════════════════════════╝

  Phase: ${PHASE:-?} | Feature: ${FEATURE:-?}
  Task:  ${TASK:-?}

  Recent commits:
${COMMITS}

${STATE_WARN}
EOF
)
  emit_output "$OUT"
  exit 0
fi

# > 24 hours: full context
COMMITS=$(git log --oneline -5 2>/dev/null | sed 's/^/    /')
STATE_HEAD=""
[ -f "$STATE_FILE" ] && STATE_HEAD=$(head -15 "$STATE_FILE" | sed 's/^/  /')

MAP_FILE="$PROJECT_ROOT/.planning/MAP.md"
MAP_HEAD=""
[ -f "$MAP_FILE" ] && MAP_HEAD=$(grep "^## Quick Facts" -A 6 "$MAP_FILE" 2>/dev/null | head -7 | sed 's/^/  /')

OUT=$(cat << EOF
╔══════════════════════════════════════════╗
║        FRAME SESSION INITIALIZED         ║
╚══════════════════════════════════════════╝

Current State:
${STATE_HEAD}

Project:
${MAP_HEAD}

  Recent commits:
${COMMITS}

Commands: /frame:daily (or /frame-daily), /frame:fast, /frame:plan, /frame:build

${STATE_WARN}
EOF
)

emit_output "$OUT"
exit 0
