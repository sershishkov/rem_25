import type { Metadata } from 'next';
import { ParamsProps } from '@/interfaces/CommonInterfaces';
import AktAddEdit from '../AktAddEdit';

const title = 'Редактировать Акт';

export const metadata: Metadata = {
  title: title,
};

export default async function AktOfWorkEdit({ params }: Readonly<ParamsProps>) {
  const { id } = await params;
  return <AktAddEdit id={id} mode='edit' title={title} />;
}
