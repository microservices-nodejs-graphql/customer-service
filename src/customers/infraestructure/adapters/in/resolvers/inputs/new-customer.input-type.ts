import { Field, Float, InputType } from "@nestjs/graphql";

@InputType()
export class NewCustomerInputType {
    @Field(type => Float)
    readonly customerTypeId: number;

    @Field()
    readonly numberDocument: string;

    @Field()
    readonly bussinessName: string;

    @Field()
    readonly name: string;

    @Field()
    readonly lastname: string;
}