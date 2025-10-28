import type { Metadata } from 'next';

import AktRemsMusorAddEdit from '../../AktRemsMusorAddEdit';
import { ParamsProps } from '@/interfaces/CommonInterfaces';

const title = 'Создать Акт';

export const metadata: Metadata = {
  title: title,
};

export default async function AktRemsMusorAddContractID({
  params,
}: Readonly<ParamsProps>) {
  const { id } = await params;
  return <AktRemsMusorAddEdit mode='add' title={title} contractID={id} />;
}
