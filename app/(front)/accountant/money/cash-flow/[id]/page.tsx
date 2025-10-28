import type { Metadata } from 'next';
import { ParamsProps } from '@/interfaces/CommonInterfaces';
import CashFlowAddEdit from '../CashFlowAddEdit';

const title = 'Редактировать операцию Кассы';

export const metadata: Metadata = {
  title: title,
};

export default async function CashFlowEdit({ params }: Readonly<ParamsProps>) {
  const { id } = await params;
  return <CashFlowAddEdit id={id} mode='edit' title={title} />;
}
