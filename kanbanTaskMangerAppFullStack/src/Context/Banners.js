import { useContext, createContext } from "react";

export const BannerContext = createContext({
    isAlertVisible: false,
    isSuccessVisible: false,
    alertMessage: "",
    successMessage: "",
    setIsAlertVisible: () => { },
    setIsSuccessVisible: () => { },
    setAlertMessage: () => { },
    setSuccessMessage: () => { },

})

export const BannerProvider = BannerContext.Provider;

export default function useBanner() {
    return useContext(BannerContext);
}