# 使用node:20-alpine作为基础镜像
# 将此阶段命名为 build-stage
FROM node:20-alpine AS build-stage

# 设置工作目录
WORKDIR /app

# 启用Corepack（包管理工具）
RUN corepack enable
# 安装最新版本的 pnpm 包管理器
RUN corepack prepare pnpm@latest --activate

# 设置npm镜像源
RUN npm config set registry https://registry.npmmirror.com

# 将 package.json 和 pnpm-lock.yaml 文件复制到容器中
COPY package.json pnpm-lock.yaml ./

# 执行 pnpm install 来安装项目依赖
RUN pnpm install

# 将项目的全部内容复制到容器中
COPY . .

# 执行 pnpm build 来构建应用
# 构建后的文件会输出到 /app/dist 目录中
RUN pnpm build:pro

# 使用 Nginx 的稳定 Alpine 版本作为基础镜像
# 将此阶段命名为 production-stage
FROM nginx:stable-alpine AS production-stage

# 将 build-stage 阶段中 /app/dist 目录下生成的构建文件复制到 Nginx 的默认静态资源路径 /usr/share/nginx/html 中
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 暴露容器的 80 端口
EXPOSE 80

# 设置 Nginx 的启动命令，daemon off; 参数让 Nginx 在前台运行，以便容器保持活跃。
CMD ["nginx", "-g", "daemon off;"]
