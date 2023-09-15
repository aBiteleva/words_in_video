import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class HistoryDto {
    @ApiProperty({ example: '10', description: 'Количество записей' })
    @IsNotEmpty()
    limit: number;

    @ApiProperty({ example: '5', description: 'Значение фильтра для топ-слов' })
    @IsNotEmpty()
    value: number;
}
