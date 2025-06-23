// scripts/run-test.js
require('dotenv').config({ path: '.env.local' }); // 手动加载 .env.local
require('ts-node').register({
  compilerOptions: {
    module: 'commonjs'
  }
});
require('./test-webhook.ts');