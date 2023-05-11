import { Field, Float, InputType } from "@nestjs/graphql";

@InputType()
export class DeleteCustomerTypeInputType {
    @Field(type => Float)
    readonly id: number;
}