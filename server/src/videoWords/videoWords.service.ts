import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { VideoWordsModel } from './models/videoWordsModel';
import { Model } from 'mongoose';
import { fetchSubtitlesTextByVideoId, getWordLang, textTokenize } from './helpers/videoWords.helper';

@Injectable()
export class VideoWordsService {
    constructor(
        @InjectModel(VideoWordsModel.name)
        private readonly videoWordsModel: Model<VideoWordsModel>,
    ) {}

    async getAllVideoWords() {
        const words = await this.videoWordsModel.find();
        return words as VideoWordsModel[];
    }

    private async createVideoWords(videoWords: string[], videoId: string, videoLink: string) {
        const requestDate = new Date();
        for (const key in videoWords) {
            const lang = getWordLang(videoWords[key]);
            const query = { videoId, word: videoWords[key] };
            const update = {
                $inc: { countNumber: 1 },
                $set: { videoId, videoLink, word: videoWords[key], requestDate, lang },
            };
            const options = { upsert: true };
            await this.videoWordsModel.updateOne(query, update, options);
        }
    }

    private async prepareVideoWordsByVideoId(videoId: string, videoLink: string) {
        const video = await this.videoWordsModel.find({ videoId });

        if (video.length < 1) {
            const videoSubtitleText = await fetchSubtitlesTextByVideoId(videoId);
            const videoWords = textTokenize(videoSubtitleText);
            await this.createVideoWords(videoWords, videoId, videoLink);
        } else {
            const requestDate = new Date();
            await this.videoWordsModel.updateMany({ videoId }, { $set: { requestDate } });
        }
    }

    async getVideoWordsWithFilters(filterDto) {
        const { videoId, videoLink, filter, value } = filterDto;
        let words = this.videoWordsModel.find();

        if (videoId) {
            await this.prepareVideoWordsByVideoId(videoId, videoLink);
            words = words.find({ videoId });
        }
        if (filter === 'more') {
            words = words.find({ countNumber: { $gt: value } });
        }
        if (filter === 'less') {
            words = words.find({ countNumber: { $lte: value } });
        }
        return words.sort({ countNumber: -1 });
    }

    async getTopVideoWords(topWordsDto) {
        const { minValue = 5 } = topWordsDto;
        return this.videoWordsModel.aggregate([
            {
                $group: {
                    _id: '$word',
                    word: { $first: '$word' },
                    lang: { $first: '$lang' },
                    countNumber: { $sum: '$countNumber' },
                    requestDate: { $first: '$requestDate' },
                    videoId: { $first: '$videoId' },
                    videoLink: { $first: '$videoLink' },
                },
            },
            {
                $match: {
                    countNumber: { $gt: minValue },
                },
            },
            {
                $sort: {
                    countNumber: -1,
                },
            },
        ]);
    }

    async getRequestHistory(historyDto) {
        const { limit = 10, value = 5 } = historyDto;
        return this.videoWordsModel.aggregate([
            {
                $group: {
                    _id: '$videoId',
                    videoId: { $first: '$videoId' },
                    requestDate: { $first: '$requestDate' },
                    videoLink: { $first: '$videoLink' },
                    topWords: {
                        $addToSet: {
                            $cond: {
                                if: {
                                    $gt: ['$countNumber', value],
                                },
                                then: '$word',
                                else: '$$REMOVE',
                            },
                        },
                    },
                },
            },
            {
                $sort: {
                    requestDate: -1,
                },
            },
            {
                $limit: limit,
            },
        ]);
    }

    async removeAllVideoWords() {
        const result = await this.videoWordsModel.deleteMany().exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException("Couldn't find video words");
        }
    }
}
