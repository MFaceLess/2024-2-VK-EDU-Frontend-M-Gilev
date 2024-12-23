import { useNavigate } from "react-router-dom";

import backLogo from '/back.svg';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { removeHistory, setHistory } from "../../redux/slices/langSlice";
import { useEffect } from "react";


export const HistoryPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const history = useSelector((state: RootState) => state.chat.history);

    const handleNavigateToMainPage = () => {
        navigate('/');
    }

    const handleClearHistory = () => {
        localStorage.clear();
        dispatch(removeHistory());
    }

    useEffect(() => {
        if (localStorage.getItem('history')) {
            const savedHistoryState = localStorage.getItem('history');
            if (savedHistoryState) {
                dispatch(setHistory(JSON.parse(savedHistoryState)));
            }
        }
    }, [])

    return (
        <div className="container mt-5">
            <button className="btn btn-primary mb-3" onClick={handleNavigateToMainPage}>
                <img src={backLogo} alt="Back" />
            </button>
            <h1 className="mb-4">История</h1>
            <button className="btn btn-danger mb-3" onClick={handleClearHistory}>
                Очистить историю
            </button>
            <ul className="list-group">
                {history.map((item, index) => (
                    <li key={index} className="list-group-item">
                        <strong>Исходный язык:</strong> {item.sourceLang}<br />
                        <strong>Целевой язык:</strong> {item.targetLang}<br />
                        <strong>Исходный текст:</strong> {item.initString}<br />
                        <strong>Переведенный текст:</strong> {item.result}
                    </li>
                ))}
            </ul>
        </div>
    );
}