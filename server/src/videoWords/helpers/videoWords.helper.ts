import { YoutubeTranscript } from 'youtube-transcript';
import { exceptionWords } from '../../constants/exeptionsWords';

export async function fetchSubtitlesTextByVideoId(videoId: string) {
    const transcriptArray: { text: string; duration: number; offset: number }[] =
        await YoutubeTranscript.fetchTranscript(videoId);
    return transcriptArray?.reduce((acc, currentValue) => {
        acc += `${currentValue.text} `;
        return acc;
    }, '');
}

export function textTokenize(text: string) {
    const punctuationReg = /[.,\/#!?$%\^&\*;:{}\[\]=\-_`~()0-9'"\n]/g;
    return text
        .toLowerCase()
        .replace(punctuationReg, ' ')
        .split(' ')
        .filter((ele) => ele.length > 1 && !exceptionWords.includes(ele));
}

export function getWordLang(word: string) {
    const enReg = /[a-z]/gi;
    const ruReg = /[а-я]/gi;
    if (word.match(enReg)) {
        return 'en';
    }
    if (word.match(ruReg)) {
        return 'ru';
    }
}
