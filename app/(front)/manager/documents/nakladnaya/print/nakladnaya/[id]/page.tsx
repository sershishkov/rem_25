'use client';
import React, { useState, useEffect } from 'react';

import { item__get_one } from '@/lib/actions/refdata.actions';
import NakladnToPrint from '@/components/documents/formsToPrint/NakladnToPrint';
import { ParamsProps } from '@/interfaces/CommonInterfaces';
import { I_Contract, I_Client, I_ProductInNakl } from '@/interfaces/refdata';

const currentURL = '/manager/documents/nakladnaya';
const initState = {
  nakladnayaNumber: '',
  nakladnayaDate: new Date(),
  typeNakl: '',
  naklSum: 0,
  tableRows: [],
};

function NakladnayaPrint({ params }: Readonly<ParamsProps>) {
  const { id } = React.use(params);
  const [formData, setFormData] = useState(initState);

  const [localOurFirmObj, setLocalOurFirmObj] = useState<I_Client>();
  const [localClientObj, setLocalClientObj] = useState<I_Client>();
  const [localContractObj, setLocalContractObj] = useState<I_Contract>();

  const {
    nakladnayaNumber,
    nakladnayaDate,

    typeNakl,
    naklSum,
    tableRows,
  } = formData;

  useEffect(() => {
    if (id) {
      const myGetOne = async () => {
        const item = await item__get_one({ _id: id }, currentURL);
        if (item) {
          const arrToSetRows = item.products?.map(
            (inner_item: I_ProductInNakl) => {
              return {
                row_id: inner_item._id!.toString(),
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                product: inner_item.product.productName,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                unit: inner_item.product.unit.unitName,
                extraInformation: inner_item.extraInformation!,
                amount: inner_item?.amount.toString(),
                price: inner_item?.price.toFixed(2),
                rowSum: (inner_item?.amount * inner_item?.price).toFixed(2),
              };
            }
          );

          const currentContract = await item__get_one(
            { _id: item.contract._id },
            '/manager/refdata/contract'
          );

          const currentOurFirm = await item__get_one(
            { _id: item.naklOurFirm },
            '/manager/refdata/client'
          );

          const currentClient = await item__get_one(
            { _id: item.naklClient },
            '/manager/refdata/client'
          );

          setFormData((prevState) => ({
            ...prevState,
            nakladnayaNumber: item.nakladnayaNumber,
            nakladnayaDate: new Date(item.nakladnayaDate),
            naklSum: Number(item.totalNaklSum),
            typeNakl: item.typeNakl,
            tableRows: arrToSetRows,
          }));
          setLocalOurFirmObj(currentOurFirm);
          setLocalClientObj(currentClient);
          setLocalContractObj(currentContract);
        }
      };
      myGetOne();
    }
  }, [id]);

  return (
    <NakladnToPrint
      nakladnayaNumber={nakladnayaNumber}
      nakladnayaDate={nakladnayaDate}
      ourFirmObj={localOurFirmObj!}
      clientObj={localClientObj!}
      contractObj={localContractObj!}
      typeNakl={typeNakl}
      naklSum={naklSum}
      tableRows={tableRows}
    />
  );
}

export default NakladnayaPrint;
