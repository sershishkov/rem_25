import type { Metadata } from 'next';

import NaklAddEdit from '../../NaklAddEdit';
import { ParamsProps } from '@/interfaces/CommonInterfaces';

const title = 'Создать Накладную';

export const metadata: Metadata = {
  title: title,
};

export default async function DocumentNakladnayaAddContractID({
  params,
}: Readonly<ParamsProps>) {
  const { id } = await params;
  return <NaklAddEdit mode='add' title={title} contractID={id} />;
}
