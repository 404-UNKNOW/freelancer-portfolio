import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function GET(request: Request) {
  console.log('测试邮件API被调用');
  
  try {
    // 获取环境变量
    const toEmail = process.env.EMAIL_ADDRESS;
    const resendApiKey = process.env.RESEND_API_KEY;
    
    console.log('环境变量:', { 
      hasToEmail: !!toEmail, 
      hasResendApiKey: !!resendApiKey,
      toEmailLength: toEmail?.length,
      apiKeyPrefix: resendApiKey?.substring(0, 5)
    });
    
    if (!toEmail || !resendApiKey) {
      return NextResponse.json(
        { error: '环境变量缺失', details: { hasToEmail: !!toEmail, hasResendApiKey: !!resendApiKey } },
        { status: 500 }
      );
    }
    
    const resend = new Resend(resendApiKey);
    
    // 尝试发送测试邮件
    try {
      const { data, error } = await resend.emails.send({
        from: 'Resend Test <onboarding@resend.dev>',
        to: toEmail,
        subject: '测试邮件 - 验证Resend配置',
        html: `
          <div style="font-family: sans-serif; padding: 20px;">
            <h2>Resend测试邮件</h2>
            <p>这是一封测试邮件，用于验证Resend API配置是否正确。</p>
            <p>如果您收到此邮件，说明Resend配置正常。</p>
            <p>发送时间: ${new Date().toLocaleString()}</p>
          </div>
        `,
      });
      
      if (error) {
        console.error('测试邮件发送失败:', error);
        return NextResponse.json(
          { success: false, error, message: '测试邮件发送失败' },
          { status: 500 }
        );
      }
      
      console.log('测试邮件发送成功:', data);
      return NextResponse.json({ 
        success: true, 
        messageId: data?.id,
        message: '测试邮件已发送，请检查您的邮箱' 
      });
    } catch (sendError: any) {
      console.error('Resend API错误:', sendError);
      console.error('错误详情:', sendError.message, sendError.statusCode);
      return NextResponse.json(
        { 
          success: false, 
          error: sendError.message,
          statusCode: sendError.statusCode,
          message: '调用Resend API时出错' 
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('测试邮件路由错误:', error);
    return NextResponse.json(
      { success: false, error: error.message, message: '测试邮件路由处理错误' },
      { status: 500 }
    );
  }
} 