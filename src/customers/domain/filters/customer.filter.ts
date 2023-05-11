import { PaginationFilter } from "./pagination.filter";

export class CustomerFilter extends PaginationFilter {
    id: number;
    customerTypeId: number;
    numberDocument: string;
    bussinessName: string;
    name: string;
    lastname: string;
}