import {combine, createEffect, createStore} from "effector";
import {VideoWordsType} from "@/shared/types";
import {errorHandler} from "@/shared/lib/error-utils";
import {WordsType} from "@/shared/types";
import {getTopVideoWordsApi} from "../api";
import {RequestTopWordsType} from "@/entities/topWords/types";

export const getTopWords = createEffect<RequestTopWordsType, VideoWordsType[]>({
        handler: async (minValue) => {
            try {
                const response = await getTopVideoWordsApi(minValue);
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return response?.data;
            } catch (error) {
                errorHandler(error);
                throw new Error(String(error));
            }
        }
    }
);

export const $topWords = createStore<VideoWordsType[]>([])
    .on(getTopWords.doneData, (_, data) => data);

const $fetchTopWordsError = createStore<Error | null>(null);
$fetchTopWordsError
    .on(getTopWords.fail, (_, { error }) => error)
    .reset(getTopWords.done);

export const $topWordsWithStatus = combine<WordsType<VideoWordsType[]>>({
    isLoading: getTopWords.pending,
    isError: $fetchTopWordsError,
    data: $topWords,
});


