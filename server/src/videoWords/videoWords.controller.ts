import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { VideoWordsService } from './videoWords.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VideoWordsModel } from './models/videoWordsModel';
import { FilterDto } from './dto/filter.dto';
import { HistoryDto } from './dto/history.dto';
import { TopWordsDto } from './dto/top.dto';

@ApiTags('/videoWords')
@Controller('videoWords')
export class VideoWordsController {
    constructor(private videoWordsService: VideoWordsService) {}

    @ApiOperation({ summary: 'Получение истории запросов' })
    @ApiResponse({ status: 200, type: [VideoWordsModel] })
    @Post('/history')
    getRequestHistory(@Body() historyDto: HistoryDto) {
        return this.videoWordsService.getRequestHistory(historyDto);
    }

    @ApiOperation({ summary: 'Получение топа слов' })
    @ApiResponse({ status: 200, type: [VideoWordsModel] })
    @Post('/top')
    async getTopVideoWords(@Body() topWordsDto: TopWordsDto) {
        const words = await this.videoWordsService.getTopVideoWords(topWordsDto);
        return words;
    }

    @ApiOperation({ summary: 'Получение слов субтитров по фильтру' })
    @ApiResponse({ status: 200, type: [VideoWordsModel] })
    @Post('/filters')
    getVideoWordsWithFilters(@Body() filterDto: FilterDto) {
        return this.videoWordsService.getVideoWordsWithFilters(filterDto);
    }

    @ApiOperation({ summary: 'Удаление всех сохранённых слов' })
    @ApiResponse({ status: 200 })
    @Delete()
    async removeAllVideoWords() {
        await this.videoWordsService.removeAllVideoWords();
        return null;
    }

    @ApiOperation({ summary: 'Получение всех сохранённых слов' })
    @ApiResponse({ status: 200, type: [VideoWordsModel] })
    @Get()
    async getAllVideoWords() {
        const words = await this.videoWordsService.getAllVideoWords();
        return words;
    }
}
