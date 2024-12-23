import { useEffect, useState } from "react";

import historyLogo from '/history.svg';
import './index.css';
import { TranslateHeader } from "../../components/langPanel";

import TranslateUtils from "../../utils";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { addToHistory, setInitString, setResString } from "../../redux/slices/langSlice";
import { useNavigate } from "react-router-dom";

export const MainPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const [inputText, setInputText] = useState('');
    const [translatedText, setTranslatedText] = useState('');

    const sourceLang = useSelector((state: RootState) => state.chat.sourceLang);
    const targetLang = useSelector((state: RootState) => state.chat.targetLang);
    const history = useSelector((state: RootState) => state.chat.history);

    // const check = useSelector((state: RootState) => state.chat.history);

    useEffect(() => {
        localStorage.setItem('history', JSON.stringify(history));
    }, [history])

    const handleTranslate = async () => {
        dispatch(setInitString(inputText));
        const result = await TranslateUtils.translate(inputText, sourceLang, targetLang);
        dispatch(setResString(result));
        setTranslatedText(`${result}`);
        dispatch(addToHistory());
    };

    const handleNavigateToHistory = () => {
        navigate('/history');
    }

    return (
        <div className="container mt-5">
            <button className="btn btn-primary mb-3" onClick={handleNavigateToHistory}>
                <img src={historyLogo} />
            </button>
            <TranslateHeader />
            <div className="row">
                <div className="col-md-6">
                    <textarea
                        className="form-control no-resize"
                        rows={5}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Введите текст для перевода..."
                    ></textarea>
                </div>

                <div className="col-md-6">
                    <textarea
                        className="form-control no-resize"
                        rows={5}
                        value={translatedText || 'Translated Text'}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Введите текст для перевода..."
                        disabled={true}
                    ></textarea>
                </div>
            </div>
            <div className="d-flex justify-content-center mt-3">
                <button
                    className="btn btn-primary"
                    onClick={handleTranslate}
                >
                    Перевести
                </button>
            </div>
        </div>
    );
}