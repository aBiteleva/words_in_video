import {Store} from "effector";
import {VideoWordsType} from "@/shared/types";

export type VideoWordsModelType = {
    isLoading: boolean;
    popularWords: VideoWordsType[];
    unpopularWords: VideoWordsType[];
    isError: Store<Error | null>;
};
