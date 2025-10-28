import type { Metadata } from 'next';
import { ParamsProps } from '@/interfaces/CommonInterfaces';
import ContrTypeAddEdit from '../ContrTypeAddEdit';

const title = 'Редактировать Тип Контракта';

export const metadata: Metadata = {
  title: title,
};

export default async function ContractTypeEdit({
  params,
}: Readonly<ParamsProps>) {
  const { id } = await params;
  return <ContrTypeAddEdit id={id} mode='edit' title={title} />;
}
