start_time_one=$(date +%s)
#! /usr/bin/env sh
git pull
git status
git add .
git commit . -m "update"
git push -u origin main
# git push -u githubcopy main
# yarn run docs:build
npm run build

end_time_one=$(date +%s)
run_time_one=$((end_time_one - start_time_one))
start_time_two=$(date +%s)

set -e
cd dist
# git push -f vuepress@121.89.218.11:/var/www/html.git main
echo "已成功进入目录打包...正在进行打包"
zip -r ../zip/dist.zip ./
echo "已经成功打包"

echo "***** 上传中 *****"
scp -v -i ~/.ssh/id_rsa -r ../zip/dist.zip root@121.89.218.11:/www/wwwroot/gemini.bornforthis.cn
echo "***** 成功上传 *****"
rm -rf ../zip/dist.zip
echo "***** 进入服务器，触发远端程序 *****"
# ssh root@121.89.218.11 "sh /bash/autounzip.sh"
ssh -i ~/.ssh/id_rsa root@121.89.218.11 "sh /www/wwwroot/bash/gemini.sh"
echo "***** 传输完毕*****"


npm run dev
