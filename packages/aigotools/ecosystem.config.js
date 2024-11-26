module.exports = {
  apps: [
    {
      name: "gamenav", // 应用名称
      script: "node_modules/next/dist/bin/next", // Next.js 启动脚本路径
      args: "start", // 启动参数
      cwd: "./", // 项目根目录
      env: {
        NODE_ENV: "production", // 环境变量
        PORT: 3000, // 端口号
      },
    },
  ],
};
