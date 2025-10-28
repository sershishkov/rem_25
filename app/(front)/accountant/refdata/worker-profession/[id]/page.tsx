import type { Metadata } from 'next';
import { ParamsProps } from '@/interfaces/CommonInterfaces';
import WorkerProfAddEdit from '../WorkerProfAddEdit';

const title = 'Редактировать Профессию';

export const metadata: Metadata = {
  title: title,
};

export default async function WorkerProfessionEdit({
  params,
}: Readonly<ParamsProps>) {
  const { id } = await params;
  return <WorkerProfAddEdit id={id} mode='edit' title={title} />;
}
