"use client";

import { useState } from "react";

const getCols = (length: number) => {
  const array = Array.from({ length }, (_, i) => ({ name: `column #${i}` }));
  return array;
};

function Grid() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [columns, setColumns] = useState<number>(6)
  
  const cols = getCols(columns);

  const toggleGrid = () => {
    setIsVisible(!isVisible);
  };

  const changeColumns = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value)
    setColumns(value)
  }

  const gridClasses = `
    ${isVisible ? "grid" : "hidden"} 
    z-30 fixed top-0 right-0 bottom-0 left-0 0 
    grid-cols-${cols.length} 
    px-sm gap-sm
  `;

  return (
    <article className="flex">
      <div className={gridClasses}>
        {cols.map((col) => {
          return <div key={col.name} className="bg-gray-400 opacity-30"></div>;
        })}
      </div>

      <div className="z-40 flex absolute bottom-0 left-2/4 -translate-x-2/4 bg-white p-4 gap-2 rounded-2 opacity-80 hover:opacity-100">
        <label htmlFor="grid">Show grid</label>
        <input
          type="checkbox"
          name="grid"
          id="grid-toggler"
          onChange={toggleGrid}
        />
        <label htmlFor="columns">Columns</label>
        <select name="columns" onChange={(e) => {changeColumns(e)}}>
          <option value="6">6</option>
          <option value="12">12</option>
        </select>
      </div>
    </article>
  );
}

export default Grid;
