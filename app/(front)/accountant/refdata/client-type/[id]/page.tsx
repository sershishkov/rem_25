import type { Metadata } from 'next';
import { ParamsProps } from '@/interfaces/CommonInterfaces';
import ClientTypeAddEdit from '../ClientTypeAddEdit';

const title = 'Редактировать Тип Клиента';

export const metadata: Metadata = {
  title: title,
};

export default async function ClientTypeEdit({
  params,
}: Readonly<ParamsProps>) {
  const { id } = await params;
  return <ClientTypeAddEdit id={id} mode='edit' title={title} />;
}
