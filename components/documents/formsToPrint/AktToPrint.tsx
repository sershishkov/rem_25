import { FloatToSamplesInWordsUkr } from '@/lib/helpers/myPropisUkr';

import { I_Contract, I_WorkRows, I_Client } from '@/interfaces/refdata';

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
  executorObj: I_Client;
  clientObj: I_Client;
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

  const contractDateToString = new Date(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    contractObj?.contractDate
  ).toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  const contractNumber = contractObj?.contractNumber;

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
    const edrpouPart = executorObj.edrpou
      ? `ЄДРПОУ :${executorObj.edrpou}`
      : '';
    const innPart = executorObj.inn ? `ІНН :${executorObj.inn}` : '';

    executor_typeAndShortNameAndEDRPOU_INN =
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      `${executorObj.firmType?.firmTypeShortName}« ${executorObj.clientShortName} », ${edrpouPart} ${innPart}`.trim();

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
    const edrpouPart = clientObj.edrpou ? `ЄДРПОУ :${clientObj.edrpou}` : '';
    const innPart = clientObj.inn ? `ІНН :${clientObj.inn}` : '';

    client_typeAndShortNameAndEDRPOU_INN =
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      `${clientObj.firmType?.firmTypeShortName}« ${clientObj.clientShortName} », ${edrpouPart} ${innPart}`.trim();

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
                <Typography variant='body2'>
                  {client_typeAndShortNameAndEDRPOU_INN}
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Typography variant='body2'>
                  {executor_typeAndShortNameAndEDRPOU_INN}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '50%' }}>
                <Typography variant='body2'>
                  Адреса: {executor_firmAddressWithPostIndex}
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Typography variant='body2'>
                  Адреса: {client_firmAddressWithPostIndex}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '50%' }}>
                <Typography variant='body2'>IBAN: {executor_iban}</Typography>
              </TableCell>
              <TableCell sx={{ width: '50%' }}>
                <Typography variant='body2'>IBAN: {client_iban}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography variant='h5' align='center'>
                  {aktCaption || ''}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography variant='h6' align='center'>
                  Від &quot;___&quot; _______________{aktDateToString || ''} р.
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
                  Договір № {contractNumber || ''} від{' '}
                  {contractDateToString || ''}
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
                <Typography variant='body2'>
                  {executor_bossLongImenitelny}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '60%' }}>
                <Typography variant='body2'>
                  та представник Виконавця:
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '40%' }}>
                <Typography variant='body2'>
                  {client_bossLongImenitelny}
                </Typography>
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

export default AktToPrint;
