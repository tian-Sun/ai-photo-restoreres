import crypto from 'crypto';

// Webhook测试数据
export const testWebhookEvents = {
  paymentSucceeded: {
    id: 'evt_test_payment_succeeded',
    type: 'payment.succeeded',
    data: {
      order_id: 'order_test_123',
      payment_id: 'pay_test_456',
      status: 'succeeded',
      amount: 1500, // 15.00 USD
      currency: 'USD',
      created_at: new Date().toISOString(),
      customer_email: 'test@example.com',
      subscription_id: 'sub_test_789'
    },
    created_at: new Date().toISOString()
  },
  
  paymentFailed: {
    id: 'evt_test_payment_failed',
    type: 'payment.failed',
    data: {
      order_id: 'order_test_124',
      payment_id: 'pay_test_457',
      status: 'failed',
      amount: 1500,
      currency: 'USD',
      created_at: new Date().toISOString(),
      failure_reason: 'insufficient_funds'
    },
    created_at: new Date().toISOString()
  },
  
  subscriptionCreated: {
    id: 'evt_test_subscription_created',
    type: 'subscription.created',
    data: {
      subscription_id: 'sub_test_789',
      customer_id: 'cus_test_123',
      plan_id: 'plan_pro',
      status: 'active',
      current_period_start: new Date().toISOString(),
      current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      created_at: new Date().toISOString()
    },
    created_at: new Date().toISOString()
  }
};

// 生成测试webhook签名
export function generateTestSignature(payload: any, secret: string): string {
  const payloadString = JSON.stringify(payload);
  return crypto
    .createHmac('sha256', secret)
    .update(payloadString)
    .digest('hex');
}

// 测试webhook发送
export async function testWebhook(eventType: keyof typeof testWebhookEvents, webhookUrl: string, secret: string) {
  const event = testWebhookEvents[eventType];
  const signature = generateTestSignature(event, secret);
  
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-dodo-signature': signature,
        'user-agent': 'DodoPayment-Webhook-Test/1.0'
      },
      body: JSON.stringify(event)
    });
    
    const text = await response.text();
console.log('Webhook raw response:', text);
let result;
try {
  result = JSON.parse(text);
} catch (e) {
  console.error('JSON parse error:', e);
  result = text;
}
    
    console.log(`🧪 Test webhook sent: ${eventType}`);
    console.log('📡 URL:', webhookUrl);
    console.log('📊 Status:', response.status);
    console.log('📄 Response:', result);
    
    return { success: response.ok, status: response.status, data: result };
  } catch (error) {
    console.error('❌ Webhook test failed:', error);
    return { success: false, error };
  }
}

// 批量测试所有webhook事件
export async function runAllWebhookTests(webhookUrl: string, secret: string) {
  console.log('🚀 Starting webhook tests...');
  console.log('📡 Webhook URL:', webhookUrl);
  
  const results = [];
  
  for (const eventType of Object.keys(testWebhookEvents) as Array<keyof typeof testWebhookEvents>) {
    console.log(`\n--- Testing ${eventType} ---`);
    const result = await testWebhook(eventType, webhookUrl, secret);
    results.push({ eventType, result });
    
    // 等待1秒再发送下一个
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n📋 Test Results Summary:');
  results.forEach(({ eventType, result }) => {
    const status = result.success ? '✅' : '❌';
    console.log(`${status} ${eventType}: ${result.status || 'Error'}`);
  });
  
  return results;
} 