import { Field, ObjectType } from "@nestjs/graphql";
import { QueryResponse } from "./query-response.object-type";
import { CustomerTypeObjectType } from "./customer-type.object-type";

@ObjectType()
export class QueryResponseCustomerTypeObjectType extends QueryResponse<CustomerTypeObjectType>{
    @Field(type => [CustomerTypeObjectType])
    items: CustomerTypeObjectType[];
}