import { PaginationFilter } from "./pagination.filter";

export class CustomerTypeFilter extends PaginationFilter {
    id: number;
    name: string;
    description: string;
}