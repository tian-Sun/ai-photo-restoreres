#!/usr/bin/env ts-node

import { runAllWebhookTests } from '../utils/webhookTest';
import { config } from '../lib/config';

console.log('DODO_WEBHOOK_SECRET:', process.env.DODO_WEBHOOK_SECRET);
console.log('DEV_WEBHOOK_URL:', process.env.DEV_WEBHOOK_URL);
console.log('NODE_ENV:', process.env.NODE_ENV);

async function main() {
  console.log('🧪 DodoPayment Webhook Test Script');
  console.log('=====================================');
  
  // 显示环境信息
  const envInfo = config.getEnvironmentInfo();
  console.log('🌍 Environment:', envInfo.nodeEnv);
  console.log('📡 Webhook URL:', envInfo.webhookUrl);
  console.log('🔑 Test Mode:', envInfo.dodoTestMode);
  
  // 检查必要的环境变量
  if (!config.dodo.webhookSecret) {
    console.error('❌ DODO_WEBHOOK_SECRET is not set');
    console.log('💡 Please add DODO_WEBHOOK_SECRET to your .env.local file');
    process.exit(1);
  }
  
  if (config.isDevelopment && !config.webhook.development.includes('ngrok') && !config.webhook.development.includes('loca.lt')) {
    console.warn('⚠️  Development webhook URL not configured');
    console.log('💡 Please set DEV_WEBHOOK_URL in your .env.local file');
    console.log('   Example: DEV_WEBHOOK_URL=https://abc123.ngrok.io');
    process.exit(1);
  }
  
  // 运行测试
  try {
    const results = await runAllWebhookTests(
      config.webhook.getUrl(),
      config.dodo.webhookSecret
    );
    
    // 检查测试结果
    const failedTests = results.filter(r => !r.result.success);
    
    if (failedTests.length > 0) {
      console.log('\n❌ Some tests failed:');
      failedTests.forEach(({ eventType, result }) => {
        console.log(`   - ${eventType}: ${result.error || 'Unknown error'}`);
      });
      process.exit(1);
    } else {
      console.log('\n✅ All webhook tests passed!');
      console.log('🎉 Your webhook endpoint is working correctly.');
    }
    
  } catch (error) {
    console.error('❌ Test execution failed:', error);
    process.exit(1);
  }
}

// 运行测试
async function runTests() {
  await main();
}

runTests();