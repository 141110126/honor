# linux脚本文件
# 拉取代码
echo '开始执行start.sh'

cd admin

# 打包
./node_modules/.bin/vue-cli-service build

# 删除容器
docker rm -f honor-admin

# 打印当前文件的绝对路径
echo $(cd $(dirname $0); pwd)

# 启动容器
docker run -d --restart=on-failure:5 -p 8082:80 -v $(cd $(dirname $0); pwd)/dist:/usr/share/nginx/html --name honor-admin nginx