import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
//Импорт стилей
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')!).render(
    <App />,
)
