import { Field, Float, InputType } from "@nestjs/graphql";

@InputType()
export class DeleteCustomerInputType {
    @Field(type => Float)
    readonly id: number;
}