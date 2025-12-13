export interface ApiResponse<T> {
  data: T;
  error?: {
    status: number;
    message: string;
  };
}
