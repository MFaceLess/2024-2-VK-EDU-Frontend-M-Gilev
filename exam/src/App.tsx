import { HashRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { MainPage } from "./pages/MainPage";
import { Provider } from "react-redux";
import store from "./redux/store";
import { HistoryPage } from "./pages/HistoryPage";


function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <ToastContainer />

        <Routes>
          <Route path='/'         element={<MainPage />} />
          <Route path='/history'  element={<HistoryPage />} />
        </Routes>
      </HashRouter>
    </Provider>
  );
}

export default App
