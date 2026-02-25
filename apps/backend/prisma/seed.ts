//seeding script for some basic base information (maps)
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { hashPassword } from 'better-auth/crypto'
//eslint ignore all eslint rules here
//eslint-disable-next-line
const password = 'password123' // test password

async function seed() {
  //try to seed two test users, and the maps
  const hashedPassword = await hashPassword(password)
  try {
    await prisma.user.createMany({
      skipDuplicates: true,
      data: [
        {
          id: 'user1',
          name: 'Test User 1',
          email: 'test1@example.com',
        },
        {
          id: 'user2',
          name: 'Test User 2',
          email: ' test2@example.com',
        },
      ],
    })
    await prisma.account.createMany({
      skipDuplicates: true,
      data: [
        {
          userId: 'user1',
          accountId: 'user1',
          providerId: 'credential',
          password: hashedPassword,
        },
        {
          userId: 'user2',
          accountId: 'user2',
          providerId: 'credential',
          password: hashedPassword,
        },
      ],
    })
  } catch (error) {
    //log error but continue seeding
    //ignore no console lint here
    // eslint-disable-next-line no-console
    console.error('Error seeding accounts:', error)
  }
  //try to seed the maps
  try {
    await prisma.map.createMany({
      data: [
        { name: 'Dust II' },
        { name: 'Inferno' },
        { name: 'Mirage' },
        { name: 'Nuke' },
        { name: 'Overpass' },
        { name: 'Vertigo' },
        { name: 'Ancient' },
        { name: 'Train' },
      ],
    })
  } catch (error) {
    //log error but continue seeding
    // eslint-disable-next-line no-console
    console.error('Error seeding maps:', error)
  }
}

const main = async () => {
  await seed()
}
//ignore all eslint rules here
// eslint-disable-next-line
main()
  //eslint-disable-next-line
  .catch((e) => console.error(e))
  .finally(() => process.exit())
