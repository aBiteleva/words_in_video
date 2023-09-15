import {useEffect} from 'react';
import styles from './styles.module.scss';
import {useStore} from "effector-react";
import {WordsType} from "@/shared/types/WordsType";
import {HistoryCard, requestHistoryModel, requestHistoryTypes} from "@/entities/history";

const HistoryPage = () => {
    const {data: requests, isLoading} = useStore<WordsType<requestHistoryTypes.RequestHistoryResponseType[]>>(requestHistoryModel.$requestHistoryWithStatus);

    useEffect(() => {
        void requestHistoryModel.getRequestHistory({limit: 10, value: 5});
    }, []);

    return (
        <>
            <h2>История запросов</h2>
            {isLoading
                ? <h2>Загрузка...</h2>
                : <div className={styles.historyPage}>
                    {requests?.map((request: requestHistoryTypes.RequestHistoryResponseType, index: number) => (
                        <HistoryCard key={index} request={request} index={index}/>
                    ))}
                </div>
            }
        </>
    );
};

export default HistoryPage;
