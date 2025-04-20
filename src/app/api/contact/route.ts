import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, subject, message, honeypot } = data;
    
    console.log('接收到联系表单提交:', { name, email, subject, messageLength: message?.length });
    
    // 检查蜜罐字段 - 如果有内容，可能是机器人
    if (honeypot) {
      console.log('检测到蜜罐字段，可能是机器人，忽略此提交');
      return NextResponse.json({ success: true });
    }
    
    // 表单验证
    if (!name || !email || !subject || !message) {
      console.log('表单验证失败，缺少必填字段:', { name: !!name, email: !!email, subject: !!subject, message: !!message });
      return NextResponse.json(
        { error: '所有字段都是必填的' },
        { status: 400 }
      );
    }
    
    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('邮箱格式验证失败:', email);
      return NextResponse.json(
        { error: '请提供有效的电子邮件地址' },
        { status: 400 }
      );
    }
    
    // 直接返回成功，实际邮件发送将在客户端完成
    // 这是因为EmailJS不需要API密钥暴露在服务器端，在客户端更容易集成
    return NextResponse.json({ 
      success: true,
      message: '表单验证成功，将在客户端处理邮件发送'
    });
  } catch (error: any) {
    console.error('联系表单处理错误:', error);
    console.error('错误堆栈:', error.stack);
    return NextResponse.json(
      { error: '处理请求时出错', details: error.message },
      { status: 500 }
    );
  }
} 