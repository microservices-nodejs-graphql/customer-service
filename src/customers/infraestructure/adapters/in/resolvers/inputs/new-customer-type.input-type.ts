import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class NewCustomerTypeInputType {
    @Field()
    readonly name: string;

    @Field()
    readonly description: string;
}