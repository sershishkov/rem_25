import {
  I_Contract,
  I_Client,
  I_CalendarnGrafik,
  I_ServiceWorkInCalendarnGrafik,
} from '@/interfaces/refdata';

import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';

import classes from './styles.module.scss';
const fillColor = '#c0bdbd';
const widthColumnUnit = '11mm';
const widthColumnAmount = '11mm';
const widthColumnMonths = '9mm';

export default function CalendarnGraficToPrint({
  contractObj,
  clientObj,
  executorObj,
  currentCalendGrafic,
}: Readonly<{
  contractObj: I_Contract;
  clientObj: I_Client;
  executorObj: I_Client;
  currentCalendGrafic: I_CalendarnGrafik;
}>) {
  const tableRows: I_ServiceWorkInCalendarnGrafik[] =
    currentCalendGrafic?.serviceWorks;

  const contrDateStr = new Date(
    contractObj?.contractDate ?? ''
  ).toLocaleDateString('uk-UA', {
    year: 'numeric',
  });
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const currentContractType = contractObj?.contractType?.contractTypeName;

  const contractDescription = contractObj?.contractDescription;
  const remsCalendarGrafikUnit = contractObj?.remsCalendarGrafikUnit;
  const remsCalendarGrafikAmount = contractObj?.remsCalendarGrafikAmount;

  const startMonthWorkBudjet = contractObj?.startMonthWorkBudjet;
  const endMonthWorkBudjet = contractObj?.endMonthWorkBudjet;

  let executor_TypeShort = '';
  let executor_ShortName = '';
  let executor_JobTitleImen = '';
  let executor_bossShort = '';
  let executor_EDRPO = '';
  let executor_iban = '';
  let executor_firmAddressWithPostIndex = '';
  let executor_Tel = '';
  let executor_Email = '';

  let client_TypeShort = '';
  let client_ShortName = '';
  let client_JobTitleImen = '';
  let client_bossShort = '';
  let client_EDRPO = '';
  let client_iban = '';
  let client_firmAddressWithPostIndex = '';
  let client_Tel = '';
  let client_Email = '';

  if (executorObj !== undefined) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    executor_TypeShort = executorObj.firmType?.firmTypeShortName;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    executor_ShortName = executorObj.clientShortName;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    executor_JobTitleImen = executorObj.jobTitle;
    executor_bossShort = `${
      executorObj.firstName_imen
    } ${executorObj.lastName_imen?.toUpperCase()}`.trim();

    executor_iban = executorObj.iban || '';
    executor_EDRPO = executorObj?.edrpou
      ? `ЄДРПОУ: ${executorObj?.edrpou}`
      : '';

    executor_firmAddressWithPostIndex =
      ` ${executorObj.postIndex}, ${executorObj.address}`.trim();
    executor_Tel = executorObj.telNumber ? `Тел:${executorObj.telNumber}` : '';
    executor_Email = executorObj.email ? `email:${executorObj?.email}` : '';
  }

  if (clientObj !== undefined) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    client_TypeShort = clientObj?.firmType?.firmTypeShortName;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    client_ShortName = clientObj?.clientShortName;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    client_JobTitleImen = clientObj?.jobTitle;
    client_bossShort = `${
      clientObj.firstName_imen
    } ${clientObj.lastName_imen?.toUpperCase()}`.trim();

    client_iban = clientObj.iban || '';
    client_EDRPO = clientObj?.edrpou ? `ЄДРПОУ: ${clientObj?.edrpou}` : '';

    client_firmAddressWithPostIndex =
      ` ${clientObj.postIndex}, ${clientObj.address}`.trim();
    client_Tel = clientObj.telNumber ? `Тел:${clientObj.telNumber}` : '';
    client_Email = clientObj.email ? `email:${clientObj.email}` : '';
  }

  return (
    <div className={classes.page} id='page'>
      {currentContractType !== 'Ремсервис (бюджет)' && (
        <TableContainer
          id='table-calendarn-grafik-header'
          sx={{ marginBottom: 2 }}
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
                <TableCell>
                  <Typography
                    variant='body1'
                    className={classes['calendarn-grafik-text']}
                    align='center'
                  >
                    Календарний графік виконання робіт
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography
                    variant='body1'
                    className={classes['calendarn-grafik-text']}
                    align='center'
                  >
                    <strong>{contractDescription} </strong>
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography
                    variant='body1'
                    className={classes['calendarn-grafik-text']}
                    align='center'
                  >
                    Терміни виконання робіт: {startMonthWorkBudjet} -{' '}
                    {endMonthWorkBudjet}
                    {contrDateStr} року
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {currentContractType === 'Ремсервис (бюджет)' && (
        <TableContainer
          id='table-calendarn-grafik-header2'
          sx={{ marginBottom: 2 }}
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
                <TableCell>
                  <Typography
                    variant='body1'
                    className={classes['calendarn-grafik-text']}
                    align='right'
                  >
                    Додаток до договору № _________ від «___» ________{' '}
                    {contrDateStr} р
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography
                    variant='body1'
                    className={classes['calendarn-grafik-text']}
                    align='center'
                  >
                    <strong>Календарний графік виконання робіт </strong>
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography
                    variant='body1'
                    className={classes['calendarn-grafik-text']}
                    align='center'
                  >
                    {contractDescription}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {currentContractType !== 'Ремсервис (бюджет)' && (
        <TableContainer
          id='table-calendarn-grafik-main'
          sx={{ marginBottom: 2 }}
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
                  border: '1px solid black',
                },
              }}
            >
              <TableRow>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-text']}
                    align='center'
                  >
                    <strong>
                      Перелік видів робіт (у розрізі розділів локальних
                      кошторисів)
                    </strong>
                  </Typography>
                </TableCell>
                <TableCell sx={{ width: '20mm' }}>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-text']}
                    align='center'
                  >
                    <strong>Одиниця виміру</strong>
                  </Typography>
                </TableCell>
                <TableCell sx={{ width: '20mm' }}>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-text']}
                    align='center'
                  >
                    <strong>Кіль кість</strong>
                  </Typography>
                </TableCell>
              </TableRow>
              {tableRows &&
                tableRows.length > 0 &&
                tableRows.map((row) => (
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-ignore
                  <TableRow key={`${row._id}`}>
                    <TableCell>
                      <Typography
                        pl={1}
                        variant='body2'
                        className={classes['calendarn-grafik-text']}
                      >
                        {row.serviceWork}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant='body2'
                        className={classes['calendarn-grafik-text']}
                        align='center'
                      >
                        {row.unit}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant='body2'
                        className={classes['calendarn-grafik-text']}
                        align='center'
                      >
                        {row.amount}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {currentContractType === 'Ремсервис (бюджет)' && (
        <TableContainer
          id='table-calendarn-grafik-main2'
          sx={{ marginBottom: 2 }}
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
                  border: '1px solid black',
                },
              }}
            >
              <TableRow>
                <TableCell rowSpan={5}>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-text']}
                    align='center'
                  >
                    <strong>
                      Перелік видів робіт (у розрізі розділів локальних
                      кошторисів)
                    </strong>
                  </Typography>
                </TableCell>
                <TableCell rowSpan={5}>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-text']}
                    align='center'
                    sx={{ wordWrap: 'break-word', width: widthColumnUnit }}
                  >
                    <strong>Одиниця виміру</strong>
                  </Typography>
                </TableCell>
                <TableCell rowSpan={5}>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-text']}
                    align='center'
                    sx={{ wordWrap: 'break-word', width: widthColumnAmount }}
                  >
                    <strong>Кількість</strong>
                  </Typography>
                </TableCell>
                <TableCell colSpan={9}>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-text']}
                    align='center'
                  >
                    <strong>Строки виконання робіт</strong>
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={9}>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-text']}
                    align='center'
                  >
                    <strong>{contrDateStr} рік</strong>
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3}>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-text']}
                    align='center'
                  >
                    <strong>2 квартал </strong>
                  </Typography>
                </TableCell>
                <TableCell colSpan={3}>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-text']}
                    align='center'
                  >
                    <strong>3 квартал </strong>
                  </Typography>
                </TableCell>
                <TableCell colSpan={3}>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-text']}
                    align='center'
                  >
                    <strong>4 квартал </strong>
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow sx={{ height: '30mm' }}>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-vertical-text']}
                    align='center'
                    sx={{ width: widthColumnMonths }}
                  >
                    <strong>квітень</strong>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-vertical-text']}
                    align='center'
                    sx={{ width: widthColumnMonths }}
                  >
                    <strong>травень </strong>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-vertical-text']}
                    align='center'
                    sx={{ width: widthColumnMonths }}
                  >
                    <strong>червень </strong>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-vertical-text']}
                    align='center'
                    sx={{ width: widthColumnMonths }}
                  >
                    <strong>липень </strong>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-vertical-text']}
                    align='center'
                    sx={{ width: widthColumnMonths }}
                  >
                    <strong>серпень </strong>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-vertical-text']}
                    align='center'
                    sx={{ width: widthColumnMonths }}
                  >
                    <strong>вересень </strong>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-vertical-text']}
                    align='center'
                    sx={{ width: widthColumnMonths }}
                  >
                    <strong>жовтень </strong>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-vertical-text']}
                    align='center'
                    sx={{ width: widthColumnMonths }}
                  >
                    <strong>листопад </strong>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-vertical-text']}
                    align='center'
                    sx={{ width: widthColumnMonths }}
                  >
                    <strong>грудень </strong>
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={9} sx={{ height: '5mm' }}></TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-text']}
                    align='center'
                  >
                    {contractDescription}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-text']}
                    align='center'
                    sx={{ width: widthColumnUnit }}
                  >
                    {remsCalendarGrafikUnit}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-text']}
                    align='center'
                    sx={{ width: widthColumnAmount }}
                  >
                    {remsCalendarGrafikAmount}
                  </Typography>
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor:
                      startMonthWorkBudjet === 'квітень' ||
                      endMonthWorkBudjet === 'квітень'
                        ? fillColor
                        : undefined,
                  }}
                ></TableCell>
                <TableCell
                  sx={{
                    backgroundColor:
                      startMonthWorkBudjet === 'травень' ||
                      endMonthWorkBudjet === 'травень'
                        ? fillColor
                        : undefined,
                  }}
                ></TableCell>
                <TableCell
                  sx={{
                    backgroundColor:
                      startMonthWorkBudjet === 'червень' ||
                      endMonthWorkBudjet === 'червень'
                        ? fillColor
                        : undefined,
                  }}
                ></TableCell>
                <TableCell
                  sx={{
                    backgroundColor:
                      startMonthWorkBudjet === 'липень' ||
                      endMonthWorkBudjet === 'липень'
                        ? fillColor
                        : undefined,
                  }}
                ></TableCell>
                <TableCell
                  sx={{
                    backgroundColor:
                      startMonthWorkBudjet === 'серпень' ||
                      endMonthWorkBudjet === 'серпень'
                        ? fillColor
                        : undefined,
                  }}
                ></TableCell>
                <TableCell
                  sx={{
                    backgroundColor:
                      startMonthWorkBudjet === 'вересень' ||
                      endMonthWorkBudjet === 'вересень'
                        ? fillColor
                        : undefined,
                  }}
                ></TableCell>
                <TableCell
                  sx={{
                    backgroundColor:
                      startMonthWorkBudjet === 'жовтень' ||
                      endMonthWorkBudjet === 'жовтень'
                        ? fillColor
                        : undefined,
                  }}
                ></TableCell>
                <TableCell
                  sx={{
                    backgroundColor:
                      startMonthWorkBudjet === 'листопад' ||
                      endMonthWorkBudjet === 'листопад'
                        ? fillColor
                        : undefined,
                  }}
                ></TableCell>
                <TableCell
                  sx={{
                    backgroundColor:
                      startMonthWorkBudjet === 'грудень' ||
                      endMonthWorkBudjet === 'грудень'
                        ? fillColor
                        : undefined,
                  }}
                ></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <TableContainer id='table-calendarn-grafik-sign'>
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
                paddingRight: '2px',
              },
            }}
          >
            <TableRow>
              <TableCell sx={{ width: '50%' }}>
                <Typography
                  variant='body2'
                  className={classes['calendarn-grafik-text']}
                  align='center'
                >
                  ПІДРЯДНИК
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['calendarn-grafik-text']}
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
                  className={classes['calendarn-grafik-text']}
                >
                  {executor_TypeShort} «{executor_ShortName}»{' '}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['calendarn-grafik-text']}
                >
                  {client_TypeShort} «{client_ShortName}»{' '}
                </Typography>
              </TableCell>
            </TableRow>
            {(executor_firmAddressWithPostIndex !== '' ||
              client_firmAddressWithPostIndex !== '') && (
              <TableRow>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-text']}
                  >
                    {executor_firmAddressWithPostIndex}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-text']}
                  >
                    {client_firmAddressWithPostIndex}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {(executor_EDRPO !== '' || client_EDRPO !== '') && (
              <TableRow>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-text']}
                  >
                    {executor_EDRPO}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-text']}
                  >
                    {client_EDRPO}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {(executor_iban !== '' || client_iban !== '') && (
              <TableRow>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-text']}
                  >
                    {executor_iban}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-text']}
                  >
                    {client_iban}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {(executor_Tel !== '' || client_Tel !== '') && (
              <TableRow>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-text']}
                  >
                    {executor_Tel}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-text']}
                  >
                    {client_Tel}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {(executor_Email !== '' || client_Email !== '') && (
              <TableRow>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-text']}
                  >
                    {executor_Email}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-text']}
                  >
                    {client_Email}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {(executor_JobTitleImen !== '' || client_JobTitleImen !== '') && (
              <TableRow>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-text']}
                    mb={2}
                  >
                    {executor_JobTitleImen}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    className={classes['calendarn-grafik-text']}
                    mb={2}
                  >
                    {client_JobTitleImen}
                  </Typography>
                </TableCell>
              </TableRow>
            )}

            <TableRow>
              <TableCell>
                <Grid container direction={`row`}>
                  <Grid
                    sx={{ flex: 1, borderBottom: '1px solid black' }}
                  ></Grid>
                  <Grid>
                    <Typography
                      variant='body2'
                      className={classes['calendarn-grafik-text']}
                      sx={{ paddingRight: '4px' }}
                    >
                      {executor_bossShort}
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
                      className={classes['calendarn-grafik-text']}
                      sx={{ paddingRight: '4px' }}
                    >
                      {client_bossShort}
                    </Typography>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['calendarn-grafik-text']}
                  align='left'
                >
                  м.п.
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  className={classes['calendarn-grafik-text']}
                  align='left'
                >
                  м.п.
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
