import { useContext, createContext } from "react";

export const ThemeContext = createContext({
    themeMode: "light",
    darkTheme: () => { },
    lightTheme: () => { },
})

// export const PopupContext = createContext({
//     popupSate: false,
//     closePopup: () => { },
//     openPopup: () => { },
// })

export const ThemeProvider = ThemeContext.Provider

// export const PopupProvider = PopupContext.Provider


export default function useTheme() {
    return useContext(ThemeContext);
}

// export function usePopup() {
//     return useContext(PopupContext);
// }