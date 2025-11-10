import { useState, useEffect } from "react";
import FilterButton from "./FilterButton";
import data from "../../public/data.json";

function Extension() {
  const [filter, setFilter] = useState("All");
  const [extensions, setExtensions] = useState([]);

  useEffect(() => {
    setExtensions(data);
  }, []);

  const filteredExtensions =
    filter === "All"
      ? extensions
      : extensions.filter((ext) =>
          filter === "Active" ? ext.isActive : !ext.isActive
        );

  const removeExt = (name) => {
    setExtensions((prev) => prev.filter((ext) => ext.name !== name));
  };

  const toggleActive = (name) => {
    setExtensions((prev) =>
      prev.map((ext) =>
        ext.name === name ? { ...ext, isActive: !ext.isActive } : ext
      )
    );
  };
  return (
    <>
      <div className="container mx-auto mb-8 flex items-center flex-col md:flex-row md:justify-between md:py-4">
        <h1 className="text-2xl font-bold">Extensions List</h1>
        <div id="btnContainer" className="flex gap-3 mt-4 md:mt-0">
          <FilterButton value={"All"} filter={filter} setFilter={setFilter} />
          <FilterButton
            value={"Active"}
            filter={filter}
            setFilter={setFilter}
          />
          <FilterButton
            value={"Inactive"}
            filter={filter}
            setFilter={setFilter}
          />
        </div>
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pb-8">
        {filteredExtensions.map((ext) => (
          <div
            key={ext.name}
            className="shadow-sm bg-neutral-0 dark:bg-neutral-800 p-4 rounded-[20px] hover:-translate-y-1 hover:shadow-xl transition duration-300"
          >
            <div className="flex gap-3">
              <img
                src={ext.logo}
                alt={ext.name}
                className="size-[42px] md:size-[50px]"
              />
              <div className="mb-4">
                <h2 className="font-bold text-lg mb-2">{ext.name}</h2>
                <p className="text-sm leading-normal text-neutral-600 dark:text-neutral-300">
                  {ext.description}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <button
                className="border border-neutral-300 dark:border-neutral-700 outline-2 outline-transparent focus:outline-red-400 font-medium px-4 py-1 rounded-[20px] hover:bg-red-700 hover:dark:bg-red-500 hover:text-neutral-0 dark:hover:text-neutral-900 cursor-pointer transition duration-300"
                onClick={() => removeExt(ext.name)}
              >
                Remove
              </button>
              <label className="relative inline-block w-[50px] h-6">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={ext.isActive}
                  onChange={() => toggleActive(ext.name)}
                />
                <span className="absolute size-full cursor-pointer bg-neutral-300 dark:bg-neutral-700 transition duration-300 rounded-[34px] peer-checked:bg-red-700 dark:peer-checked:bg-red-400  peer-checked:before:translate-x-[26px] before:absolute before:left-1 before:bottom-1 before:size-4 before:bg-white before:rounded-full before:transition before:duration-300"></span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Extension;
