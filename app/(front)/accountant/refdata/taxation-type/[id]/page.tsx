import type { Metadata } from 'next';
import { ParamsProps } from '@/interfaces/CommonInterfaces';
import TaxTypeAddEdit from '../TaxTypeAddEdit';

const title = 'Редактировать Тип налогооблажения';

export const metadata: Metadata = {
  title: title,
};

export default async function TaxationTypeEdit({
  params,
}: Readonly<ParamsProps>) {
  const { id } = await params;
  return <TaxTypeAddEdit id={id} mode='edit' title={title} />;
}
