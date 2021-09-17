import React from "react";
import styles from "./SearchAndFilter.module.css";

const filters = [
  {
    id: "hospital-buildings",
    name: "Hopital Buildings",
  },
  {
    id: "hospital-mechanics",
    name: "Hopital Mechanics",
  },
  {
    id: "hospital-electric",
    name: "Hopital Electric",
  },
  {
    id: "hospital-environtment",
    name: "Hopital Environtment",
  },
  {
    id: "hospital-informatics",
    name: "Hopital Informatics",
  },
  {
    id: "hospital-devices",
    name: "Hopital Devices",
  },
  {
    id: "covid-19-products",
    name: "Covid-19 Products",
  },
];

export const SearchAndFilter = () => {
  return (
    <div className={styles.filter}>
      {/* Search */}
      <form className="flex items-center border-b border-gray-400">
        {/* search-exhibitor-input w-full */}
        <div className={styles.searchInput}>
          <label htmlFor="search-exhibitor" className="sr-only">
            Search Exhibitor
          </label>
          <div className="relative">
            <div
              style={{ padding: "2%" }}
              className="hidden sm:flex absolute inset-y-0 items-center pointer-events-none"
            >
              <svg
                className={styles.searchIcon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              id="search-exhibitor"
              name="search-exhibitor"
              className="block w-full border border-gray-300 rounded-l-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#00B4BF] focus:border-[#00B4BF]"
              placeholder="Search"
              type="search"
            />
          </div>
        </div>
        <button className={styles.searchButton}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
        <div></div>
      </form>

      <div className={styles.filterBox}>
        {filters.map((filter) => (
          <div key={filter.id} className={styles.filterItem}>
            <input
              className="text-[#00B4BF]"
              type="checkbox"
              name="filters"
              value={filter.id}
            />
            <label className="font-normal">{filter.name}</label>
          </div>
        ))}
      </div>
    </div>
  );
};
