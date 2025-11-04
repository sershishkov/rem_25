import React from 'react';
import {
  I_NakladnayaRems,
  I_ProductInNakladnayaRems,
} from '@/interfaces/refdata';
import { FloatToSamplesInWordsUkr } from '@/lib/helpers/myPropisUkr';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import classes from '../styles.module.scss';
export default function NaklRems3ToPrint({
  currentNakl,
}: Readonly<{
  currentNakl: I_NakladnayaRems;
}>) {
  let percent3 = 0;
  let newNaklSum = 0;

  let tableRows;
  let nakladnayaRemsNumber3 = '';
  let contrDateStr = '';

  let executor_ShortName = '';
  let executor_TypeShort = '';
  let executor_FIOImen = '';
  let executor_EDRPO = '';
  let executor_iban = '';
  let executor_firmAddressWithPostIndex = '';
  let executor_TaxationType = '';

  let client_ShortName = '';
  let client_TypeShort = '';
  let client_FIOImen = '';
  let client_EDRPO = '';
  let client_iban = '';
  let client_firmAddressWithPostIndex = '';

  if (currentNakl !== undefined) {
    percent3 = currentNakl.percent3;
    nakladnayaRemsNumber3 = currentNakl.nakladnayaRemsNumber3;
    tableRows = currentNakl?.products?.map(
      (inner_item: I_ProductInNakladnayaRems) => {
        const newPrice =
          inner_item?.price + (inner_item?.price * percent3) / 100;
        const newRowSum = inner_item?.amount * newPrice;
        newNaklSum += newRowSum;

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
          price: newPrice?.toFixed(2),
          rowSum: newRowSum?.toFixed(2),
        };
      }
    );
    contrDateStr = new Date(currentNakl.nakladnayaRemsDate).toLocaleDateString(
      'uk-UA',
      {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }
    );
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    executor_ShortName = currentNakl.executorFirm3?.clientShortName;

    executor_TypeShort =
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      currentNakl.executorFirm3?.firmType?.firmTypeShortName;
    executor_FIOImen = `${
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      currentNakl.executorFirm3?.firstName_imen
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
    } ${currentNakl.executorFirm3?.lastName_imen?.toLocaleUpperCase()}`;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    executor_EDRPO = `ЄДРПОУ: ${currentNakl.executorFirm3?.edrpou}`;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    executor_firmAddressWithPostIndex = `${currentNakl.executorFirm3?.postIndex} ${currentNakl.executorFirm3?.address}`;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    executor_iban = currentNakl.executorFirm3?.iban;

    executor_TaxationType =
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      currentNakl.executorFirm3?.taxationType?.taxationTypeName;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    client_ShortName = currentNakl.ourFirm?.clientShortName;

    client_TypeShort =
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      currentNakl.ourFirm?.firmType?.firmTypeShortName;
    client_FIOImen = `${
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      currentNakl.ourFirm?.firstName_imen
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
    } ${currentNakl.ourFirm?.lastName_imen?.toLocaleUpperCase()}`;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    client_EDRPO = `ЄДРПОУ: ${currentNakl.ourFirm?.edrpou}`;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    client_firmAddressWithPostIndex = `${currentNakl.ourFirm?.postIndex} ${currentNakl?.ourFirm?.address}`;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    client_iban = currentNakl.ourFirm?.iban;
  }

  const totalSumPropis = FloatToSamplesInWordsUkr(newNaklSum);

  return (
    <div className={classes.page} id='page'>
      <TableContainer id='table-nakl-rems-header' sx={{ marginBottom: 2 }}>
        <Table
          padding='none'
          sx={{
            width: '100%',
            margin: 0,
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
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                >
                  ВИДАТКОВА НАКЛАДНА № ВН-{nakladnayaRemsNumber3}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                >
                  Від {contrDateStr}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '40mm' }}>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                >
                  Постачальник:
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                >
                  {executor_TypeShort} «{executor_ShortName}» {executor_EDRPO}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                >
                  Адреса:
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                >
                  {executor_firmAddressWithPostIndex}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                >
                  IBAN:
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                >
                  {executor_iban}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  mb={2}
                  variant='body2'
                  className={classes['nakl-rems-text']}
                >
                  {executor_TypeShort} « {executor_ShortName} »{' '}
                  {executor_TaxationType}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                >
                  Платник
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                >
                  {client_TypeShort} « {client_ShortName} » {client_EDRPO}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                >
                  Адреса:
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                >
                  {client_firmAddressWithPostIndex}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                >
                  IBAN :
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                >
                  {client_iban}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer id='table-nakl-rems-main'>
        <Table
          padding='none'
          sx={{
            width: '100%',
            margin: 0,
          }}
        >
          <TableBody
            sx={{
              '& td,th': {
                border: '1px solid black',
              },
            }}
          >
            <TableRow>
              <TableCell sx={{ width: '7mm' }}>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                >
                  № п/п
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                >
                  Найменування робіт і витрат
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '20mm' }}>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                >
                  Од. Вимиру
                </Typography>
              </TableCell>

              <TableCell sx={{ width: '20mm' }}>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                >
                  Кількість
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '20mm' }}>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                >
                  Ціна без ПДВ,грн
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '20mm' }}>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                >
                  Сума без ПДВ,грн
                </Typography>
              </TableCell>
            </TableRow>
            {tableRows &&
              tableRows.length > 0 &&
              tableRows.map((item, rowIndex) => (
                <TableRow key={item.row_id}>
                  <TableCell align='center'>
                    <Typography
                      variant='body2'
                      className={classes['nakl-rems-text']}
                      align='center'
                    >
                      {rowIndex + 1}
                    </Typography>
                  </TableCell>
                  <TableCell align='left' sx={{ paddingLeft: 1 }}>
                    <Typography
                      variant='body2'
                      className={classes['nakl-rems-text']}
                    >
                      {item.product} {item.extraInformation ?? ''}
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography
                      variant='body2'
                      className={classes['nakl-rems-text']}
                      align='center'
                    >
                      {item.unit}
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography
                      variant='body2'
                      className={classes['nakl-rems-text']}
                      align='center'
                    >
                      {item.amount}
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography
                      variant='body2'
                      className={classes['nakl-rems-text']}
                      align='center'
                    >
                      {item.price}
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography
                      variant='body2'
                      className={classes['nakl-rems-text']}
                      align='center'
                    >
                      {item.rowSum}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                ></Typography>
              </TableCell>
              <TableCell>
                <Typography
                  pl={1}
                  variant='body2'
                  className={classes['nakl-rems-text']}
                >
                  <strong>Итого материалы</strong>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                ></Typography>
              </TableCell>

              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                ></Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                ></Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                >
                  {newNaklSum?.toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
          <TableBody
            sx={{
              '& td,th': {
                border: '1px solid transparent',
              },
            }}
          >
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                ></Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                >
                  Всього без ПДВ
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                ></Typography>
              </TableCell>

              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                ></Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                ></Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                >
                  {newNaklSum?.toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                ></Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                >
                  ПДВ
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                ></Typography>
              </TableCell>

              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                ></Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                ></Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                >
                  0.00
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                ></Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                >
                  Загальна сума без ПДВ
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                ></Typography>
              </TableCell>

              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                ></Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                ></Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                  align='center'
                >
                  {newNaklSum?.toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={6}>
                <Typography
                  variant='body2'
                  className={classes['nakl-rems-text']}
                >
                  Всього до сплати: {totalSumPropis}, без ПДВ
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer sx={{ marginTop: '1rem' }} id='table-nakl-rems-sign'>
        <Table
          padding='none'
          sx={{
            width: '100%',
            margin: 0,
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
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  mb={2}
                  variant='body2'
                  className={classes['nakl-rems-text']}
                >
                  Відпустив
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  mb={2}
                  variant='body2'
                  className={classes['nakl-rems-text']}
                >
                  Отримал
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Grid container direction={`row`}>
                  <Grid
                    sx={{ flex: 1, borderBottom: '1px solid black' }}
                  ></Grid>
                  <Grid>
                    <Typography
                      variant='body2'
                      className={classes['jkh-budjet-text']}
                      sx={{ paddingRight: '4px' }}
                    >
                      {executor_FIOImen}
                    </Typography>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>
                <Grid container direction={`row`}>
                  <Grid
                    sx={{ flex: 1, borderBottom: '1px solid black' }}
                  ></Grid>
                  <Grid>
                    <Typography
                      variant='body2'
                      className={classes['jkh-budjet-text']}
                      sx={{ paddingRight: '4px' }}
                    >
                      {client_FIOImen}
                    </Typography>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
