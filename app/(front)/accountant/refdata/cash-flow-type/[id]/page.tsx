import type { Metadata } from 'next';
import { ParamsProps } from '@/interfaces/CommonInterfaces';
import CashRegisterAddEdit from '../CashFlowTypeAddEdit';

const title = 'Редактировать Тип Операции';

export const metadata: Metadata = {
  title: title,
};

export default async function CashRegisterEdit({
  params,
}: Readonly<ParamsProps>) {
  const { id } = await params;
  return <CashRegisterAddEdit id={id} mode='edit' title={title} />;
}
