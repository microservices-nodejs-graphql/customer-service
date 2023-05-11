import { Field, Float, InputType } from "@nestjs/graphql";
import { PaginationInputType } from "./pagination.input-type";

@InputType()
export class CustomerFilterInputType extends PaginationInputType {
    @Field(type => Float, {nullable: true})
    readonly id: number;

    @Field({nullable: true})
    readonly customerTypeId: number;

    @Field({nullable: true})
    readonly numberDocument: string;

    @Field({nullable: true})
    readonly bussinessName: string;

    @Field({nullable: true})
    readonly name: string;

    @Field({nullable: true})
    readonly lastname: string;
}