const { faker } = require("@faker-js/faker");

// create Random users

//  function createRandomUser() {
//   return {
//     email: faker.internet.email(),
//     userName: faker.internet.userName(),
//     password: faker.internet.password(),
//   };
// }
// const users = faker.helpers.multiple(createRandomUser, {
//   count: 10,
// });

// /////////------------------------------///////////

// Create Random Posts

// function createRandomPost() {
//   return {
//     content: faker.lorem.paragraph(2),
//     authorId: faker.number.int({ min: 1, max: 10 }),
//   };
// }

// const posts = faker.helpers.multiple(createRandomPost, {
//   count: 10,
// });

// console.log(posts)

// /////////-------------------------------/////////

// create random profile

function createRandomProfilePic() {
  return faker.image.avatar();
}
const avatars = faker.helpers.multiple(createRandomProfilePic, {
  count: 10,
});
function createRandomBio() {
  return faker.person.bio();
}

const bios = faker.helpers.multiple(createRandomBio, {
  count: 10,
});

const profiles = [
  {
    firstName: "zetta",
    bio: bios[0],
    profilePic: avatars[0],
    userId: 1,
  },
  {
    firstName: "Kristofer ",
    lastName: "Ziemann",
    bio: bios[1],
    profilePic: avatars[1],
    userId: 2,
  },
  {
    firstName: "Samara",
    lastName: "Erdman",
    bio: bios[2],
    profilePic: avatars[2],
    userId: 3,
  },
  {
    firstName: "Princess",
    lastName: "Stokes",
    bio: bios[3],
    profilePic: avatars[3],
    userId: 4,
  },
  {
    firstName: "Haylee",
    bio: bios[4],
    profilePic: avatars[4],
    userId: 5,
  },
  {
    firstName: "Norma",
    lastName: "Pollich",
    bio: bios[5],
    profilePic: avatars[5],
    userId: 6,
  },
  {
    firstName: "Lila",
    bio: bios[6],
    profilePic: avatars[6],
    userId: 7,
  },
  {
    firstName: "Carole",
    lastName: "Marvin",
    bio: bios[7],
    profilePic: avatars[7],
    userId: 8,
  },
  {
    firstName: "Jared",
    lastName: "Barton",
    bio: bios[8],
    profilePic: avatars[8],
    userId: 9,
  },
  {
    firstName: "Jaeden",
    lastName: "Gulgowski",
    bio: bios[9],
    profilePic: avatars[9],
    userId: 10,
  },
];
// console.log(avatars);
// console.log(bios);
// console.log(profiles)

// //////////////////----------------------//////////////

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
//     // const addUsers = await prisma.user.createMany({
//     //     data: users,
//     //     skipDuplicates: true
//     // })
//     // console.log("addUsers :", addUsers)

//     const addPosts = await prisma.post.createMany({
//         data: posts,
//         skipDuplicates: true
//     })
    const addProfile = await prisma.profile.createMany({
        data: profiles,
        skipDuplicates: true
    })
    console.log(addProfile)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
