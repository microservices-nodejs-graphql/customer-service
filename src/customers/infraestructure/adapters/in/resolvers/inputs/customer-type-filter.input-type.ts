import { Field, Float, InputType } from "@nestjs/graphql";
import { PaginationInputType } from "./pagination.input-type";

@InputType()
export class CustomerTypeFilterInputType extends PaginationInputType {
    @Field(type => Float, {nullable: true})
    readonly id: number;

    @Field({nullable: true})
    readonly name: string;

    @Field({nullable: true})
    readonly description: string;
}