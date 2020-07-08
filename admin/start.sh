# linux脚本文件
# 拉取代码
git pull
# 打包
npm run build
# 删除容器
docker rm -f honor-admin
# 启动容器
# docker run -d -p 8080:80 -v $PWD/dist:/usr/share/nginx/html nginx
docker run -d -p 8080:80 -v $(cd $(dirname $0); pwd)/dist:/usr/share/nginx/html nginx

# docker run -d --restart=on-failure:5 -p 8080:80 -v $PWD/dist:usr/share/nginx/html --name honor-admin nginx