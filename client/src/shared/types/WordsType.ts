import {Store} from "effector";

export type WordsType<T> = {
    isLoading: boolean;
    data: T;
    isError: Store<Error | null>;
};
