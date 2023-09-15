import styles from "./styles.module.scss";
import {useNavigate, useLocation} from 'react-router-dom';
import {useEffect, useState} from "react";
import {navigateTabs} from "../constants";

const NavigateBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState<string>();

    useEffect(() => {
        setActiveTab(location.pathname);
    }, [location.pathname]);

    return (
        <div className={styles.navigateBar}>
            {navigateTabs.map(tab => (
                <div
                    key={tab.title}
                    onClick={() => navigate(tab.link)}
                    className={activeTab === tab.link ? styles.activeTab : ''}>
                    {tab.title}
                </div>
            ))}
        </div>
    );
};

export default NavigateBar;
