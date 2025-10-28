import type { Metadata } from 'next';
import { ParamsProps } from '@/interfaces/CommonInterfaces';
import NaklRemsAddEdit from '../NaklRemsAddEdit';

const title = 'Редактировать Накладную';

export const metadata: Metadata = {
  title: title,
};

export default async function NakladnayaRemsEdit({
  params,
}: Readonly<ParamsProps>) {
  const { id } = await params;
  return <NaklRemsAddEdit id={id} mode='edit' title={title} />;
}
