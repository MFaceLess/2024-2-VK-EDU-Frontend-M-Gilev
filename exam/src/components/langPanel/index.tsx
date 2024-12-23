import { useEffect, useState } from "react";
import languagesData from './languages.json';
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { setSrcLang, setTgtLang } from "../../redux/slices/langSlice";

interface Language {
    code: string;
    name: string;
}
  
export const TranslateHeader: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [sourceLang, setSourceLang] = useState<Language>({
        code: "Autodetect",
        name: "Autodetect",
    });
    const [targetLang, setTargetLang] = useState<Language>({
        code: "ru-RU",
        name: "Russian",
    });

    useEffect(() => {
        dispatch(setSrcLang('Autodetect'));
        dispatch(setTgtLang('ru-RU'));
    }, [])

    const languages: Language[] = Object.entries(languagesData).map(
        ([code, name]) => ({ code, name })
    )

    const handleSwapLanguages = () => {
        if (sourceLang.name === "Autodetect") {
            toast.info('Смените Autodetect');
            return;
        }
        dispatch(setSrcLang(targetLang.code));
        dispatch(setTgtLang(sourceLang.code));

        setSourceLang(targetLang);
        setTargetLang(sourceLang);
    };

    const handleSourceLangChange = (lang: Language) => {
        setSourceLang(lang);
        dispatch(setSrcLang(lang.code));
    };

    const handleTargetLangChange = (lang: Language) => {
        setTargetLang(lang);
        dispatch(setTgtLang(lang.code));
    };

    return (
        <header className="d-flex align-items-center justify-content-between py-3 px-4 bg-light border-bottom">
        <div className="d-flex w-100 justify-content-between align-items-center">
          <div className="dropdown">
            <button
              className="btn btn-outline-secondary dropdown-toggle"
              type="button"
              id="sourceLangDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ width: "300px" }}
            >
              {sourceLang.name}
            </button>
            <ul className="dropdown-menu" aria-labelledby="sourceLangDropdown"
                style={{ maxHeight: "200px", overflowY: "auto" }}>
              {languages.map((lang) => (
                <li key={lang.code}>
                  <button
                    className="dropdown-item"
                    onClick={() => handleSourceLangChange(lang)}
                  >
                    {lang.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
  
          <button
            className="btn btn-outline-primary mx-2"
            onClick={handleSwapLanguages}
            style={{ width: "50px" }}
          >
            ↔
          </button>
  
          <div className="dropdown">
            <button
              className="btn btn-outline-secondary dropdown-toggle"
              type="button"
              id="targetLangDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ width: "300px" }}
            >
              {targetLang.name}
            </button>
            <ul className="dropdown-menu" aria-labelledby="targetLangDropdown"
                style={{ maxHeight: "200px", overflowY: "auto" }}>
              {languages.filter(x => x.name !== 'Autodetect').map((lang) => (
                <li key={lang.code}>
                  <button
                    className="dropdown-item"
                    onClick={() => handleTargetLangChange(lang)}
                  >
                    {lang.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>
    );
};