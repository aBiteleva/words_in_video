import {$api} from "@/shared/api";
import {RequestTopWordsType} from "@/entities/topWords/types";

export const getTopVideoWordsApi = (requestData: RequestTopWordsType) => {
    return $api.post(`/videoWords/top`, requestData);
};
