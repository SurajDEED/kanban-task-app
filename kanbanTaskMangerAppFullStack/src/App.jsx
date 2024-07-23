import { useEffect, useState } from "react";
import NavBar from "./Components/Navbar/NavBar";
import BoardOutput from "./Components/Output/BoardOutput";
import SideBar from "./Components/SideBar/SideBar";
import DropDownSideBar from "./Components/SideBar/DropDownSideBar";
import ShowSideBarComponent from "./Components/SideBar/ShowSideBarComponent";
import { ThemeProvider } from "./Context/Theme";
import AddNewTaskForm from "./Components/Form Popup/AddNewTaskForm";
import EditBoardForm from "./Components/Form Popup/EditBoardForm";
import AddNewBoardForm from "./Components/Form Popup/AddNewBoardForm";
import { BoardProvider } from "./Context/BoardContext";
import { SuccessBanner } from "./Banners/SuccessBanner";
import { BannerProvider } from "./Context/Banners";
import { AlertBanner } from "./Banners/AlertBanner";
function App() {
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isDropDownSideBar, setIsDropDownSideBar] = useState(false);

  const [addPopupSate, setAddPopupState] = useState(false);
  const [editBoardPopupSate, setEditBoardPopupState] = useState(false);
  const [addNewBoardPopupSate, setAddNewBoardPopupState] = useState(false);
  const [themeMode, setThemeMode] = useState("light");
  const [selectedBoardId, setSelectedBoardId] = useState(null);

  const [boardName, setBoardName] = useState(null);

  const darkTheme = () => {
    setThemeMode("dark");
  };

  const lightTheme = () => {
    setThemeMode("light");
  };

  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const toggleDropDown = () => {
    setIsDropDownSideBar(!isDropDownSideBar);
  };

  return (
    <>
      <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
        <BannerProvider
          value={{
            isAlertVisible,
            isSuccessVisible,
            setIsAlertVisible,
            setIsSuccessVisible,
            alertMessage,
            successMessage,
            setAlertMessage,
            setSuccessMessage,
          }}
        >
          <BoardProvider
            value={{
              selectedBoardId,
              boardName,
              setSelectedBoardId,
              setBoardName,
            }}
          >
            {isSuccessVisible && (
              <SuccessBanner successMessage={successMessage} />
            )}

            {isAlertVisible && <AlertBanner alertMessage={alertMessage} />}
            {addPopupSate && (
              <AddNewTaskForm
                setAddPopupSate={setAddPopupState}
                addPopupState={addPopupSate}
              />
            )}

            {editBoardPopupSate && (
              <EditBoardForm
                editBoardPopupSate={editBoardPopupSate}
                setEditBoardPopupState={setEditBoardPopupState}
              />
            )}

            {addNewBoardPopupSate && (
              <AddNewBoardForm
                addNewBoardPopupSate={addNewBoardPopupSate}
                setAddNewBoardPopupState={setAddNewBoardPopupState}
              />
            )}

            <div className="flex-1">
              <NavBar
                editBoardPopupSate={editBoardPopupSate}
                setEditBoardPopupState={setEditBoardPopupState}
                toggleDropDown={toggleDropDown}
              />
            </div>

            {isSidebarVisible && (
              <div
                className={`xs:hidden sm:hidden md:hidden lg:block transition-width duration-300 ${
                  isSidebarVisible ? "w-[250px]" : "w-0"
                } overflow-hidden`}
              >
                <SideBar
                  toggleSidebar={toggleSidebar}
                  toggleState={isSidebarVisible}
                  isDropDownSideBar={isDropDownSideBar}
                  setIsDropDownSideBar={setIsDropDownSideBar}
                  addNewBoardPopupSate={addNewBoardPopupSate}
                  setAddNewBoardPopupState={setAddNewBoardPopupState}
                />
              </div>
            )}
            {isDropDownSideBar && (
              <div className="lg:hidden">
                <DropDownSideBar
                  addNewBoardPopupSate={addNewBoardPopupSate}
                  setAddNewBoardPopupState={setAddNewBoardPopupState}
                />
              </div>
            )}
            <div
              className={`flex ${
                isSidebarVisible ? "ml-0 lg:ml-[250px]" : "ml:[20px]"
              }
        `}
            >
              <BoardOutput
                setAddPopupSate={setAddPopupState}
                addPopupState={addPopupSate}
              />
            </div>

            {!isSidebarVisible && (
              <ShowSideBarComponent toggleSidebar={toggleSidebar} />
            )}
          </BoardProvider>
        </BannerProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
