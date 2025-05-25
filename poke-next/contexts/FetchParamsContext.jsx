"use client";

import { createContext, useContext, useState } from "react";

const defaultValue = {
  page: 1,
  setPage: () => {},
  limit: 50,
  setLimit: () => {},
};

export const FetchParamsContext = createContext(defaultValue);

export function FetchParamsProvider({ children }) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);

  return (
    <FetchParamsContext.Provider value={{ page, setPage, limit, setLimit }}>
      {children}
    </FetchParamsContext.Provider>
  );
}

export function useFetchParams() {
  return useContext(FetchParamsContext);
}
