import type { Metadata } from 'next';

import CalculationAddEdit from '../CalculationAddEdit';

const title = 'Создать Калькуляцию';

export const metadata: Metadata = {
  title: title,
};

export default function CalculationAddPage() {
  return <CalculationAddEdit mode='add' title={title} />;
}
