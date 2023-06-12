import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { signout } from '../auth/helpers';
const events = [
    "load",
    "mousemove",
    "mousedown",
    "click",
    "scroll",
    "keypress",
];
const AppLogout = ({ children }) => {
    const navigate = useNavigate()
    let timer;

    const handleLogoutTimer = () => {
        timer = setTimeout(() => {
            resetTimer();
            Object.values(events).forEach((item) => {
                window.removeEventListener(item, resetTimer);
            });
            logoutAction();
        }, 1800000); // 10000ms = 10secs. You can change the time.
    };
    // this resets the timer if it exists.
    const resetTimer = () => {
        if (timer) clearTimeout(timer);
    };

    // each time any of the event is triggered, i.e on mouse move, click, scroll, keypress etc, the timer to logout user after 10 secs of inactivity resets.
    // However, if none of the event is triggered within 10 secs, that is app is inactive, the app automatically logs out.

    useEffect(() => {
        Object.values(events).forEach((item) => {
            window.addEventListener(item, () => {
                resetTimer();
                handleLogoutTimer();
            });
        });
    }, []);

    // logs out user by clearing out auth token in localStorage and redirecting url to /signin page.
    const logoutAction = () => {
        signout(() => {
            navigate("/");
        });
    };

    return children;
}

export default AppLogout