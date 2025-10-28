import type { Metadata } from 'next';
import { ParamsProps } from '@/interfaces/CommonInterfaces';
import NaklAddEdit from '../NaklAddEdit';

const title = 'Редактировать Накладную';

export const metadata: Metadata = {
  title: title,
};

export default async function DocumentNakladnayaEdit({
  params,
}: Readonly<ParamsProps>) {
  const { id } = await params;
  return <NaklAddEdit id={id} mode='edit' title={title} />;
}
