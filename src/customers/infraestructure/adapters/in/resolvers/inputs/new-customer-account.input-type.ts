import { Field, Float, InputType } from "@nestjs/graphql";

@InputType()
export class NewCustomerAccountInputType {
    @Field(type => Float)
    readonly customerId: number;

    @Field(type => Float)
    readonly accountId: number;
}