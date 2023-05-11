import { Field, ObjectType } from "@nestjs/graphql";
import { QueryResponse } from "./query-response.object-type";
import { AccountObjectType } from "./account.object-type";

@ObjectType()
export class QueryResponseAccountObjectType extends QueryResponse<AccountObjectType>{
    @Field(type => [AccountObjectType])
    items: AccountObjectType[];
}