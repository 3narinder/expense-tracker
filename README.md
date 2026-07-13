# expense-tracker
###git commands ###
git checkout dev
# ...make changes...
git add .
git commit -m "add savings tips ledger styling"
git push

###When dev is tested and ready to go live
git checkout main
git pull origin main
git merge dev
git push origin main
