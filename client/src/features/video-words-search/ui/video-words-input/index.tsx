import styles from "./styles.module.scss";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export const VideoWordsInput = () => {
    const [videoLink, setVideoLink] = useState<string>();
    const [errorMessage, setErrorMessage] = useState<string>();
    const navigate = useNavigate();

    const onClickNext = () => {
        const urlReg = /(https?:\/\/(www\.)?youtu\.?be(\.com)?\/(watch\?v=)?[a-zA-Z0-9_-]{11})/;

        if(!videoLink?.match(urlReg)){
            setErrorMessage('Введите корректную ссылку');
        } else {
            setErrorMessage('');
            navigate({pathname: 'videoWords', search: `?videoLink=${videoLink}`});
        }
    };

    const onChangeInput = (value: string) => {
        setVideoLink(value);
        if(value === '') {
            setErrorMessage('');
        }
    };

    return <div className={styles.inputContainer}>
        <input
            className={styles.inputContainer__input}
            type="text"
            onChange={(e) => {
                onChangeInput(e.target.value);
            }}
        />
        <div className={styles.inputContainer__error}>{errorMessage}</div>
        <button className={styles.inputContainer__button} onClick={onClickNext}>Далее</button>
    </div>;
};
