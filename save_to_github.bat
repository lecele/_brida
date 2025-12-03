@echo off
echo Initializing Git repository...
git init

echo Adding files...
git add .

echo Committing changes...
git commit -m "Save project state"

echo Renaming branch to main...
git branch -M main

echo Configuring remote...
git remote add origin git@github.com:lecele/_brida.git
git remote set-url origin git@github.com:lecele/_brida.git

echo Pushing to GitHub...
git push -u origin main

echo Done!
pause

