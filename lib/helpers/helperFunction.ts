import { NextRequest } from 'next/server';
import { monthsWorkBudjet } from '@/constants/constants';
import { I_Client, I_ClientType } from '@/interfaces/refdata';

import { get__all, item__get_one } from '@/lib/actions/refdata.actions';

const genNumberByDate = (enteredDate: Date) => {
  const fullYear = enteredDate.getFullYear();
  const month =
    enteredDate.getMonth() < 9
      ? `0${enteredDate.getMonth() + 1}`
      : enteredDate.getMonth() + 1;

  const day =
    enteredDate.getDate() < 10
      ? `0${enteredDate.getDate()}`
      : enteredDate.getDate();
  const hours =
    enteredDate.getHours() < 10
      ? `0${enteredDate.getHours()}`
      : enteredDate.getHours();
  const minutes =
    enteredDate.getMinutes() < 10
      ? `0${enteredDate.getMinutes()}`
      : enteredDate.getMinutes();

  const doc__Number = `${fullYear - 2000}.${month}.${day}.${hours}.${minutes}`;

  return doc__Number;
};

export const generateDocNumber = (): string => {
  const newDate = new Date();
  const doc__Number = genNumberByDate(newDate);

  return doc__Number;
};

export const generateMultipleDocNumbers = () => {
  const oneMinute = 60 * 1000;
  const ms = Date.now();

  const invoiceBaseDate = new Date(ms + oneMinute);
  const invoiceNaklDate = new Date(ms + oneMinute * 2);
  const invoiceAktDate = new Date(ms + oneMinute * 3);
  const aktDate = new Date(ms + oneMinute * 4);
  const naklDate = new Date(ms + oneMinute * 5);
  const koshtorisDate = new Date(ms + oneMinute * 6);
  const contrProectAvtorskDate = new Date(ms + oneMinute * 7);
  const aktProectAvtorskDate = new Date(ms + oneMinute * 8);

  const jurnalAvtoskiyDate = new Date(ms + oneMinute * 9);
  const jurnalRabotDate = new Date(ms + oneMinute * 10);
  const prikazGipDate = new Date(ms + oneMinute * 11);
  const prikazEngineerDate = new Date(ms + oneMinute * 12);
  const prikazOhranaTrudaDate = new Date(ms + oneMinute * 13);

  const invoiceNumberBase = genNumberByDate(invoiceBaseDate);
  const invoiceNumberNakl = genNumberByDate(invoiceNaklDate);
  const invoiceNumberAkt = genNumberByDate(invoiceAktDate);
  const aktNumber = genNumberByDate(aktDate);
  const naklNumber = genNumberByDate(naklDate);
  const koshtorisNumber = genNumberByDate(koshtorisDate);
  const contrProectAvtorskNumber = genNumberByDate(contrProectAvtorskDate);
  const aktProectAvtorskNumber = genNumberByDate(aktProectAvtorskDate);

  const jurnalAvtoskiyNumber = genNumberByDate(jurnalAvtoskiyDate);
  const jurnalRabotNumber = genNumberByDate(jurnalRabotDate);
  const prikazGipNumber = genNumberByDate(prikazGipDate);
  const prikazEngineeNumber = genNumberByDate(prikazEngineerDate);
  const prikazOhranaTrudaNumber = genNumberByDate(prikazOhranaTrudaDate);

  return {
    invoiceNumberBase,
    invoiceNumberNakl,
    invoiceNumberAkt,

    aktNumber,
    naklNumber,
    koshtorisNumber,

    contrProectAvtorskNumber,
    aktProectAvtorskNumber,

    jurnalAvtoskiyNumber,
    jurnalRabotNumber,
    prikazGipNumber,
    prikazEngineeNumber,
    prikazOhranaTrudaNumber,
  };
};

