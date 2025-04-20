import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function GET(request: Request) {
  console.log('Resend状态检查API被调用');
  
  try {
    // 获取环境变量
    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (!resendApiKey) {
      return NextResponse.json(
        { error: 'Resend API密钥未配置' },
        { status: 500 }
      );
    }
    
    const resend = new Resend(resendApiKey);
    
    try {
      // 尝试获取域名列表，这将验证API密钥是否有效
      const { data: domains, error: domainsError } = await resend.domains.list();
      
      if (domainsError) {
        console.error('获取域名列表失败:', domainsError);
        return NextResponse.json(
          { success: false, error: domainsError, message: '无法获取Resend域名列表' },
          { status: 500 }
        );
      }
      
      // 获取API密钥信息
      const { data: apiKeys, error: apiKeysError } = await resend.apiKeys.list();
      
      // 返回账户状态信息
      return NextResponse.json({
        success: true,
        accountStatus: {
          domains: domains || [],
          hasVerifiedDomains: domains && Array.isArray(domains) && domains.length > 0,
          defaultSender: 'onboarding@resend.dev',
          apiKeys: apiKeys ? { count: Array.isArray(apiKeys) ? apiKeys.length : 0 } : { error: '无法获取API密钥信息' }
        },
        message: 'Resend账户状态检查成功'
      });
    } catch (apiError: any) {
      console.error('Resend API检查错误:', apiError);
      
      // 尝试解析错误信息
      let errorDetails = {
        message: apiError.message || '未知错误',
        statusCode: apiError.statusCode || '未知状态码',
        name: apiError.name || '未知错误类型'
      };
      
      // 检测常见的错误类型
      const isAuthError = 
        apiError.statusCode === 401 || 
        apiError.message?.includes('auth') || 
        apiError.message?.includes('unauthorized') ||
        apiError.message?.includes('invalid');
      
      let actionSuggestion = '';
      if (isAuthError) {
        actionSuggestion = '请检查您的API密钥是否正确，或登录Resend账户查看密钥状态。';
      } else {
        actionSuggestion = '请检查Resend账户设置，确保已验证电子邮件并同意服务条款。';
      }
      
      return NextResponse.json(
        { 
          success: false, 
          error: errorDetails,
          suggestion: actionSuggestion,
          message: '无法验证Resend账户状态' 
        },
        { status: isAuthError ? 401 : 500 }
      );
    }
  } catch (error: any) {
    console.error('Resend状态检查路由错误:', error);
    return NextResponse.json(
      { success: false, error: error.message, message: 'Resend状态检查处理错误' },
      { status: 500 }
    );
  }
} 