@echo off
cd /d %~dp0

echo ========================================
echo Life Restart 部署脚本
echo ========================================
echo.

echo 步骤 1: 添加所有更改的文件...
git add .editorconfig
git add .gitignore
git add *.md
git add lifeRestart_other/.eslintignore
git add lifeRestart_other/.eslintrc.json
git add lifeRestart_other/.prettierignore
git add lifeRestart_other/.prettierrc
git add lifeRestart_other/CODE_QUALITY.md
git add lifeRestart_other/LINT_REPORT.md
git add lifeRestart_xp/.eslintignore
git add lifeRestart_xp/.eslintrc.json
git add lifeRestart_xp/.prettierignore
git add lifeRestart_xp/.prettierrc
git add lifeRestart_xp/CODE_QUALITY.md
git add lifeRestart_xp/LINT_REPORT.md
git add -u lifeRestart_other/src
git add -u lifeRestart_other/repl
git add -u lifeRestart_other/utils
git add -u lifeRestart_other/view
git add -u lifeRestart_other/package.json
git add -u lifeRestart_other/public
git add -u lifeRestart_xp/package.json
git add -u lifeRestart_xp/view

echo.
echo 步骤 2: 提交更改...
git commit -m "feat: 项目质量改进 - 集成 ESLint/Prettier, 添加 CSP 安全策略，修复代码规范问题和安全漏洞"

echo.
echo 步骤 3: 推送到 GitHub...
git push origin main

echo.
echo ========================================
echo 部署完成！
echo ========================================

pause
