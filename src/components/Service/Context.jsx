/*Функция для проверки на админа в любом месте приложения*/
import { createContext } from "react";
export const CustomContext = createContext();
export const Context = (props) => {
    return (
        <CustomContext.Provider value={props}>
            {props.children}
        </CustomContext.Provider>
    );
};
