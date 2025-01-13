# ========== 阶段1：构建阶段 (builder) ==========
FROM node:18-alpine AS builder

# 设置工作目录
WORKDIR /app

# 设置 npm 源（国内环境使用加速镜像，避免下载超时）
RUN npm config set registry https://registry.npmmirror.com

# 可选：禁用 Next.js Telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# 复制 package*.json 并安装依赖
COPY package*.json ./
RUN npm install

# 复制剩余源码
COPY . .

# 如果是 Next.js 项目，执行构建
RUN npm run build


# ========== 阶段2：生产运行阶段 (production) ==========
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 同步编译后的产物 (如 .next / dist 等) 和 package*.json / node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

# 如果还需要 public 文件夹、配置文件，也在这里复制：
# COPY --from=builder /app/public ./public

# 暴露容器内的 3000 端口（Next.js 默认端口）
EXPOSE 3000

# 启动命令
CMD ["npm", "run", "start"]
