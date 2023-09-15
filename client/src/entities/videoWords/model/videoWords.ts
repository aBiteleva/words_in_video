import {combine, createEffect, createStore} from "effector";
import {VideoWordsType} from "@/shared/types";
import {getVideoSubtitlesWithFilters} from "../api";
import {errorHandler} from "@/shared/lib/error-utils";
import {VideoWordsModelType} from "@/entities/videoWords/types";
import {RequestVideoWordsFilterType} from "@/entities/videoWords/types/RequestVideoWordsFilterType";

export const getPopularWords = createEffect<RequestVideoWordsFilterType, VideoWordsType[]>({
    handler: async (requestData) => {
        try {
            const response = await getVideoSubtitlesWithFilters(requestData);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return response?.data;
        } catch (error) {
            errorHandler(error);
            throw new Error(String(error));
        }
    }
});

export const getUnpopularWords = createEffect<RequestVideoWordsFilterType, VideoWordsType[]>({
    handler: async (requestData) => {
        try {
            const response = await getVideoSubtitlesWithFilters(requestData);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return response?.data;
        } catch (error) {
            errorHandler(error);
            throw new Error(String(error));
        }
    }
});

export const $popularWords = createStore<VideoWordsType[]>([])
    .on(getPopularWords.doneData, (_, data) => data);

export const $unpopularWords = createStore<VideoWordsType[]>([])
    .on(getUnpopularWords.doneData, (_, data) => data);

const $fetchPopularWordsError = createStore<Error | null>(null);
$fetchPopularWordsError.on(getPopularWords.fail, (_, { error }) => error)
    .reset(getPopularWords.done);

const $fetchUnpopularWordsError = createStore<Error | null>(null);
$fetchPopularWordsError.on(getUnpopularWords.fail, (_, { error }) => error)
    .reset(getUnpopularWords.done);

export const $videoWordsWithStatus = combine<VideoWordsModelType>({
    isLoading: getPopularWords.pending || getUnpopularWords.pending,
    isError: $fetchPopularWordsError || $fetchUnpopularWordsError,
    popularWords: $popularWords,
    unpopularWords: $unpopularWords
});


