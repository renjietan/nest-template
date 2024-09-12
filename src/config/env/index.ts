import developmentConfig from './dev';
import productionConfig from './prod';
import commonConfig from './common';

const configs = {
  development: developmentConfig,
  production: productionConfig,
};
const env = process.env.NODE_ENV || 'development';

export default () => ({
  ...commonConfig,
  ...configs[env],
});
