import prisma from '$lib/prisma'
import Papa from 'papaparse';

export const importToetsen = async (schooljaarId, csv) => {
  const data = Papa.parse(csv, { header: true, skipEmptyLines: 'greedy' });
  if (data.errors.length) {
    return { error: data.errors[0] };
  }
    
  const schooljaar = await prisma.schooljaar.findFirst({
    where: {
      id: parseInt(schooljaarId),
    },
    include: {
      Periodes: true,
    }
  });

  const opleidingen = await prisma.opleiding.findMany();

  if (!schooljaar) {
    return { error: "Schooljaar niet gevonden" };
  }

  const result = [];
  for (const toets of data.data) {
    const periode = schooljaar.Periodes.find(p => p.periode === toets.periode);
    if (!periode) {
      console.log("Periode niet gevonden: " + toets.periode);
      continue;
    }

    const opleiding = opleidingen.find(o => o.id === toets.opleiding.toLowerCase());
    if (!opleiding) {
      console.log("Opleiding niet gevonden: " + toets.opleiding);
      continue;
    }

    const duur = parseInt(toets.duur.replace('min', '').trim());
    if (!duur) {
      console.log("Foutieve duur: " + toets.duur);
      continue;
    }

    const toetsData = {
      periodeId: periode.id,
      opleidingId: opleiding.id,
      toetscode: toets.toetscode,
      duur, 
      omschrijving: toets.toetsstof,
      inhalen: toets['inhalen ja of nee'] === 'ja' ? 1 : 0,
      herkansen: toets['herkansen ja of nee'] === 'ja' ? 1 : 0,
    };

    const upsertUser = await prisma.toets.upsert({
      where: {
        periodeId_toetscode: { periodeId: periode.id, toetscode: toets.toetscode },
      },
      update: toetsData,
      create: toetsData,
    });
    result.push(upsertUser);
  }

  return result;

}
