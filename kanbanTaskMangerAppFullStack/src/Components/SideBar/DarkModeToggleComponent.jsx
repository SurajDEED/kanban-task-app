import useTheme from "../../Context/Theme";
import iconDarkTheme from "../../assets/icon-dark-theme.svg";
import iconLightTheme from "../../assets/icon-light-theme.svg";
function DarkModeToggleComponent() {
  const { themeMode, lightTheme, darkTheme } = useTheme();
  const onChangeButton = (e) => {
    const darkModeStatus = e.currentTarget.checked;
    if (darkModeStatus) {
      darkTheme();
    } else {
      lightTheme();
    }
  };
  return (
    <>
      <div className="flex items-center p-2 ml-3 justify-around bg-lightBlueish dark:bg-lightBlack1">
        <div>
          <img src={iconLightTheme} alt="" />
        </div>
        <div>
          <label className="relative inline-flex items-center cursor-pointer ">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              onChange={onChangeButton}
              checked={themeMode === "dark"}
            />
            <div className="w-11 h-6 bg-darkPurpel peer-focus:outline-none   peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-darkPurpel peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-darkPurpel"></div>
          </label>
        </div>
        <div>
          <img src={iconDarkTheme} alt="" />
        </div>
      </div>
    </>
  );
}

export default DarkModeToggleComponent;
