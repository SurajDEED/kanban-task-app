/* eslint-disable react/prop-types */
import logoHide from "../../assets/icon-hide-sidebar.svg";
function HideSideBarComponent({ toggleSidebar}) {
  return (
    <>
      <div className="ml-3 flex items-center p-4">
        <div className="pr-3">
          <button onClick={toggleSidebar}>
            <img src={logoHide} alt="" className="" />
          </button>
        </div>
        <div className="dark:text-customWhite" >
          <p>Hide sidebar</p>
        </div>
      </div>
    </>
  );
}

export default HideSideBarComponent;
