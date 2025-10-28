import React from 'react';

export default function CalculationAddEdit({
  id,
  mode,
  title,
}: Readonly<{ id?: string; mode: string; title: string }>) {
  return (
    <>
      <h6>{id ?? 'no ID now'}</h6>
      <h6>{mode}</h6>
      <h6>{title}</h6>
    </>
  );
}
