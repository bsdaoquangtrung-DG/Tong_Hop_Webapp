#!/bin/bash
# Script tự động commit và đẩy code lên GitHub repository
# Repo: https://github.com/bsdaoquangtrung-DG/Tong_Hop_Webapp.git

cd "$(dirname "$0")/.." || exit 1

git add .
if git diff-index --quiet HEAD --; then
    echo "Không có thay đổi mới cần commit."
else
    COMMIT_MSG=${1:-"update: Tự động cập nhật code cổng thông tin $(date '+%Y-%m-%d %H:%M:%S')"}
    git commit -m "$COMMIT_MSG"
fi

echo "Đang đẩy code lên GitHub..."
git push origin main
