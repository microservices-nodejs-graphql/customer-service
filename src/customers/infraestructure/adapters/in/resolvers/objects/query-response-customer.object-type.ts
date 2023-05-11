import { Field, ObjectType } from "@nestjs/graphql";
import { QueryResponse } from "./query-response.object-type";
import { CustomerObjectType } from "./customer.object-type";

@ObjectType()
export class QueryResponseCustomerObjectType extends QueryResponse<CustomerObjectType>{
    @Field(type => [CustomerObjectType])
    items: CustomerObjectType[];
}