# EmailJS 配置指南

此文档将指导您如何设置 EmailJS 以处理联系表单提交。

## 第1步：创建EmailJS账户

1. 访问 [EmailJS官方网站](https://www.emailjs.com/) 并注册一个免费账户
2. 免费计划每月可发送200封邮件，足够大多数个人网站使用

## 第2步：创建Email服务

1. 登录EmailJS仪表板
2. 点击"Email Services"选项卡
3. 点击"Add New Service"
4. 选择您想使用的电子邮件服务提供商（例如Gmail, Outlook等）
5. 按照提示连接您的电子邮件账户
6. 为服务命名，例如"contact_service"（记下服务ID，您需要它来配置网站）

## 第3步：创建Email模板

1. 点击"Email Templates"选项卡
2. 点击"Create New Template"
3. 设计您想要的电子邮件模板，确保使用以下变量:
   - `{{from_name}}` - 发送者姓名
   - `{{from_email}}` - 发送者电子邮件
   - `{{subject}}` - 邮件主题
   - `{{message}}` - 邮件内容
4. 保存模板并记下模板ID

## 第4步：获取公钥

1. 点击"Account"选项卡
2. 在"API Keys"部分找到您的"Public Key"
3. 复制此公钥

## 第5步：更新网站配置

打开 `src/app/sections/ContactSection.tsx` 文件，找到以下代码部分，并更新为您的实际值:

```typescript
// EmailJS服务配置 - 这些ID是公开的，可以安全地包含在客户端代码中
const EMAILJS_SERVICE_ID = 'service_contact_form'; // 用您的服务ID替换
const EMAILJS_TEMPLATE_ID = 'template_contact_form'; // 用您的模板ID替换
const EMAILJS_PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY'; // 用您的公钥替换
```

## 第6步：测试

1. 启动开发服务器 (`npm run dev`)
2. 填写联系表单并提交
3. 确认您收到了电子邮件

## 安全说明

- EmailJS公钥是可以安全地包含在前端代码中的，因为它有限制的权限
- 服务ID和模板ID也可以安全地包含在前端代码中
- 所有敏感认证都由EmailJS在其服务器上处理，不会暴露在您的代码中

## 自定义域名发送（可选）

如果您想使用自己的域名作为发件人，您可以:

1. 在EmailJS仪表板中添加和验证您的自定义域名
2. 更新您的电子邮件模板以使用您的自定义域名

## 故障排除

如果您遇到问题:

1. 检查浏览器控制台中的错误消息
2. 验证所有ID是否正确
3. 确保您的模板包含所有必需的变量
4. 确认您的EmailJS账户已验证电子邮件地址

## 限制

- 免费计划每月限制200封电子邮件
- 如果您需要更高的限额，您可以随时升级到付费计划 