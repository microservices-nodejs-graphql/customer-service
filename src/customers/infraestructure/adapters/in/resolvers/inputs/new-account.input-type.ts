import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class NewAccountInputType {
    @Field()
    readonly name: string;

    @Field()
    readonly openingBalance: string;
}