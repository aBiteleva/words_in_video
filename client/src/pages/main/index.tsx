import {VideoWordsInput} from "@/features/video-words-search";

const MainPage = () => {
    return (
        <>
            <h2>Получение часто и редко встречающихся слов в видео</h2>
            <VideoWordsInput/>
        </>
    );
};

export default MainPage;