export const setDefaultMonths = () => {
  const newDate = new Date();
  const currentDate = newDate.getDate();
  const currentMonth = newDate.getMonth();

  let startMonth = '';
  let endMonth = '';

  if ((currentMonth === 10 && currentDate > 20) || currentMonth === 11) {
    startMonth = monthsWorkBudjet[11]._id;
    endMonth = monthsWorkBudjet[11]._id;
  } else if (currentDate > 20) {
    startMonth = monthsWorkBudjet[currentMonth + 1]._id;
    endMonth = monthsWorkBudjet[currentMonth + 2]._id;
  } else {
    startMonth = monthsWorkBudjet[currentMonth]._id;
    endMonth = monthsWorkBudjet[currentMonth + 1]._id;
  }
  return {
    startMonth,
    endMonth,
  };
};

export const separateFirms = async () => {
  const arr__ourFirms: I_Client[] = [];
  const arr__Clients: I_Client[] = [];

  const all__ClientTypes = await get__all(
    { page: '0', limit: '0', filter: '' },
    '/accountant/refdata/client-type'
  );

  const allFirms = await get__all(
    { page: '0', limit: '0', filter: '' },
    '/manager/refdata/client'
  );

  const ourFirmObj = all__ClientTypes.items.find(
    (item: I_ClientType) => item.clientTypeName === 'наша фирма'
  );

  for (const item of allFirms.items) {
    const hasOurFirm = item.clientType?.some(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      (oneType) => oneType._id === ourFirmObj?._id
    );

    if (hasOurFirm) {
      arr__ourFirms.push(item);
    } else {
      arr__Clients.push(item);
    }
  }

  return {
    arr__ourFirms,
    arr__Clients,
  };
};

export const commonSearchParams = (request: NextRequest) => {
  const url = new URL(request.url);
  const page = Number.parseInt(url.searchParams.get('page') ?? '0');
  const pageSize = Number.parseInt(url.searchParams.get('limit') ?? '0');
  const skip = (page - 1) * pageSize;
  const filterSTR = url.searchParams.get('filter') ?? '';

  return { url, pageSize, skip, filterSTR };
};

export const getAll_ContractFields = async (contractId: string) => {
  const currentContract = await item__get_one(
    { _id: contractId },
    '/manager/refdata/contract'
  );

  if (currentContract) {
    return {
      contractID: (currentContract._id as string) || '',
      contractNumber: currentContract.contractNumber || '',
      ourFirmID: (currentContract.ourFirm._id as string) || '',
      clientID: (currentContract.client._id as string) || '',
      clientfirmTypeShortName:
        currentContract.client.firmType.firmTypeShortName || '',
      formatedContractDate:
        new Date(currentContract.contractDate).toLocaleDateString('uk-UA', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }) || '',
      contractDescription: currentContract.contractDescription || '',
      workAddress: currentContract.workAddress || '',
      contractTypeName: currentContract.contractType.contractTypeName || '',

      guaranteePeriod: currentContract.guaranteePeriod || '',

      prepaymentPercentage: currentContract.prepaymentPercentage || 0,

      invoiceNumberBase: currentContract.invoiceNumberBase || '',
      invoiceNumberNakl: currentContract.invoiceNumberNakl || '',
      invoiceNumberAkt: currentContract.invoiceNumberAkt || '',

      aktNumber: currentContract.aktNumber || '',
      naklNumber: currentContract.naklNumber || '',
      koshtorisNumber: currentContract.koshtorisNumber || '',

      contrProectAvtorskNumber: currentContract.contrProectAvtorskNumber || '',
      aktProectAvtorskNumber: currentContract.aktProectAvtorskNumber || '',

      jurnalAvtoskiyNumber: currentContract.jurnalAvtoskiyNumber || '',
      jurnalRabotNumber: currentContract.jurnalRabotNumber || '',
      prikazGipNumber: currentContract.prikazGipNumber || '',
      prikazEngineeNumber: currentContract.prikazEngineeNumber || '',
      prikazOhranaTrudaNumber: currentContract.prikazOhranaTrudaNumber || '',

      proectnSumBudjet: currentContract.proectnSumBudjet || 0,
      avtorskSumBudjet: currentContract.avtorskSumBudjet || 0,
      expertizaSumBudjet: currentContract.expertizaSumBudjet || 0,
      tehnadzorSumBudjet: currentContract.tehnadzorSumBudjet || 0,
      tehnadzorSumBudjetGlava1_9:
        currentContract.tehnadzorSumBudjetGlava1_9 || 0,

      zvedeniySumBudjet: currentContract.zvedeniySumBudjet || 0,
      dogovornayaSumBudjet: currentContract.dogovornayaSumBudjet || 0,
      dopUgodaSum: currentContract.dopUgodaSum || 0,

      salaryMin: currentContract.salaryMin || 0,
      salaryLevel_3_8: currentContract.salaryLevel_3_8 || 0,
      planPributokSum: currentContract.planPributokSum || 0,
      adminVytratySum: currentContract.adminVytratySum || 0,
      salaryOneDaySum: currentContract.salaryOneDaySum || 0,
      lifeTime: currentContract.lifeTime || 0,
      whereWirkIsPerfomed: currentContract.whereWirkIsPerfomed || '',
      servWorkShortForJournal: currentContract.servWorkShortForJournal || '',

      paymentSourceProectnAvt: currentContract.paymentSourceProectnAvt || '',
      startMonthWorkBudjet: currentContract.startMonthWorkBudjet || '',
      endMonthWorkBudjet: currentContract.endMonthWorkBudjet || '',
      kodDkBudjet: currentContract.kodDkBudjet || '',

      formatedEndWorkRemservis:
        new Date(currentContract.endWorkRemservis).toLocaleDateString('uk-UA', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }) || '',

      remsCalendarGrafikUnit: currentContract.remsCalendarGrafikUnit || '',
      remsCalendarGrafikAmount: currentContract.remsCalendarGrafikAmount || 0,

      remsAktSkrytRabotWork: currentContract.remsAktSkrytRabotWork || '',
      remsAktSkrytRabotMaterial:
        currentContract.remsAktSkrytRabotMaterial || '',
    };
  } else {
    return undefined;
  }
};

