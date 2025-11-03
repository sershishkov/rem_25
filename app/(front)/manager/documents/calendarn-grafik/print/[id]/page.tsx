'use client';
import React, { useState, useLayoutEffect } from 'react';
import { ParamsProps } from '@/interfaces/CommonInterfaces';
import { I_Contract, I_Client, I_CalendarnGrafik } from '@/interfaces/refdata';
import { item__get_one } from '@/lib/actions/refdata.actions';

import CalendarnGraficToPrint from '@/components/documents/formsToPrint/CalendarnGraficToPrint';

export default function PrintGrafik({ params }: Readonly<ParamsProps>) {
  const { id } = React.use(params);

  const [currentContract, setCurrentContract] = useState<I_Contract>();
  const [currentClient, setCurrentClient] = useState<I_Client>();
  const [currentExecutor, setCurrentExecutor] = useState<I_Client>();
  const [currentCalendGrafic, setCurrentCalendGrafic] =
    useState<I_CalendarnGrafik>();

  useLayoutEffect(() => {
    if (id) {
      const myGetOne = async () => {
        const localGrafic = await item__get_one(
          { _id: id },
          '/manager/documents/calendarn-grafik'
        );
        const localContract = await item__get_one(
          { _id: localGrafic.contract._id },
          '/manager/refdata/contract'
        );
        const localClient = await item__get_one(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          { _id: localContract?.client._id },
          '/manager/refdata/client'
        );
        const localExecutor = await item__get_one(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          { _id: localContract?.ourFirm._id },
          '/manager/refdata/client'
        );
        setCurrentCalendGrafic(localGrafic);

        setCurrentContract(localContract);
        setCurrentClient(localClient);
        setCurrentExecutor(localExecutor);
      };
      myGetOne();
    }
  }, [id]);
  return (
    <CalendarnGraficToPrint
      contractObj={currentContract as I_Contract}
      clientObj={currentClient as I_Client}
      executorObj={currentExecutor as I_Client}
      currentCalendGrafic={currentCalendGrafic!}
    />
  );
}
