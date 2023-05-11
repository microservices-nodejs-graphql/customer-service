import { Field, Float, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateCustomerInputType {
    @Field(type => Float)
    readonly id: number;
    
    @Field(type => Float)
    readonly customerTypeId: number;

    @Field()
    readonly numberDocument: string;

    @Field({nullable: true})
    readonly bussinessName: string;

    @Field({nullable: true})
    readonly name: string;

    @Field({nullable: true})
    readonly lastname: string;
}