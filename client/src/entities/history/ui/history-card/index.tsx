import styles from "./styles.module.scss";
import {HistoryCardType} from "@/entities/history/types";
import {useNavigate} from "react-router-dom";

export const HistoryCard = ({request, index}: HistoryCardType) => {
    const navigation = useNavigate();

    return <div className={styles.historyCard}>
        <h4>
            {Number(index) + 1}. <a href={request.videoLink} target="_blank" rel="noreferrer">{request.videoLink}</a>
        </h4>
        <div className={styles.historyCard__topWords}>
            <b>Топ-слова: </b>
            {request.topWords?.map(
                (word: string, index: number) => `${word}${index === request.topWords.length - 1 ? '.' : ', '}`
            )}
        </div>
        <a
            className={styles.showAllWords}
            onClick={() => navigation({pathname: '/videoWords', search: `?videoLink=${request.videoLink}`})}
        >
            Посмотреть все слова
        </a>
    </div>;
};
