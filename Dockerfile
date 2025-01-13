# 使用官方 node LTS 版本镜像作为基础
FROM node:20.17.0

# 设置工作目录
WORKDIR /app

# 将 package.json 和 package-lock.json / yarn.lock 拷贝到容器
COPY package*.json ./
# 如果使用yarn，请改为 COPY yarn.lock ./

# 安装依赖
RUN npm install
# 如果是 yarn，则使用 RUN yarn

# 复制当前项目文件到容器中
COPY . .

# 构建项目
RUN npm run build

# 暴露端口
EXPOSE 3000

# 启动服务
CMD ["npm", "run", "start"]
