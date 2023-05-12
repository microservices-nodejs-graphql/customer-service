import { Field, Float, ObjectType } from "@nestjs/graphql";
import { CustomerObjectType } from "./customer.object-type";
import { AccountObjectType } from "./account.object-type";

@ObjectType()
export class CustomerAccountObjectType {
    @Field(type => Float, { nullable: true })
    id: number;

    @Field(type => CustomerObjectType, { nullable: true })
    customer: CustomerObjectType;

    @Field(type => AccountObjectType, { nullable: true })
    account: AccountObjectType;

    @Field({ nullable: true })
    mount: string;

    @Field({ nullable: true })
    status: string;
}