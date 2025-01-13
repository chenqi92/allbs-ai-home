export interface UploadResponse {
  fileName: string;
  url: string;
  uuName: string;
}

export interface ApiResponse<T = any> {
  code: number;
  msg: string;
  data: T;
  ok?: boolean;
}

export interface RequestConfig extends RequestInit {
  params?: Record<string, string>;
  data?: any;
} 