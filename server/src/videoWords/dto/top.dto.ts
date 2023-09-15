import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class TopWordsDto {
    @ApiProperty({ example: '5', description: 'Значение фильтра' })
    @IsNotEmpty()
    minValue: number;
}
