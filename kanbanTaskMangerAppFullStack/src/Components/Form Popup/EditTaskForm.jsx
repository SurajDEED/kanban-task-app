/* eslint-disable react/prop-types */
import iconCross from "../../assets/icon-cross.svg";

function EditTaskForm({ setAddPopupSate, addPopupState }) {
  const closeAddForm = (e) => {
    e.preventDefault();
    setAddPopupSate(!addPopupState);
    console.log("The button was clicked");
  };
  return (
    <>
      <div className="fixed z-[100] inset-0 bg-black bg-opacity-50 justify-center flex w-[100%] flex-col items-center ">
        <div className="relative max-w-[80%] m-4 bg-white  p-[30px]">
          <h2 className="items-start text-2xl pb-4">Edit Task</h2>
          <div className="hide-scrollbar w-[400px] h-[400px] overflow-y-scroll ">
            <form action="">
              <div>
                <label htmlFor="">Title</label>
                <div className="mt-2 mb-3 ">
                  <input
                    className="h-[40px] w-full outline-none border-2 p-2 border-gray-200  rounded-lg "
                    placeholder="e.g. Take coffee break"
                    type="text"
                    name=""
                    id=""
                  />
                </div>
              </div>

              <div>
                <label htmlFor="">Description</label>
                <div className="mt-2 mb-3">
                  <textarea
                    className="w-full resize-none outline-none border-2 p-2 border-gray-200  rounded-lg "
                    rows="5"
                    name=""
                    placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little "
                    id=""
                  ></textarea>
                </div>
              </div>

              <div className=" mb-3">
                <label htmlFor="">Subtasks</label>
                <div className="flex flex-col mb-2 mt-3">
                  <div className="flex flex-col gap-2 ">
                    <div className="flex items-center">
                      <input
                        className="w-[90%] h-[40px]  outline-none border-2 p-2 border-gray-200  rounded-lg mb-2 "
                        placeholder="e.g. Make Coffee"
                        type="text"
                      />
                      <button>
                        <img className="h-5 w-5  ml-3" src={iconCross} alt="" />
                      </button>
                    </div>

                    <div className="flex items-center">
                      <input
                        className="w-[90%] h-[40px] outline-none border-2 p-2 border-gray-200  rounded-lg mb-2 "
                        type="text"
                        placeholder="e.g. Drink coffee and smile"
                      />
                      <button>
                        <img className="h-5 w-5  ml-3" src={iconCross} alt="" />
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <button className="w-full p-2 rounded-full bg-lightPurpel text-darkPurpel">
                    + Add a new subtask
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="">Status</label>
                <div className="mb-4">
                  <select
                    className="w-full h-[40px] border-2 p-2 border-gray-200  outline-none "
                    name=""
                    id=""
                  >
                    <option value="statusFirst" selected>
                      What is the status ??
                    </option>
                    <option value="">Todo</option>
                    <option value="">Doing</option>
                    <option value="">Completed</option>
                  </select>
                </div>
              </div>

              <div>
                <button className="w-full p-2 rounded-full bg-darkPurpel text-white">
                  Update Task
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditTaskForm;
