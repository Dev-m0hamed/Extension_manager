function FilterButton({value, filter, setFilter}) {
  return (
    <button
      className={`bg-neutral-0 dark:bg-neutral-700 py-2 px-5 rounded-[20px] outline-2 outline-transparent focus:outline-red-400 shadow-sm hover:opacity-60 cursor-pointer transition-all duration-300 ${
        filter === value &&
        "bg-red-700 dark:bg-red-500 text-neutral-0 dark:text-neutral-900 hover:opacity-80"
      }`}
      onClick={() => setFilter(value)}
    >
      {value}
    </button>
  );
}

export default FilterButton;