export const getAll_FirmFields = async (
  firmID: string,
  mode: 'client' | 'executor'
) => {
  const currentFirm = await item__get_one(
    { _id: firmID },
    '/manager/refdata/client'
  );
  if (currentFirm) {
    return {
      [`${mode}_firmID`]: (currentFirm._id as string) || '',
      [`${mode}_firmTypeShortName`]:
        currentFirm.firmType.firmTypeShortName || '',
      [`${mode}_firmTypeLongName`]: currentFirm.firmType.firmTypeLongName || '',
      [`${mode}_firmLongName`]: currentFirm.clientLongName || '',
      [`${mode}_firmShortName`]: currentFirm.clientShortName || '',

      [`${mode}_postIndex`]: currentFirm.postIndex || '',
      [`${mode}_address`]: currentFirm.address || '',
      [`${mode}_edrpou`]: currentFirm.edrpou || '',
      [`${mode}_inn`]: currentFirm.inn || '',
      [`${mode}_iban`]: currentFirm.iban || '',
      [`${mode}_iban_budget`]: currentFirm.iban_budget || '',
      [`${mode}_firstName_imen`]: currentFirm.firstName_imen || '',
      [`${mode}_patronymic_imen`]: currentFirm.patronymic_imen || '',
      [`${mode}_lastName_imen`]: currentFirm.lastName_imen || '',
      [`${mode}_firstName_rodit`]: currentFirm.firstName_rodit || '',
      [`${mode}_patronymic_rodit`]: currentFirm.patronymic_rodit || '',
      [`${mode}_lastName_rodit`]: currentFirm.lastName_rodit || '',
      [`${mode}_certificateNumber`]: currentFirm.certificateNumber || '',
      [`${mode}_representedBy`]: currentFirm.representedBy || '',
      [`${mode}_whichActsOnTheBasis`]: currentFirm.whichActsOnTheBasis || '',
      [`${mode}_jobTitle`]: currentFirm.jobTitle || '',
      [`${mode}_jobTitle_rodit`]: currentFirm.jobTitle_rodit || '',
      [`${mode}_tax`]: currentFirm.tax || 0,
      [`${mode}_taxationTypeName`]:
        currentFirm.taxationType.taxationTypeName || '',
      [`${mode}_certificate_PDV`]: currentFirm.certificate_PDV || '',
      [`${mode}_telNumber`]: currentFirm.telNumber || '',
      [`${mode}_email`]: currentFirm.email || '',
    };
  } else {
    return undefined;
  }
};
