import type { Dict } from './shared';

export interface HttpResponse<D = unknown> {
    data: D;
    metadata: Dict; // Thông tin phân trang
    message: string | null;
    messageCode: string | null; // Để làm da ngôn ngữ
    statusCode: number;
}
