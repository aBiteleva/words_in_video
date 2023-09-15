import {RequestHistoryType} from "./types";
import {$api} from "@/shared/api";
import {errorHandler} from "@/shared/lib/error-utils";

export const getRequestHistoryApi = (requestData: RequestHistoryType) => {
    try {
        return $api.post(`/videoWords/history`, requestData);
    } catch (error) {
        errorHandler(error);
    }
};
