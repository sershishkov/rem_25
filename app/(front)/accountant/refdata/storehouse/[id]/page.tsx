import type { Metadata } from 'next';
import { ParamsProps } from '@/interfaces/CommonInterfaces';
import StoreHouseAddEdit from '../StoreHouseAddEdit';

const title = 'Редактировать Склад';

export const metadata: Metadata = {
  title: title,
};

export default async function StoreHouseEdit({
  params,
}: Readonly<ParamsProps>) {
  const { id } = await params;
  return <StoreHouseAddEdit id={id} mode='edit' title={title} />;
}
