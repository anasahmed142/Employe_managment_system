import { NextResponse } from 'next/server';

type ResponseData = {
  success: boolean;
  status: number;
  message?: string;
  data?: object | object[] | null;
  error?: string;
};

export function response(
  data: object | object[] | null = null,
  status: number = 200,
  message: string | null = null,
  error: string | null = null
) {
  const responseBody: ResponseData = {
    success: status >= 200 && status < 300,
    status,
    ...(message && { message }),
    ...(data !== null && { data }),
    ...(error && { error }),
  };

  return NextResponse.json(responseBody, { status });
}
