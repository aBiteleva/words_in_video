import {useEffect} from 'react';
import {useStore} from "effector-react";
import {useLocation} from "react-router-dom";
import {videoWordsModel, videoWordsTypes} from "@/entities/videoWords";
import {ColumnType, VideoWordsType} from "@/shared/types";
import {TableView} from "@/shared/ui";

const VideoWordsPage = () => {
    const location = useLocation();
    const videoLink = new URLSearchParams(location.search).get('videoLink') ?? undefined;
    const videoId = videoLink?.match(/\/(?:watch\?v=)?([a-zA-Z0-9_-]{11})/)?.[1];

    const {
        popularWords,
        unpopularWords,
        isLoading,
        isError,
    } = useStore<videoWordsTypes.VideoWordsModelType>(videoWordsModel.$videoWordsWithStatus);

    useEffect(() => {
        const fetchWords = async () => {
            await videoWordsModel.getPopularWords({videoId, videoLink, filter: "more", value: 5});
            await videoWordsModel.getUnpopularWords({videoId, videoLink, filter: "less", value: 5});
        };

        if(videoId){
            void fetchWords();
        }
    }, [videoLink, videoId]);

    if (isError) {
        return <h2>Ошибка получения данных :(</h2>;
    }

    interface VideoWordsData {
        popularWords: VideoWordsType[],
        unpopularWords: VideoWordsType[]
    }

    const data: VideoWordsData[] = [
        {
            popularWords,
            unpopularWords
        }
    ];

    const columns: Array<ColumnType<VideoWordsData, keyof VideoWordsData>> = [
        {
            key: 'popularWords',
            header: 'более 5 раз',
            customRender: (record: VideoWordsType) => <>{`${record.word}`}</>
        },
        {
            key: 'unpopularWords',
            header: 'менее 5 раз',
            customRender: (record: VideoWordsType) => <>{`${record.word}`}</>
        }
    ];

    return (
        <>
            <h2>Часто и редко встречающиеся слова в видео
                <br/>
                <a href={videoLink} target="_blank" rel="noreferrer">{videoLink}</a>
            </h2>
            {isLoading
                ? <h2>Загрузка...</h2>
                : <TableView columns={columns} data={data}/>}
        </>
    );
};

export default VideoWordsPage;
