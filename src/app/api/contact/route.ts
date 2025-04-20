import { NextResponse } from 'next/server';

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
    
    // 获取环境变量中的邮箱地址（注意没有NEXT_PUBLIC_前缀）
    const toEmail = process.env.EMAIL_ADDRESS;
    if (!toEmail) {
      console.error('未配置EMAIL_ADDRESS环境变量');
      return NextResponse.json(
        { error: '服务器配置错误' },
        { status: 500 }
      );
    }
    
    // 使用FormSubmit.co API发送邮件，但在服务器端处理，不在客户端暴露邮箱
    const formSubmitResponse = await fetch(`https://formsubmit.co/${toEmail}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        subject,
        message
      })
    });
    
    if (!formSubmitResponse.ok) {
      return NextResponse.json(
        { error: '发送消息时出错' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('联系表单处理错误:', error);
    return NextResponse.json(
      { error: '发送消息时出错' },
      { status: 500 }
    );
  }
} 