const {injectBabelPlugin} = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const theme=require('./theme');
const path = require('path');

module.exports = function override(config, env) {
  config = injectBabelPlugin(['import', {libraryName: 'antd', style: true}], config);
  config = rewireLess.withLoaderOptions({
    modifyVars: theme(),
  })(config, env);
  config.resolve= {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  };
  return config;
};