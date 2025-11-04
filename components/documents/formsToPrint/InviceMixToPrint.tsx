import React from 'react';
import { FloatToSamplesInWordsUkr } from '@/lib/helpers/myPropisUkr';
import {
  I_Contract,
  I_Client,
  I_WorkRows,
  I_LProduct,
} from '@/interfaces/refdata';
import { arr__typeInvoice } from '@/constants/constants';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import classes from './styles.module.scss';

export default function InviceMixToPrint({
  tableAktRows,
  tableNaklRows,
  executorObj,
  clientObj,
  contractObj,

  invoiceNumber,
  invoiceDate,
  naklSum,
  aktSum,
  totalInvoiceSum,
  invoiceDescription,
}: Readonly<{
  tableAktRows: I_WorkRows[];
  tableNaklRows: I_LProduct[];
  executorObj: I_Client;
  clientObj: I_Client;
  contractObj: I_Contract;

  invoiceNumber: string;
  invoiceDate: Date;
  naklSum: number;
  aktSum: number;
  totalInvoiceSum: number;
  invoiceDescription: string;
}>) {
  const contractNumber = contractObj?.contractNumber;
  const sumPropis = FloatToSamplesInWordsUkr(
    Number.isNaN(totalInvoiceSum) ? 0 : totalInvoiceSum
  );
  const invoiceCaption =
    arr__typeInvoice[1].caption +
    ' ' +
    arr__typeInvoice[1].prefix +
    invoiceNumber;

  const invoiceDateToString = new Date(invoiceDate).toLocaleDateString(
    'uk-UA',
    {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }
  );
  const contractDateToString = new Date(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    contractObj?.contractDate
  ).toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  let executor_typeAndShortNameAndEDRPOU_INN = '';
  let executor_firmTypeShortName = '';
  let executor_firmAddressWithPostIndex = '';
  let executor_iban = '';
  let executor_TaxationType = '';

  let client_typeAndShortNameAndEDRPOU_INN = '';
  let client_firmAddressWithPostIndex = '';
  let client_iban = '';

  if (executorObj !== undefined) {
    const edrpouPart = executorObj.edrpou
      ? `ЄДРПОУ :${executorObj.edrpou}`
      : '';
    const innPart = executorObj.inn ? `ІНН :${executorObj.inn}` : '';
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    executor_firmTypeShortName = executorObj.firmType?.firmTypeShortName;

    executor_typeAndShortNameAndEDRPOU_INN =
      `${executor_firmTypeShortName}« ${executorObj.clientShortName} », ${edrpouPart} ${innPart}`.trim();

    executor_firmAddressWithPostIndex =
      ` ${executorObj.postIndex}, ${executorObj.address}`.trim();

    executor_iban = executorObj.iban || '';
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    executor_TaxationType = `${
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      executorObj.firmType?.firmTypeShortName
    } « ${
      executorObj.clientShortName
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
    } » ${executorObj.taxationType?.taxationTypeName}`;
  }

  if (clientObj !== undefined) {
    const edrpouPart = clientObj.edrpou ? `ЄДРПОУ :${clientObj.edrpou}` : '';
    const innPart = clientObj.inn ? `ІНН :${clientObj.inn}` : '';

    client_typeAndShortNameAndEDRPOU_INN =
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      `${clientObj.firmType?.firmTypeShortName}« ${clientObj.clientShortName} », ${edrpouPart} ${innPart}`.trim();

    client_firmAddressWithPostIndex =
      ` ${clientObj.postIndex}, ${clientObj.address}`.trim();

    client_iban = clientObj.iban || '';
  }

  return (
    <div className={classes.page} id='page'>
      <TableContainer id='table-inv-header'>
        <Table
          padding='none'
          sx={{
            width: '100%',
            margin: 0,
            // backgroundColor: 'white',
          }}
        >
          <TableBody
            sx={{
              '& td,th': {
                border: '1px solid transparent',
              },
            }}
          >
            <TableRow>
              <TableCell align='center' colSpan={12}>
                <Typography variant='h5'>{invoiceCaption}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='center' colSpan={12}>
                <Typography variant='h6'>Від {invoiceDateToString}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>
                <Typography variant='body2'>Постачальник:</Typography>
              </TableCell>
              <TableCell colSpan={9}>
                <Typography variant='body2'>
                  {executor_typeAndShortNameAndEDRPOU_INN}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>
                <Typography variant='body2'>Адреса:</Typography>
              </TableCell>
              <TableCell colSpan={9}>
                <Typography variant='body2'>
                  {executor_firmAddressWithPostIndex}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>
                <Typography variant='body2'>IBAN:</Typography>
              </TableCell>
              <TableCell colSpan={9}>
                <Typography variant='body2'>{executor_iban}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='left' colSpan={12}>
                <Typography variant='body2'>{executor_TaxationType}</Typography>
              </TableCell>
            </TableRow>
            <TableRow sx={{ height: '10px' }}>
              <TableCell align='center' sx={{ width: '7mm' }}></TableCell>
              <TableCell align='center' sx={{ width: '7mm' }}></TableCell>
              <TableCell align='center' sx={{ width: '12mm' }}></TableCell>
              <TableCell align='center' colSpan={5}></TableCell>
              <TableCell align='center' sx={{ width: '16mm' }}></TableCell>
              <TableCell align='center' sx={{ width: '18mm' }}></TableCell>
              <TableCell align='center' sx={{ width: '20mm' }}></TableCell>
              <TableCell align='center' sx={{ width: '20mm' }}></TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>
                <Typography variant='body2'>Платник:</Typography>
              </TableCell>
              <TableCell colSpan={9}>
                <Typography variant='body2'>
                  {client_typeAndShortNameAndEDRPOU_INN}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>
                <Typography variant='body2'>Адреса:</Typography>
              </TableCell>
              <TableCell colSpan={9}>
                <Typography variant='body2'>
                  {client_firmAddressWithPostIndex}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>
                <Typography variant='body2'>IBAN:</Typography>
              </TableCell>
              <TableCell colSpan={9}>
                <Typography variant='body2'>{client_iban}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='left' colSpan={12}>
                <Typography variant='body2'>
                  Договір № {contractNumber} від {contractDateToString}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer id='table-inv-main'>
        <Table
          padding='none'
          sx={{
            width: '100%',
            margin: 0,
            // backgroundColor: 'white',
          }}
        >
          <TableBody
            className={classes['table-main']}
            // sx={{
            //   '& td,th': {
            //     border: '1px solid black',
            //   },
            // }}
          >
            <TableRow sx={{ height: 0 }}>
              <TableCell align='center' sx={{ width: '7mm' }}></TableCell>
              <TableCell align='center' sx={{ width: '7mm' }}></TableCell>
              <TableCell align='center' sx={{ width: '12mm' }}></TableCell>
              <TableCell align='center' colSpan={5}></TableCell>

              <TableCell align='center' sx={{ width: '12mm' }}></TableCell>
              <TableCell align='center' sx={{ width: '16mm' }}></TableCell>
              <TableCell align='center' sx={{ width: '18mm' }}></TableCell>
              <TableCell align='center' sx={{ width: '20mm' }}></TableCell>
              <TableCell align='center' sx={{ width: '20mm' }}></TableCell>
            </TableRow>

            <TableRow>
              <TableCell align='center' sx={{ width: '7mm' }}>
                <Typography variant='body2'>№ п/п</Typography>
              </TableCell>
              <TableCell align='center' colSpan={8}>
                <Typography variant='body2'>Найменування</Typography>
              </TableCell>
              <TableCell align='center' sx={{ width: '16mm' }}>
                <Typography variant='body2'>Од. Вимиру</Typography>
              </TableCell>
              <TableCell align='center' sx={{ width: '18mm' }}>
                <Typography variant='body2'>Кількість</Typography>
              </TableCell>
              <TableCell align='center' sx={{ width: '20mm' }}>
                <Typography variant='body2'>Ціна без ПДВ,грн.</Typography>
              </TableCell>
              <TableCell align='center' sx={{ width: '20mm' }}>
                <Typography variant='body2'>Сума без ПДВ,грн</Typography>
              </TableCell>
            </TableRow>

            {tableAktRows && tableAktRows.length > 0 && (
              <>
                <TableRow>
                  <TableCell align='center' sx={{ width: '7mm' }}></TableCell>
                  <TableCell align='center' colSpan={8} sx={{ paddingLeft: 1 }}>
                    <Typography variant='body2'>
                      <strong>Робота</strong>
                    </Typography>
                  </TableCell>
                  <TableCell align='center' sx={{ width: '16mm' }}></TableCell>
                  <TableCell align='center' sx={{ width: '18mm' }}></TableCell>
                  <TableCell align='center' sx={{ width: '20mm' }}></TableCell>
                  <TableCell align='center' sx={{ width: '20mm' }}></TableCell>
                </TableRow>

                {tableAktRows &&
                  tableAktRows.length > 0 &&
                  tableAktRows.map((item, rowIndex) => (
                    <TableRow key={item.row_id}>
                      <TableCell align='center'>
                        <Typography variant='body2'>{rowIndex + 1}</Typography>
                      </TableCell>
                      <TableCell
                        colSpan={8}
                        align='left'
                        sx={{ paddingLeft: 1 }}
                      >
                        <Typography variant='body2'>
                          {item.workName} {item.extraInformation ?? ''}
                        </Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography variant='body2'>{item.unit}</Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography variant='body2'>{item.amount}</Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography variant='body2'>{item.price}</Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography variant='body2'>{item.rowSum}</Typography>
                      </TableCell>
                    </TableRow>
                  ))}

                <TableRow>
                  <TableCell align='center'>{` `}</TableCell>
                  <TableCell colSpan={8} align='left' sx={{ paddingLeft: 1 }}>
                    <Typography variant='body2'>
                      {' '}
                      <strong>Разом робота</strong>
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>{` `}</TableCell>
                  <TableCell align='center'>{` `}</TableCell>
                  <TableCell align='center'>{` `}</TableCell>
                  <TableCell align='center'>
                    <Typography variant='body2'>{aktSum.toFixed(2)}</Typography>
                  </TableCell>
                </TableRow>
              </>
            )}
            {tableNaklRows && tableNaklRows.length > 0 && (
              <>
                <TableRow>
                  <TableCell align='center'>{` `}</TableCell>
                  <TableCell colSpan={8} align='center' sx={{ paddingLeft: 1 }}>
                    <Typography variant='body2'>
                      <strong>Будматеріал</strong>
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>{` `}</TableCell>
                  <TableCell align='center'>{` `}</TableCell>
                  <TableCell align='center'>{` `}</TableCell>
                  <TableCell align='center'>{` `}</TableCell>
                </TableRow>

                {tableNaklRows &&
                  tableNaklRows.length > 0 &&
                  tableNaklRows.map((item, rowIndex) => (
                    <TableRow key={item.row_id}>
                      <TableCell align='center'>
                        <Typography variant='body2'>{rowIndex + 1}</Typography>
                      </TableCell>
                      <TableCell
                        colSpan={8}
                        align='left'
                        sx={{ paddingLeft: 1 }}
                      >
                        <Typography variant='body2'>
                          {item.product} {item.extraInformation ?? ''}
                        </Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography variant='body2'>{item.unit}</Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography variant='body2'>{item.amount}</Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography variant='body2'>{item.price}</Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography variant='body2'>{item.rowSum}</Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                <TableRow>
                  <TableCell align='center'>{` `}</TableCell>
                  <TableCell colSpan={8} align='left' sx={{ paddingLeft: 1 }}>
                    <Typography variant='body2'>
                      <strong>Разом матеріали</strong>
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>{` `}</TableCell>
                  <TableCell align='center'>{` `}</TableCell>
                  <TableCell align='center'>{` `}</TableCell>
                  <TableCell align='center'>
                    <Typography variant='body2'>
                      {naklSum.toFixed(2)}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='center'>{` `}</TableCell>
                  <TableCell colSpan={8} align='left' sx={{ paddingLeft: 1 }}>
                    <Typography variant='body2'>
                      <strong>Разом матеріали і робота</strong>
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>{` `}</TableCell>
                  <TableCell align='center'>{` `}</TableCell>
                  <TableCell align='center'>{` `}</TableCell>
                  <TableCell align='center'>
                    <Typography variant='body2'>
                      {totalInvoiceSum.toFixed(2)}
                    </Typography>
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
          <TableBody
            sx={{
              '& td,th': {
                border: '1px solid transparent',
              },
            }}
          >
            {' '}
            <TableRow>
              <TableCell></TableCell>
              <TableCell colSpan={11}>
                <Typography variant='body2' sx={{ paddingLeft: 5 }}>
                  Всього без ПДВ
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='body2' align='center'>
                  {totalInvoiceSum.toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell colSpan={11}>
                <Typography variant='body2' sx={{ paddingLeft: 5 }}>
                  ПДВ
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='body2' align='center'>
                  0,00
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell colSpan={11}>
                <Typography variant='body2' sx={{ paddingLeft: 5 }}>
                  Загальна сума без ПДВ
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='body2' align='center'>
                  {totalInvoiceSum.toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={13}>
                <Typography variant='body1' align='left'>
                  Всього до сплати: <strong>{sumPropis}</strong>
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={13}>
                <Typography variant='body1'>
                  Призначення платежу: <strong>{invoiceDescription}</strong>
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}></TableCell>
              <TableCell colSpan={10}>
                <Typography variant='body1' align='left'>
                  Керівник ____________________
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}></TableCell>
              <TableCell colSpan={10}>
                <Typography variant='body1' align='left'>
                  <strong>М.П.</strong>
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
