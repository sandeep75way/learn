import { PropsWithChildren, createContext, useState } from "react";

type Theme = 'dark' | 'light';

type AppConfig = {
    theme: Theme
    changeTheme: (value: Theme) => void;
};

export const Context = createContext<AppConfig>({ theme: 'light', changeTheme: () => { } });

function AppProvider(props: PropsWithChildren) {

    const [theme, setTheme] = useState<Theme>('light');

    const changeTheme = (value: Theme) => {
        setTheme(value);
    }

    return <Context.Provider value={{ theme: theme, changeTheme }}>
        {props.children}
    </Context.Provider>
}

export default AppProvider;