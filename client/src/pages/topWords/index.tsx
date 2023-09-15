import {useEffect, useMemo} from 'react';
import {useStore} from "effector-react";
import {topWordsModel} from "@/entities/topWords";
import {ColumnType, WordsType} from "@/shared/types";
import {VideoWordsType} from "@/shared/types";
import {TableView} from "@/shared/ui";

const TopWordsPage = () => {
    const {data: topWords, isLoading} = useStore<WordsType<VideoWordsType[]>>(topWordsModel.$topWordsWithStatus);

    useEffect(() => {
        void topWordsModel.getTopWords({minValue: 5});
    }, []);

    const russianWords = useMemo(() => {
        return topWords.filter(word => word.lang === "ru");
    }, [topWords]);

    const englishWords = useMemo(() => {
        return topWords.filter(word => word.lang === "en");
    }, [topWords]);

    interface TopWordsData {
        russianWords: VideoWordsType[],
        englishWords: VideoWordsType[]
    }

    const data: TopWordsData[] = [
        {
            russianWords,
            englishWords
        }
    ];

    const columns: Array<ColumnType<TopWordsData, keyof TopWordsData>> = [
        {
            key: 'russianWords',
            header: 'Русские слова',
            customRender: (record: VideoWordsType) => <>{`${record.word} – ${record.countNumber}`}</>
        },
        {
            key: 'englishWords',
            header: 'Английские слова',
            customRender: (record: VideoWordsType) => <>{`${record.word} – ${record.countNumber}`}</>
        }
    ];

    return (
        <>
            <h2>Топ слов за всё время</h2>
            {isLoading
                ? <h2>Загрузка...</h2>
                : <TableView columns={columns} data={data}/>
            }
        </>
    );
};

export default TopWordsPage;
