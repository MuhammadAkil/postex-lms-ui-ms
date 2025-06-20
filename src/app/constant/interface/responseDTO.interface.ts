import { Pagination } from "./pagination.interface";

export interface ResponseDTO<T> {
    dist?: T;
    pagination?:Pagination;
    statusCode?: String;
    statusMessage?: String;
    statusMessageDetail?: String;
}