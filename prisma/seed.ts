// prisma/seed.ts

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const DATE_ARRAY = [new Date (2023, 5, 19), new Date (2023, 5, 17), new Date (2023, 6, 16),new Date (2023, 5, 15),new Date (2023, 5, 14),new Date (2023, 5, 13)];

async function main() {
  await prisma.set.deleteMany({});
  await prisma.exercise.deleteMany({});
  await prisma.workOut.deleteMany({});

  for (const DATE of DATE_ARRAY) {
    const workout = await prisma.workOut.create({
      data: {
        createdAt: DATE
      },
    });
    const exercise1 = await prisma.exercise.create({
      data: {
        name: 'Chess Press',
        workOutId: workout.id,
      }
    });
    const exercise2 = await prisma.exercise.create({
      data: {
        name: 'Stationary Bike',
        workOutId: workout.id,
      },  
    });
    const exercise3 = await prisma.exercise.create({
      data: {
        name: 'Rows',
        workOutId: workout.id,
      },
    });
  
    await prisma.set.createMany({
      data: [
        {
          weight: 55,
          repetitions: 10,
          exerciseId: exercise1.id,
        },
        {
          weight: 60,
          repetitions: 10,
          exerciseId: exercise1.id,
        },
        {
          weight: 65,
          repetitions: 8,
          exerciseId: exercise1.id,
        },
        {
          duration: 30,
          exerciseId: exercise2.id,
        },
        {
          weight: 65,
          repetitions: 10,
          exerciseId: exercise3.id,
        },
        {
          weight: 70,
          repetitions: 10,
          exerciseId: exercise3.id,
        },
        {
          weight: 75,
          repetitions: 8,
          exerciseId: exercise3.id,
        },
      ]
    });  
  }
};

main().then(() => {
  console.log("Data seeded...");
});
