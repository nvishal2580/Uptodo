import React, { useState } from "react";
import FilterList from "./FilterList";

function DropdownButton({ data, setData, dataList, handleAddLabel,extraAdd }) {
  const [showDropdown, setSHowDropdown] = useState(false);

  return (
    <div>
        <button onClick={() => setSHowDropdown(!showDropdown)} className="text-gray-400 px-2 rounded-md hover:bg-gray-100">Add</button>
      <div
        className={`absolute z-40 bg-white transition-all duration-300 max-w-[200px]  overflow-hidden overflow-x-hidden rounded-md hover:overflow-y-auto ${
          showDropdown === true
            ? "h-32 ease-in border-[1px] border-gray-300"
            : "h-0 ease-out"
        }`}
      >
        {/* className={`${showLabel === "label" ? "" : "hidden"} max-w-[200px]  border-[1px] cursor-pointer transition-all border-slate-400 rounded overflow-y-auto max-h-32`}> */}
        <FilterList
          labels={data}
          setLabels={setData}
          data={dataList}
          selectMultiple={true}
          handleAddLabel={handleAddLabel}
          extraAdd={extraAdd}
        />
      </div>
    </div>
  );
}

export default DropdownButton;
