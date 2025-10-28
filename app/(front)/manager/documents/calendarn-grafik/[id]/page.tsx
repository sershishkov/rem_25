import type { Metadata } from 'next';
import { ParamsProps } from '@/interfaces/CommonInterfaces';
import CalendarnAddEdit from '../CalendarnAddEdit';

const title = 'Редактировать График';

export const metadata: Metadata = {
  title: title,
};

export default async function CalendarnEdit({ params }: Readonly<ParamsProps>) {
  const { id } = await params;
  return <CalendarnAddEdit id={id} mode='edit' title={title} />;
}
