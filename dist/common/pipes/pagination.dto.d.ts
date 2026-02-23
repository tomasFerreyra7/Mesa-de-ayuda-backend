export declare class PaginationDto {
    page?: number;
    per_page?: number;
    q?: string;
    get skip(): number;
    get take(): number;
}
export declare function paginate<T>(data: T[], total: number, dto: PaginationDto): {
    data: T[];
    meta: {
        total: number;
        page: number;
        per_page: number;
        pages: number;
    };
};
