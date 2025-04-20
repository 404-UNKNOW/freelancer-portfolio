// 此文件不再需要，因为表单提交现在直接使用EmailJS在客户端处理
// 仅作为示例保留，可以删除

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  return NextResponse.json({ 
    success: true,
    message: '此测试API已不再使用，联系表单现在使用EmailJS'
  });
} 