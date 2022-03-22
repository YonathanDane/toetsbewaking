import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

// const alice = await prisma.user.upsert({
//   where: { email: 'alice@prisma.io' },
//   update: {},
//   create: {
//     email: 'alice@prisma.io',
//     name: 'Alice',
//     posts: {
//       create: {
//         title: 'Check out Prisma with Next.js',
//         content: 'https://www.prisma.io/nextjs',
//         published: true,
//       },
//     },
//   },
// }
async function main() {
  const now = new Date();

  await prisma.opleiding.upsert({
    where: { id: "a4" },
    create: { id: "a4" },
    update: {},
  });
  await prisma.opleiding.upsert({
    where: { id: "a5" },
    create: { id: "a5" },
    update: {},
  });
  await prisma.opleiding.upsert({
    where: { id: "a6" },
    create: { id: "a6" },
    update: {},
  });
  await prisma.opleiding.upsert({
    where: { id: "h4" },
    create: { id: "h4" },
    update: {},
  });
  await prisma.opleiding.upsert({
    where: { id: "h5" },
    create: { id: "h5" },
    update: {},
  });

  await prisma.schooljaar.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      omschrijving: '2021/2022',
      Periodes: {
        create: [{
          id: 1,
          periode: '1',
          inschrijvenVanaf: new Date(now.getFullYear(), now.getMonth() - 2, 1),
          inschrijvenTm: new Date(now.getFullYear(), now.getMonth() - 1, 0),
        },
        {
          id: 2,
          periode: '2',
          inschrijvenVanaf: new Date(now.getFullYear(), now.getMonth() - 1, 1),
          inschrijvenTm: new Date(now.getFullYear(), now.getMonth(), 0),
        },
        {
          id: 3,
          periode: '3',
          inschrijvenVanaf: new Date(now.getFullYear(), now.getMonth(), 1),
          inschrijvenTm: new Date(now.getFullYear(), now.getMonth() + 1, 0),
        }],
      },
    },
  });

  // await prisma.toets.upsert({
  //   where: { periodeId_toetscode: { periodeId: 3, toetscode: "v ak t2" } },
  //   create: { toetscode: "v ak t2", periodeId: 3, opleidingId: "A4", duur: 60, omschrijving: "Wereld B1 - Verschillen in de wereld", inhalen: 1, herkansen: 1 },
  //   update: {},
  // });

  // await prisma.toets.upsert({
  //   where: { periodeId_toetscode: { periodeId: 3, toetscode: "v ges t6" } },
  //   create: { toetscode: "v ges t6", periodeId: 3, opleidingId: "A4", duur: 60, omschrijving: "Thema 2: HC Verlichting 1650-1900 en tijdvak 7", inhalen: 1, herkansen: 1 },
  //   update: {},
  // });

  await prisma.gebruiker.upsert({
    where: { stamnummer: "1234" },
    create: {   
      stamnummer: "1234",
      roepnaam: "Arie",
      voorletters: "A.W.",
      tussenvoegsel: "de",
      achternaam: "Wild",
      klas: "h5b",
      opleidingId: "h5", 
      is_docent: 0
    },
    update: {},
  });

  await prisma.gebruiker.upsert({
    where: { stamnummer: "1235" },
    create: {   
      stamnummer: "1235",
      roepnaam: "Mark",
      voorletters: "M.C.P.",
      tussenvoegsel: "van de",
      achternaam: "Wetering",
      klas: null,
      opleidingId: null, 
      is_docent: 1
    },
    update: {},
  });
}


main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })