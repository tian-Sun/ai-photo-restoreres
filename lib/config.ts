export const config = {
  // 环境判断
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  
  // DodoPayment配置
  dodo: {
    merchantId: process.env.DODO_MERCHANT_ID!,
    apiKey: process.env.DODO_API_KEY!,
    webhookSecret: process.env.DODO_WEBHOOK_SECRET!,
    apiUrl: process.env.DODO_API_URL || 'https://api.dodopayment.com',
    testMode: process.env.NODE_ENV === 'development'
  },
  
  // Webhook URL配置
  webhook: {
    // 开发环境使用ngrok或localtunnel
    development: process.env.DEV_WEBHOOK_URL || 'https://your-ngrok-url.ngrok.io',
    // 生产环境使用实际域名
    production: process.env.PROD_WEBHOOK_URL || 'https://yourdomain.com',
    
    // 获取当前环境的webhook URL
    getUrl(): string {
      const baseUrl: string = config.isDevelopment ? this.development : this.production;
      return `${baseUrl}/api/subscription/webhook`;
    }
  },
  
  // 获取当前环境信息
  getEnvironmentInfo() {
    return {
      nodeEnv: process.env.NODE_ENV,
      isDevelopment: this.isDevelopment,
      isProduction: this.isProduction,
      webhookUrl: this.webhook.getUrl(),
      dodoTestMode: this.dodo.testMode
    };
  }
};

// 开发环境提示
if (config.isDevelopment) {
  console.log('🧪 Development Mode Active');
  console.log('📡 Webhook URL:', config.webhook.getUrl());
  console.log('🔑 DodoPayment Test Mode:', config.dodo.testMode);
  
  if (!config.webhook.development.includes('ngrok') && !config.webhook.development.includes('loca.lt')) {
    console.warn('⚠️  Please set DEV_WEBHOOK_URL in your .env.local file');
    console.warn('   Example: DEV_WEBHOOK_URL=https://abc123.ngrok.io');
  }
} 