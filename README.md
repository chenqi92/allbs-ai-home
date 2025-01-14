## 说明
一个落地页，完全由ai生成，包含i18n, 亮暗模式
使用https://bolt.new/ 生成项目基础框架、绘制画面等等，使用cursor局部调整，没有手动调整过代码，全靠ai自觉
后续继续使用ai完善，坚决不亲自动手，主要我也不会react和next就是了

## 预览地址
[点击预览](https://allbs.cn/zh)

## 预览图片
![](https://mf.allbs.cn/cloudpic/2025/01/dcfcfc590ecb6287de9645c8008ae7c7.png)
![](https://mf.allbs.cn/cloudpic/2025/01/727cdcd8bbc73a30ecbf908bc5433824.png)
![](https://github.com/user-attachments/assets/7a28ecc5-d395-48bb-b767-5a9096511e41)
![](https://github.com/user-attachments/assets/e2403abd-9d3d-478f-8b7d-59df4a1d970d)
![](https://github.com/user-attachments/assets/f1b1a097-7184-4e8b-bf60-96b159c8df58)


## 本地运行
```
npm install 

npm run dev

```

## docker-compose配置
用的docker-compose本地打包运行
```yml
allbs-ai-home-app:
    build:
      context: ./allbs-all/allbs-ai-home  # 指向源码所在目录
      dockerfile: Dockerfile             # Dockerfile 文件名
      args:
        NEXT_PUBLIC_API_BASE_URL: "上传文件路径"
        NEXT_PUBLIC_PREVIEW_URL: "预览路径"
    container_name: allbs-ai-home-app    # 容器名称
    ports:
      - "3000:3000"                      # 映射端口
    restart: always
```
## linux部署脚本
```
NEXTJS_DIR="/mnt/allbs-all/allbs-ai-home"   # Next.js 源码目录
DOCKER_COMPOSE_DIR="/mnt"                  # docker-compose.yml 所在目录
echo "==== 部署 Next.js 项目: allbs-ai-home ===="

  # 进入 Next.js 项目目录
  cd "$NEXTJS_DIR" || { echo "进入 Next.js 项目目录失败: $NEXTJS_DIR"; exit 1; }

  echo "正在强制拉取最新代码 (allbs-ai-home)..."
  git fetch --all
  git reset --hard origin/master
  if [ $? -eq 0 ]; then
    echo "Next.js 代码拉取成功"
  else
    echo "Next.js 代码拉取失败"
    exit 1
  fi

  # 回到 docker-compose.yml 所在目录
  echo "回到 docker-compose 所在目录: $DOCKER_COMPOSE_DIR"
  cd "$DOCKER_COMPOSE_DIR" || { echo "进入 docker-compose 所在目录失败: $DOCKER_COMPOSE_DIR"; exit 1; }

  # 强制重新构建容器并启动
  echo "开始 Docker Compose 构建并启动容器 (allbs-ai-home)..."
  docker-compose build --no-cache
  if [ $? -eq 0 ]; then
    echo "docker-compose build 成功"
  else
    echo "docker-compose build 失败"
    exit 1
  fi

  docker-compose up -d
  if [ $? -eq 0 ]; then
    echo "容器已启动（后台运行）"
  else
    echo "docker-compose up 失败"
    exit 1
  fi

  echo "Next.js 部署完成！"
```
