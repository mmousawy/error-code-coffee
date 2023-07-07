'use client';

import React, { createContext, useState } from 'react';

export const OverviewContext = createContext<any>(null);

export default function OverviewContextProvider({ children }: { children: any }) {
  const [ startedOnOverview, setStartedOnOverview ] = useState(false);
  const [ page, setPage ] = useState(1);

  const state = {
    page,
    setPage,
    startedOnOverview,
    setStartedOnOverview,
  };

  return (
    <OverviewContext.Provider value={ state }>
      { children }
    </OverviewContext.Provider>
  );
}
