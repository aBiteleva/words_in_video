import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export type FilterNameTypes = 'more' | 'less';

export class FilterDto {
    @ApiProperty({ example: 'more', description: 'Название фильтра' })
    @IsNotEmpty()
    filter: FilterNameTypes;

    @ApiProperty({ example: '5', description: 'Значение фильтра' })
    @IsNotEmpty()
    value: number;
}
