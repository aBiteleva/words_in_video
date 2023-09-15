export type LangType = 'ru' | 'en';

export interface IVideoWords {
    videoId: string;
    word: string;
    countNumber: number;
    requestDate: Date;
    lang: LangType;
}
