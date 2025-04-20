import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, subject, message, honeypot } = data;
    
    // 检查蜜罐字段 - 如果有内容，可能是机器人
    if (honeypot) {
      // 返回成功但实际不处理，避免机器人检测到被拒绝
      return NextResponse.json({ success: true });
    }
    
    // 表单验证
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: '所有字段都是必填的' },
        { status: 400 }
      );
    }
    
    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '请提供有效的电子邮件地址' },
        { status: 400 }
      );
    }
    
    // 获取环境变量
    const toEmail = process.env.EMAIL_ADDRESS;
    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (!toEmail || !resendApiKey) {
      console.error('未配置必要的环境变量(EMAIL_ADDRESS或RESEND_API_KEY)');
      return NextResponse.json(
        { error: '服务器配置错误' },
        { status: 500 }
      );
    }
    
    // 创建Resend客户端
    const resend = new Resend(resendApiKey);
    
    // 格式化消息内容
    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #3b82f6; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">
          新的联系表单提交
        </h2>
        
        <div style="margin: 16px 0;">
          <p><strong>姓名:</strong> ${name}</p>
          <p><strong>邮箱:</strong> ${email}</p>
          <p><strong>主题:</strong> ${subject}</p>
        </div>
        
        <div style="background-color: #f9fafb; padding: 16px; border-radius: 4px; margin: 16px 0;">
          <h3 style="margin-top: 0; color: #4b5563;">消息内容:</h3>
          <p style="white-space: pre-line;">${message}</p>
        </div>
        
        <p style="font-size: 14px; color: #6b7280; border-top: 1px solid #e5e7eb; padding-top: 16px; margin-top: 16px;">
          此邮件通过您的作品集网站联系表单自动发送。
        </p>
      </div>
    `;
    
    // 发送邮件
    try {
      const { data, error } = await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>', // 使用Resend的默认发件人
        to: toEmail,
        replyTo: email,
        subject: `作品集联系表单: ${subject}`,
        html: emailHtml,
        text: `姓名: ${name}\n邮箱: ${email}\n主题: ${subject}\n\n消息:\n${message}`,
      });
      
      if (error) {
        console.error('Resend发送失败:', error);
        return NextResponse.json(
          { error: '邮件发送失败，请稍后重试' },
          { status: 500 }
        );
      }
      
      console.log('邮件发送成功，ID:', data?.id);
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error('邮件发送错误:', error);
      return NextResponse.json(
        { error: '邮件发送失败，请稍后重试' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('联系表单处理错误:', error);
    return NextResponse.json(
      { error: '处理请求时出错' },
      { status: 500 }
    );
  }
} 