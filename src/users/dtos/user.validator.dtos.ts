import { ParseBoolPipe } from "@nestjs/common";
import { Transform, Type } from "class-transformer";
import { IsBoolean, IsIn, IsInt, IsNumber, IsString } from "class-validator";

const { IsOptional } = require("class-validator");

export class GetUserQueryDto {
    @IsOptional()
    @IsString()
    @Type(() => String)
    sortDesc: String;
}