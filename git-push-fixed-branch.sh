#!/bin/bash

# =========================
# Git 固定分支推送脚本
# 永远不触碰 main
# =========================

# 👉 固定分支名（只改这里）
FIXED_BRANCH="dev-experiment"

# 提交信息（可选）
COMMIT_MSG=${1:-"auto commit"}

echo "🚀 目标分支：$FIXED_BRANCH"
echo "📝 提交信息：$COMMIT_MSG"

# 1. 必须在 git 仓库中
if [ ! -d ".git" ]; then
  echo "❌ 当前目录不是 Git 仓库"
  exit 1
fi

# 2. 如果分支不存在则创建
if ! git show-ref --quiet refs/heads/"$FIXED_BRANCH"; then
  echo "🌱 本地分支不存在，创建中..."
  git checkout -b "$FIXED_BRANCH" || exit 1
else
  git checkout "$FIXED_BRANCH" || exit 1
fi

# 3. 添加并提交
git add .

# 如果没有变化，直接退出
if git diff --cached --quiet; then
  echo "ℹ️ 没有需要提交的改动"
  exit 0
fi

git commit -m "$COMMIT_MSG" || exit 1

# 4. 推送到远程同名分支
git push -u origin "$FIXED_BRANCH" || exit 1

echo "✅ 推送完成（main 未被修改）"