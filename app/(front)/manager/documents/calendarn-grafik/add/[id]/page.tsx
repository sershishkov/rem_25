import type { Metadata } from 'next';

import CalendarnAddEdit from '../../CalendarnAddEdit';
import { ParamsProps } from '@/interfaces/CommonInterfaces';

const title = 'Создать График';

export const metadata: Metadata = {
  title: title,
};

export default async function CalendarnAddContractID({
  params,
}: Readonly<ParamsProps>) {
  const { id } = await params;
  return <CalendarnAddEdit mode='add' title={title} contractID={id} />;
}
