import type { Metadata } from 'next';

import NaklRemsAddEdit from '../../NaklRemsAddEdit';
import { ParamsProps } from '@/interfaces/CommonInterfaces';

const title = 'Создать Накладную';

export const metadata: Metadata = {
  title: title,
};

export default async function NakladnayaRemsAddContractID({
  params,
}: Readonly<ParamsProps>) {
  const { id } = await params;
  return <NaklRemsAddEdit mode='add' title={title} contractID={id} />;
}
