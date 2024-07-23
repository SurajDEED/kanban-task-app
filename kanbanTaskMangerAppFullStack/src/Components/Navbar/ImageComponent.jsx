import logoDark from "../../assets/logo-dark.svg";
import logoDown from "../../assets/icon-chevron-down.svg";
import logoUp from "../../assets/icon-chevron-up.svg";
import logoMobile from "../../assets/logo-mobile.svg";
import useBoardId from "../../Context/BoardContext";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
function ImageComponent({ toggleDropDown }) {
  let { user } = useAuth0();
  const { selectedBoardId, setSelectedBoardId, boardName, setBoardName } =
    useBoardId();

  return (
    <>
      <div className="pb-4 flex items-center ">
        <img
          className="p-3 w-[180px] lg:block  md:hidden sm:hidden xs:hidden "
          src={logoDark}
          alt=""
        />
        <img className="p-3 lg:hidden" src={logoMobile} alt="" />
        <div>
          <h2 className="lg:text-2xl xs:w-[90%] md:w-full break-words overflow-hidden ml-[20px] md:text-lg xs:text-sm dark:text-customWhite">
            {boardName}
          </h2>
        </div>
        {user && (
          <button
            onClick={toggleDropDown}
            className=" ml-[10px] mr-[10px] lg:hidden"
          >
            <img className="p-3" src={logoDown} alt="" />
          </button>
        )}
      </div>
    </>
  );
}

export default ImageComponent;
