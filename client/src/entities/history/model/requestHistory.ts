import {combine, createEffect, createStore} from "effector";
import {WordsType} from "@/shared/types/WordsType";
import {RequestHistoryResponseType, RequestHistoryType} from "../types";
import {getRequestHistoryApi} from "../api";
import {errorHandler} from "@/shared/lib/error-utils";

export const getRequestHistory = createEffect<RequestHistoryType, RequestHistoryResponseType[]>(
    {
        handler: async (requestData) => {
            try {
                const response = await getRequestHistoryApi(requestData);
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return response?.data;
            } catch (error) {
                errorHandler(error);
                throw new Error(String(error));
            }
        }
    }
);

export const $requestHistory = createStore<RequestHistoryResponseType[]>([])
    .on(getRequestHistory.doneData, (_, data) => data);

const $fetchRequestHistoryError = createStore<Error | null>(null);
$fetchRequestHistoryError
    .on(getRequestHistory.fail, (_, { error }) => error);

export const $requestHistoryWithStatus = combine<WordsType<RequestHistoryResponseType[]>>({
    isLoading: getRequestHistory.pending,
    isError: $fetchRequestHistoryError,
    data: $requestHistory,
});


