import type { Metadata } from 'next';
import { ParamsProps } from '@/interfaces/CommonInterfaces';
import CalculationAddEdit from '../CalculationAddEdit';

const title = 'Редактировать Калькуляцию';

export const metadata: Metadata = {
  title: title,
};

export default async function CalculationEditPage({
  params,
}: Readonly<ParamsProps>) {
  const { id } = await params;
  return <CalculationAddEdit id={id} mode='edit' title={title} />;
}
