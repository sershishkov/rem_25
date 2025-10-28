import type { Metadata } from 'next';

import AktAddEdit from '../../AktAddEdit';
import { ParamsProps } from '@/interfaces/CommonInterfaces';

const title = 'Создать Акт';

export const metadata: Metadata = {
  title: title,
};

export default async function AktOfWorkAddContractID({
  params,
}: Readonly<ParamsProps>) {
  const { id } = await params;
  return <AktAddEdit mode='add' title={title} contractID={id} />;
}
