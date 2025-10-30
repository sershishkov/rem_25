import React from 'react';

import { FloatToSamplesInWordsUkr } from '@/lib/helpers/myPropisUkr';

import {
  I_TransformedClient,
  I_TransformedExecutor,
  I_Contract,
  I_WorkRows,
} from '@/interfaces/refdata';

import { arr__typeAkt } from '@/constants/constants';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import classes from './styles.module.scss';

function AktToPrint({
  aktOfWorkNumber,
  aktOfWorkDate,
  executorObj,
  clientObj,
  contractObj,
  typeAkt,
  aktSum,
  tableRows,
}: Readonly<{
  aktOfWorkNumber: string;
  aktOfWorkDate: Date;
  executorObj: I_TransformedExecutor;
  clientObj: I_TransformedClient;
  contractObj: I_Contract;

  typeAkt: string;
  aktSum: number;
  tableRows: I_WorkRows[];
}>) {
  const sumPropis = FloatToSamplesInWordsUkr(aktSum);
  const objTypeAkt = arr__typeAkt.find((item) => item._id === typeAkt);
  const aktCaption =
    objTypeAkt?.caption + ' ' + objTypeAkt?.prefix + aktOfWorkNumber;
  const aktDateToString = new Date(aktOfWorkDate).toLocaleDateString('uk-UA', {
    // day: '2-digit',
    // month: 'long',
    year: 'numeric',
  });

  const contractDateToString = contractObj?.formatedContractDate;

  let ourFirm = '';

  if (executorObj !== undefined && executorObj !== null) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const edrpouPart = executorObj?.executor_edrpou
      ? `ЄДРПОУ :${executorObj?.executor_edrpou}`
      : '';
    const innPart = executorObj?.executor_inn
      ? `ІНН :${executorObj?.executor_inn}`
      : '';
    ourFirm =
      `${executorObj?.executor_firmTypeShortName} « ${executorObj?.executor_firmShortName} », ${edrpouPart} ${innPart}`.trim();
  }

  const ourFirmAddress = `${executorObj?.executor_postIndex}, ${executorObj?.executor_address}`;

  const ourIBAN = executorObj?.executor_iban;

  let payerFirm = '';

  if (clientObj !== undefined && clientObj !== null) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const clientEdrpouPart = clientObj?.client_edrpou
      ? `ЄДРПОУ :${clientObj?.client_edrpou}`
      : '';
    const clientInnPart = clientObj?.client_inn
      ? `ІНН :${clientObj?.client_inn}`
      : '';
    payerFirm =
      `${clientObj?.client_firmTypeShortName} « ${clientObj?.client_firmShortName} », ${clientEdrpouPart} ${clientInnPart}`.trim();
  }

  const clientFirmAddress = `${clientObj?.client_postIndex}, ${clientObj?.client_address}`;

  const clientIBAN = clientObj?.client_iban;

  const contractNumber = contractObj?.contractNumber;
  const ourBoss = `${
    executorObj?.executor_firstName_imen
  } ${executorObj?.executor_lastName_imen?.toUpperCase()}`;
  const ourBossLong = `${executorObj?.executor_lastName_imen} ${executorObj?.executor_firstName_imen} ${executorObj?.executor_patronymic_rodit}`;

  const clientBoss = `${
    clientObj?.client_firstName_imen
  } ${clientObj?.client_lastName_imen?.toUpperCase()}`;

  const clientBossLong = `${clientObj?.client_lastName_imen} ${clientObj?.client_firstName_imen} ${clientObj?.client_patronymic_imen}`;

  return (
    <div className={classes.page} id='page'>
      <TableContainer sx={{ margin: 0 }} id='table-caption-1'>
        <Table
          padding='none'
          sx={{
            width: '100%',
            margin: 0,
            // backgroundColor: 'white',
            // '& td,th': {
            //   color: 'black',
            // },
          }}
        >
          <TableBody
            sx={{
              '& td,th,': {
                border: '1px solid transparent',
              },
            }}
          >
            <TableRow>
              <TableCell align='center' sx={{ width: '50%' }}>
                <Typography variant='body2'>ВИКОНАВЕЦЬ</Typography>
              </TableCell>
              <TableCell align='center' sx={{ width: '50%' }}>
                <Typography variant='body2'>ЗАМОВНИК</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '50%' }}>
                <Typography variant='body2'>{ourFirm}</Typography>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Typography variant='body2'>{payerFirm}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '50%' }}>
                <Typography variant='body2'>
                  Адреса: {ourFirmAddress}
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Typography variant='body2'>
                  Адреса: {clientFirmAddress}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '50%' }}>
                <Typography variant='body2'>IBAN: {ourIBAN}</Typography>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Typography variant='body2'>IBAN: {clientIBAN}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography variant='h5' align='center'>
                  {aktCaption}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography variant='h6' align='center'>
                  Від &quot;___&quot; _______________{aktDateToString} р.
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer sx={{ margin: 0 }} id='table-caption-2'>
        <Table
          padding='none'
          sx={{
            width: '100%',
            margin: 0,
            // backgroundColor: 'white',
            // '& td,th': {
            //   color: 'black',
            // },
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
                <Typography variant='body2'>
                  Договір № {contractNumber} від {contractDateToString}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '60%' }}>
                <Typography variant='body2'>
                  Ми,що нижче підписалися, представник Замовника:
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '40%' }}>
                <Typography variant='body2'>{ourBossLong}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '60%' }}>
                <Typography variant='body2'>
                  та представник Виконавця:
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '40%' }}>
                <Typography variant='body2'>{clientBossLong}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography variant='body2'>
                  склали цей АКТ про те, що Виконавець належнім чином і в
                  повному обсязі виконав (надав), а Замовник прийняв роботи
                  (послуги):
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer sx={{ margin: 0 }} id='table-main'>
        <Table
          padding='none'
          sx={{
            width: '100%',
            margin: 0,
            // backgroundColor: 'white',
            // '& td,th': {
            //   color: 'black',
            // },
          }}
        >
          <TableBody
            className={classes['table-main']}
            sx={{
              '& td,th': {
                border: '1px solid black',
              },
            }}
          >
            <TableRow>
              <TableCell align='center' sx={{ width: '7mm' }}>
                <Typography variant='body2'>№ п/п</Typography>
              </TableCell>
              <TableCell align='center'>
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
            {tableRows &&
              tableRows.length > 0 &&
              tableRows.map((item, rowIndex) => (
                <TableRow key={item.row_id}>
                  <TableCell align='center'>
                    <Typography variant='body2'>{rowIndex + 1}</Typography>
                  </TableCell>
                  <TableCell align='left' sx={{ paddingLeft: 1 }}>
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
          </TableBody>
          <TableBody
            sx={{
              '& td,th': {
                border: '1px solid transparent',
              },
            }}
          >
            <TableRow>
              <TableCell></TableCell>
              <TableCell colSpan={4}>
                <Typography variant='body2' sx={{ paddingLeft: 5 }}>
                  Всього без ПДВ
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='body2' align='center'>
                  {aktSum.toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell colSpan={4}>
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
              <TableCell colSpan={4}>
                <Typography variant='body2' sx={{ paddingLeft: 5 }}>
                  Загальна сума без ПДВ
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='body2' align='center'>
                  {aktSum.toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={7}>
                <Typography variant='body1' align='left'>
                  Загальна вартість виконаних робіт (послуг):{' '}
                  <strong>{`(${sumPropis}), без ПДВ.`}</strong>
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={7}>
                <Typography variant='body1' align='left'>
                  Сторони одна до одної претензій не мають.
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer sx={{ margin: '1rem 0' }} id='table-sign'>
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
              <TableCell sx={{ width: '50%' }}>
                <Typography mb={2} variant='body2'>
                  ВИКОНАВЕЦЬ
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Typography variant='body2'>ЗАМОВНИК</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '50%' }}>
                <Grid
                  container
                  direction={`row`}
                  sx={{ paddingRight: 2, paddingTop: 2 }}
                >
                  <Grid
                    sx={{ borderBottom: '1px solid black', flex: 1 }}
                  ></Grid>
                  <Grid>
                    <Typography variant='body1' align='right'>
                      {ourBoss}
                    </Typography>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Grid
                  container
                  direction={`row`}
                  sx={{ paddingRight: 2, paddingTop: 2 }}
                >
                  <Grid
                    sx={{ borderBottom: '1px solid black', flex: 1 }}
                  ></Grid>
                  <Grid>
                    <Typography variant='body1' align='right'>
                      {clientBoss}
                    </Typography>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '50%' }}>
                <Typography variant='body2'>МП</Typography>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Typography variant='body2'>МП</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AktToPrint;
