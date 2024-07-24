import ReactDOM from 'react-dom/client';
import './styles/index.css';
import Routers from './routers';
/**
 * 브라우저 높이를 이용하기 위해 css 변수를 만들어준다.
 */
const setVh = () => {
    const vh = innerHeight;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    document.documentElement.style.setProperty('--vhnum', `${vh}`);
};
setVh();
window.addEventListener('resize', setVh);

ReactDOM.createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
    <Routers />
    // </React.StrictMode>
);
