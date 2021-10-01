import { Dispatch, SetStateAction } from "react";

type Props = {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
};

export const Search = ({ searchTerm, setSearchTerm }: Props) => {
  return (
    <div className="w-full px-4 py-2 border-b border-gray-200 h-14 bg-gray-100">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <div className="flex absolute inset-y-0 left-0 pl-3 items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
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
          id="search"
          name="search"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          placeholder="Search"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};
