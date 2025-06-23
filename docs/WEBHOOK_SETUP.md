# DodoPayment Webhook 配置指南

## 📋 概述

本文档说明如何配置DodoPayment的webhook URL，用于接收支付和订阅相关的实时通知。

## 🌐 Webhook URL配置方案

### 1. 本地开发环境

#### 使用 ngrok (推荐)

1. **安装 ngrok**
```bash
npm install -g ngrok
```

2. **启动你的Next.js应用**
```bash
npm run dev
```

3. **在另一个终端启动ngrok隧道**
```bash
ngrok http 3000
```

4. **获取公网URL**
ngrok会显示类似这样的URL：
```
https://abc123.ngrok.io
```

5. **配置环境变量**
在 `.env.local` 文件中添加：
```env
DEV_WEBHOOK_URL=https://abc123.ngrok.io
```

#### 使用 localtunnel (免费替代)

1. **安装 localtunnel**
```bash
npm install -g localtunnel
```

2. **启动隧道**
```bash
lt --port 3000
```

3. **配置环境变量**
```env
DEV_WEBHOOK_URL=https://your-subdomain.loca.lt
```

### 2. 测试环境

#### 使用 Vercel 预览部署

1. **推送代码到GitHub分支**
```bash
git add .
git commit -m "Add webhook support"
git push origin feature/dodopayment
```

2. **获取预览URL**
Vercel会自动创建预览URL，例如：
```
https://ai-photo-restoreres-git-feature-dodopayment.vercel.app
```

3. **配置环境变量**
```env
PROD_WEBHOOK_URL=https://ai-photo-restoreres-git-feature-dodopayment.vercel.app
```

### 3. 生产环境

使用你的实际域名：
```env
PROD_WEBHOOK_URL=https://yourdomain.com
```

## 🔧 环境变量配置

### 开发环境 (.env.local)
```env
# DodoPayment测试配置
DODO_MERCHANT_ID=test_merchant_id
DODO_API_KEY=test_api_key
DODO_WEBHOOK_SECRET=test_webhook_secret
DODO_API_URL=https://test-api.dodopayment.com

# Webhook URL
DEV_WEBHOOK_URL=https://your-ngrok-url.ngrok.io
```

### 生产环境 (.env.production)
```env
# DodoPayment生产配置
DODO_MERCHANT_ID=live_merchant_id
DODO_API_KEY=live_api_key
DODO_WEBHOOK_SECRET=live_webhook_secret
DODO_API_URL=https://api.dodopayment.com

# Webhook URL
PROD_WEBHOOK_URL=https://yourdomain.com
```

## 🧪 测试Webhook

### 1. 运行测试脚本
```bash
npm run test:webhook
```

### 2. 手动测试
```bash
# 启动开发服务器
npm run dev

# 在另一个终端运行测试
npx ts-node scripts/test-webhook.ts
```

### 3. 查看测试结果
测试脚本会发送以下事件：
- `payment.succeeded` - 支付成功
- `payment.failed` - 支付失败
- `subscription.created` - 订阅创建

## 📡 DodoPayment后台配置

### 1. 登录DodoPayment商户后台

### 2. 进入Webhook设置页面

### 3. 添加Webhook URL
- **开发环境**: `https://your-ngrok-url.ngrok.io/api/subscription/webhook`
- **测试环境**: `https://your-preview-url.vercel.app/api/subscription/webhook`
- **生产环境**: `https://yourdomain.com/api/subscription/webhook`

### 4. 选择事件类型
确保选择以下事件：
- `payment.succeeded`
- `payment.failed`
- `subscription.created`
- `subscription.updated`
- `subscription.cancelled`

### 5. 保存配置

## 🔍 调试和监控

### 1. 查看日志
```bash
# 开发环境日志
npm run dev

# 查看webhook接收日志
tail -f logs/webhook.log
```

### 2. 使用DodoPayment测试工具
- 在商户后台使用测试模式
- 发送测试webhook事件
- 验证接收状态

### 3. 监控webhook状态
- 检查DodoPayment后台的webhook发送状态
- 查看失败重试记录
- 监控响应时间

## ⚠️ 注意事项

### 1. 安全性
- 始终验证webhook签名
- 使用HTTPS URL
- 定期轮换webhook密钥

### 2. 可靠性
- 实现幂等性处理
- 添加重试机制
- 监控webhook失败率

### 3. 性能
- 快速响应webhook (200状态码)
- 异步处理业务逻辑
- 避免长时间阻塞

## 🚨 常见问题

### Q: ngrok URL经常变化怎么办？
A: 使用ngrok的固定域名功能，或者每次更新后重新配置环境变量。

### Q: webhook接收不到怎么办？
A: 检查URL是否正确、防火墙设置、DodoPayment配置等。

### Q: 签名验证失败怎么办？
A: 确认webhook密钥配置正确，检查签名算法是否匹配。

### Q: 如何处理重复的webhook？
A: 实现幂等性检查，使用事件ID去重。

## 📞 技术支持

如果遇到问题，请检查：
1. 环境变量配置
2. 网络连接
3. DodoPayment后台设置
4. 应用日志

联系技术支持时，请提供：
- 错误日志
- 环境信息
- 复现步骤 