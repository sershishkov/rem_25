import type { Metadata } from 'next';
import { ParamsProps } from '@/interfaces/CommonInterfaces';
import WorkersAddEdit from '../WorkersAddEdit';

const title = 'Редактировать Сотрудника';

export const metadata: Metadata = {
  title: title,
};

export default async function WorkerEdit({ params }: Readonly<ParamsProps>) {
  const { id } = await params;
  return <WorkersAddEdit id={id} mode='edit' title={title} />;
}
