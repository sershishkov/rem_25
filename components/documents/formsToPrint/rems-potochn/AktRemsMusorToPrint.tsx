import React from 'react';
import { FloatToSamplesInWordsUkr } from '@/lib/helpers/myPropisUkr';
import { I_Client, I_RowInAktRemsMusor } from '@/interfaces/refdata';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import classes from '../styles.module.scss';

export default function AktRemsMusorToPrint({
  executorObj,
  clientObj,

  aktRemsMusorNumber,
  aktRemsMusorDate,
  serviceWorks,
  totalAktRemsMusorSum,
  totalAktRemsMusorToShow,
}: Readonly<{
  executorObj: I_Client;
  clientObj: I_Client;

  aktRemsMusorNumber: string;
  aktRemsMusorDate: string;
  serviceWorks: I_RowInAktRemsMusor[];
  totalAktRemsMusorSum: string;
  totalAktRemsMusorToShow: string;
}>) {
  const localTotal = totalAktRemsMusorToShow || totalAktRemsMusorSum;

  const sumPropis = FloatToSamplesInWordsUkr(Number.parseFloat(localTotal));

  let executor_typeAndShortNameAndEDRPOU_INN = '';
  let executor_bossShort = '';
  let executor_bossLongImenitelny = '';
  let executor_firmAddressWithPostIndex = '';
  let executor_iban = '';

  let client_typeAndShortNameAndEDRPOU_INN = '';
  let client_bossShort = '';
  let client_bossLongImenitelny = '';
  let client_firmAddressWithPostIndex = '';
  let client_iban = '';

  if (executorObj !== undefined) {
    executor_typeAndShortNameAndEDRPOU_INN =
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      `${executorObj.firmType?.firmTypeShortName}« ${executorObj.clientShortName} », ${executorObj.edrpou} `.trim();

    executor_bossShort = `${
      executorObj.firstName_imen
    } ${executorObj.lastName_imen?.toUpperCase()}`.trim();

    executor_bossLongImenitelny =
      `${executorObj.lastName_imen} ${executorObj.firstName_imen} ${executorObj.patronymic_imen} `.trim();

    executor_firmAddressWithPostIndex =
      ` ${executorObj.postIndex}, ${executorObj.address}`.trim();

    executor_iban = executorObj.iban || '';
  }

  if (clientObj !== undefined) {
    client_typeAndShortNameAndEDRPOU_INN =
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      `${clientObj.firmType?.firmTypeShortName}« ${clientObj.clientShortName} », ${clientObj.edrpou} `.trim();

    client_bossShort = `${
      clientObj.firstName_imen
    } ${clientObj.lastName_imen?.toUpperCase()}`.trim();

    client_bossLongImenitelny =
      `${clientObj.lastName_imen} ${clientObj.firstName_imen} ${clientObj.patronymic_imen} `.trim();

    client_firmAddressWithPostIndex =
      ` ${clientObj.postIndex}, ${clientObj.address}`.trim();

    client_iban = clientObj.iban || '';
  }

  return (
    <div className={classes.page} id='page'>
      <TableContainer
        sx={{ margin: 0 }}
        id='table-rems-potochn-akt-musor-caption'
      >
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
                  variant='body2'
                  className={classes['rems-potochn-akt-musor-text']}
                  align='center'
                >
                  ВИКОНАВЕЦЬ
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-musor-text']}
                  align='center'
                >
                  ЗАМОВНИК
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-musor-text']}
                >
                  {executor_typeAndShortNameAndEDRPOU_INN}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-musor-text']}
                >
                  {client_typeAndShortNameAndEDRPOU_INN}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-musor-text']}
                >
                  {executor_firmAddressWithPostIndex}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-musor-text']}
                >
                  {client_firmAddressWithPostIndex}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-musor-text']}
                >
                  {executor_iban}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-musor-text']}
                >
                  {client_iban}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-musor-text']}
                  align='center'
                  mt={2}
                >
                  АКТ виконаних робіт (послуг) № АВР – {aktRemsMusorNumber}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-musor-text']}
                  align='center'
                  mb={2}
                >
                  Від « ___ » ________________ {aktRemsMusorDate} року
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-musor-text']}
                >
                  Ми,що нижче підписалися, представник Замовника :
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-musor-text']}
                >
                  {client_bossLongImenitelny}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-musor-text']}
                >
                  та представник Виконавця :
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-musor-text']}
                >
                  {executor_bossLongImenitelny}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography
                  variant='body2'
                  className={classes['rems-potochn-akt-musor-text']}
                  mb={1}
                >
                  склали цей АКТ про те, що Виконавець належнім чином і в
                  повному обсязі виконав (надав), а Замовник прийняв роботи
                  (послуги):
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer sx={{ margin: 0 }} id='table-rems-potochn-akt-musor-main'>
        <Table
          padding='none'
          sx={{
            width: '100%',
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
            {serviceWorks &&
              serviceWorks.length > 0 &&
              serviceWorks.map((item, rowIndex) => (
                <TableRow key={item.row_id}>
                  <TableCell align='center'>
                    <Typography variant='body2'>{rowIndex + 1}</Typography>
                  </TableCell>
                  <TableCell align='left' sx={{ paddingLeft: 1 }}>
                    <Typography variant='body2'>
                      {item.serviceWork} {item.extraInformation ?? ''}
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
              <TableCell align='center'>
                <Typography variant='body2'></Typography>
              </TableCell>
              <TableCell>
                <Typography variant='body2' pl={1}>
                  Разом робота
                </Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='body2'></Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='body2'></Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='body2'></Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='body2'>{localTotal}</Typography>
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
              <TableCell align='center'>
                <Typography variant='body2'></Typography>
              </TableCell>
              <TableCell>
                <Typography variant='body2' pl={1} mt={2}>
                  Всього без ПДВ
                </Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='body2'></Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='body2'></Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='body2'></Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='body2' mt={2}>
                  {localTotal}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='center'>
                <Typography variant='body2'></Typography>
              </TableCell>
              <TableCell>
                <Typography variant='body2' pl={1}>
                  ПДВ
                </Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='body2'></Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='body2'></Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='body2'></Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='body2'>0,00</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='center'>
                <Typography variant='body2'></Typography>
              </TableCell>
              <TableCell>
                <Typography variant='body2' pl={1}>
                  Загальна сума без ПДВ
                </Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='body2'></Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='body2'></Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='body2'></Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='body2'>{localTotal}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={6}>
                <Typography variant='body2' mt={2}>
                  Загальна вартість виконаних робіт (послуг): ({sumPropis}), без
                  ПДВ.
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={6}>
                <Typography variant='body2' mb={2}>
                  Сторони одна до одної претензій не мають
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer sx={{ margin: 0 }} id='table-rems-potochn-akt-musor-sign'>
        <Table
          padding='none'
          sx={{
            width: '100%',
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
                      {executor_bossShort}
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
                      {client_bossShort}
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
