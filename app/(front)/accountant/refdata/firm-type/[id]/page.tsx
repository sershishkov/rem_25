import type { Metadata } from 'next';
import { ParamsProps } from '@/interfaces/CommonInterfaces';
import FirmTypeAddEdit from '../FirmTypeAddEdit';

const title = 'Редактировать Форму собственности';

export const metadata: Metadata = {
  title: title,
};

export default async function FirmTypeEdit({ params }: Readonly<ParamsProps>) {
  const { id } = await params;
  return <FirmTypeAddEdit id={id} mode='edit' title={title} />;
}
