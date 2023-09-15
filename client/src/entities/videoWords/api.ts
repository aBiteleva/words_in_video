import {$api} from "@/shared/api";
import {RequestVideoWordsFilterType} from "./types/RequestVideoWordsFilterType";

export const getVideoSubtitlesWithFilters = (requestData: RequestVideoWordsFilterType) => {
    return $api.post(`/videoWords/filters`, requestData);
};
