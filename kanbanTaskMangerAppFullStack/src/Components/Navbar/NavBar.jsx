/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import iconAddNew from "../../assets/icon-add-task-mobile.svg";
import iconVe from "../../assets/icon-vertical-ellipsis.svg";
import ImageComponent from "./ImageComponent";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import useBoardId from "../../Context/BoardContext";
import Delete from "../Form Popup/Delete";
import DeleteBoard from "../Form Popup/DeleteBoard";
import useBanner from "../../Context/Banners";

function NavBar({
  editBoardPopupSate,
  setEditBoardPopupState,
  toggleDropDown,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { selectedBoardId, setSelectedBoardId, boardName, setBoardName } =
    useBoardId();
  const { loginWithRedirect, user, isAuthenticated, logout, isLoading } =
    useAuth0();
  let {
    isSuccessVisible,
    isAlertVisible,
    alertMessage,
    successMessage,
    setAlertMessage,
    setSuccessMessage,
    setIsAlertVisible,
    setIsSuccessVisible,
  } = useBanner();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openEditBoard = (e) => {
    e.preventDefault();
    setEditBoardPopupState(!editBoardPopupSate);
  };
  const handleDeleteClick = () => {
    if (selectedBoardId !== null) {
      setShowDeleteModal(true);
    } else {
      alertMessage = "Please select a board you want to delete !!";
      setAlertMessage(alertMessage);
      setIsAlertVisible(!isAlertVisible);
      setTimeout(() => {
        setIsAlertVisible((isAlertVisible = false));
      }, 2000);
    }
  };
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  useEffect(() => {
    const saveToDb = async () => {
      if (isAuthenticated && user) {
        try {
          const { sub, email } = user;
          await axios.post(import.meta.env.VITE_BACKEND_URL + "/saveData", {
            auth0Id: sub,
            email,
          });
        } catch (e) {
          console.log("Error" + e);
        }
      }
    };
    saveToDb();
  }, [isAuthenticated, user]);
  return (
    <>
      {showDeleteModal && (
        <DeleteBoard handleCancelDelete={handleCancelDelete} />
      )}
      <div className="fixed z-[10] bg-white dark:bg-lightBlack2 flex justify-between w-full p-3">
        <ImageComponent toggleDropDown={toggleDropDown} />

        <div className="flex items-center  ">
          {isAuthenticated ? (
            <>
              {/* <div className="mr-5 text-white hover:text-black xs:hidden sm:hidden md:block">
                <button
                  onClick={() =>
                    logout({
                      logoutParams: { returnTo: window.location.origin },
                    })
                  }
                  className="flex bg-darkPurpel hover:border-2  hover:bg-white hover:border-purple-500 transition items-center p-3 rounded-xl"
                >
                  <p className="pl-2 pr-2  ">Logout</p>
                </button>
              </div> */}

              <div className="mr-3 w-[30px]">
                <button onClick={toggleMenu}>
                  <img src={iconVe} alt="" />
                </button>
                {isMenuOpen && (
                  <div className="absolute w-[160px] right-[1%] top-[100px] bg-white dark:bg-lightBlack1 rounded-xl flex flex-col p-4 shadow-[0_4px_10px_rgba(0,0,0,0.2)] dark:shadow-[0_4px_10px_rgba(255,255,255,0.5)] items-center ">
                    <button onClick={openEditBoard}>
                      <p className="text-gray-500 pb-3">Edit Board</p>
                    </button>
                    <button onClick={handleDeleteClick}>
                      <p className="text-red-500">Delete Board</p>
                    </button>
                    <button
                  onClick={() =>
                    logout({
                      logoutParams: { returnTo: window.location.origin },
                    })
                  }
                  className="flex bg-darkPurpel hover:border-2 text-white hover:text-black mt-3 hover:bg-white hover:border-purple-500 transition items-center p-3 rounded-lg"
                >
                  <p className="pl-2 pr-2  ">Logout</p>
                </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="mr-5 text-white hover:text-black ">
                <button
                  onClick={() => loginWithRedirect()}
                  className="flex bg-darkPurpel hover:border-2 w-full hover:bg-white hover:border-purple-500 transition items-center p-3 rounded-xl"
                >
                  <p className="pl-2 pr-2  ">Login</p>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default NavBar;
