export default {
  jwt_config: {
    secret: 'trj', // 使用 token 签名密文
    signOptions: { expiresIn: '60s' }, // 设置 token 的有效期\
  },
  sqlite: {
    type: 'sqlite',
    database: 'src/db/db.sqlite',
    synchronize: true,
    logging: false,
    autoLoadEntities: true,
    // "migrations": [
    //     "src/migration/**/*.ts"
    // ],
    // "subscribers": [
    //     "src/subscriber/**/*.ts"
    // ],
  },
  statusMonitorConfig: {
    pageTitle: '服务监控',
    port: 3000,
    path: '/status',
    ignoreStartsWith: '/healt/alive',
    spans: [
      {
        interval: 1, // Every second
        retention: 60, // Keep 60 datapoints in memory
      },
      {
        interval: 5, // Every 5 seconds
        retention: 60,
      },
      {
        interval: 15, // Every 15 seconds
        retention: 60,
      },
    ],
    chartVisibility: {
      cpu: true,
      mem: true,
      load: true,
      responseTime: true,
      rps: true,
      statusCodes: true,
    },
    healthChecks: [],
  },
};
