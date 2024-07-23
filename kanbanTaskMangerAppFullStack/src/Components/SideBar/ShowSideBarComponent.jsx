/* eslint-disable react/prop-types */
import logoShow from "../../assets/icon-show-sidebar.svg";
function ShowSideBarComponent({ toggleSidebar }) {
  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-[90%] left-0 transform -translate-y-1/2 p-4 bg-darkPurpel rounded-r-full flex justify-end w-[50px]"
      >
        <img src={logoShow} alt="Show Sidebar" />
      </button>
    </>
  );
}

export default ShowSideBarComponent;
