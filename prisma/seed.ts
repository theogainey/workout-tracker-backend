// prisma/seed.ts

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const workout = await prisma.workOut.create({
    data: {},
  });

  // Create exercises for the workout
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

// Create sets for each exercise
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
};

main().then(() => {
  console.log("Data seeded...");
});
