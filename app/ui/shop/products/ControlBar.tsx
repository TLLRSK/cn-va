"use client";
import { useFilter } from "@/app/context/filterContext";
import ButtonFilterToggler from "../../buttons/ButtonFilterToggler";
import Filter from "../../filter/Filter";

const ControlBar = () => {
  const { itemsType, filteredItems } = useFilter();
  return (
    <div id="control-bar" className="px-sm md:px-md mb-sm">
      <div className="flex items-center justify-between">
        <ButtonFilterToggler />
        <span className="text-sm text-highlight font-medium capitalize">
          {itemsType}:{" "}
          {filteredItems.length < 10
            ? "0" + filteredItems.length
            : filteredItems.length}
        </span>
      </div>
      <Filter />
    </div>
  );
};

export default ControlBar;
