import logoBoard from "../../assets/icon-board.svg";
import useBanner from "../../Context/Banners";
import { useAuth0 } from "@auth0/auth0-react";
function AddBoardComponet({ addNewBoardPopupSate, setAddNewBoardPopupState }) {
  let {
    isAlertVisible,
    isSuccessVisible,
    setIsAlertVisible,
    setIsSuccessVisible,
    setAlertMessage,
    alertMessage,
    setSuccessMessage,
    successMessage,
  } = useBanner();
  const { user, isAuthenticated } = useAuth0();
  const setAddState = (e) => {
    e.preventDefault();
    if (user && isAuthenticated) {
      setAddNewBoardPopupState(!addNewBoardPopupSate);
    } else {
      alertMessage = "Please login to craete a new board !!";
      setAlertMessage(alertMessage);
      setIsAlertVisible(!isAlertVisible);
      setTimeout(() => {
        setIsAlertVisible((isAlertVisible = false));
      }, 2000);
    }
  };

  return (
    <>
      <div className="flex p-2 items-center pl-6">
        <img className="mr-2 w-4 h-4" src={logoBoard} alt="" />
        <button onClick={setAddState}>
          <p className="  text-darkPurpel "> + Create new board</p>
        </button>
      </div>
    </>
  );
}

export default AddBoardComponet;
