type FilterNameType = "more" | "less"

export type RequestVideoWordsFilterType = {
    videoId?: string,
    videoLink?: string,
    filter?: FilterNameType,
    value?: number
}
