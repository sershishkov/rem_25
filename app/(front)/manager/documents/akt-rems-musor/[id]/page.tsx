import type { Metadata } from 'next';
import { ParamsProps } from '@/interfaces/CommonInterfaces';
import AktRemsMusorAddEdit from '../AktRemsMusorAddEdit';

const title = 'Редактировать Акт';

export const metadata: Metadata = {
  title: title,
};

export default async function AktRemsMusorEdit({
  params,
}: Readonly<ParamsProps>) {
  const { id } = await params;
  return <AktRemsMusorAddEdit id={id} mode='edit' title={title} />;
}
