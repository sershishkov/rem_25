import React from 'react';

export default function CalculationList({
  currentURL,
  tableHeader,
}: {
  readonly currentURL: string;
  readonly tableHeader: string;
}) {
  return (
    <>
      <h6>{currentURL}</h6>
      <h6>{tableHeader}</h6>
    </>
  );
}
