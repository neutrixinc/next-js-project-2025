#!/bin/bash

# Ignore Vercel Build Step
# Configure it from Vercel Dashboard → Your Project → Settings → Git → Ignored Build Step → Run my Bash script

# Get the GitHub username of the last committer
GITHUB_COMMITTER=$(git log -1 --pretty=format:'%an')

# Allow deployment if commit message contains [deploy]
if git log -1 --pretty=format:'%B' | grep -q "\[deploy\]"; then
  echo "Force deploying due to commit message."
  exit 1  # Allow deployment
fi

# Allow deployment for merge commits
if git log -1 --pretty=%P | grep -q " "; then
  echo "Merge commit detected. Proceeding with deployment."
  exit 1  # Allow deployment
fi

# Skip deployment if the commit is neutrix-developer-eighteen
if [ "$GITHUB_COMMITTER" = "neutrix-developer-eighteen" ]; then
  echo "Skipping deployment for commit by $GITHUB_COMMITTER"
  exit 0  # Prevent deployment
fi

# Default: Allow deployment
exit 1
