const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  const createdUsers = await prisma.user.createMany({
    data: [
      { username: "a.martin", email: "alice@martin.com" },
      { username: "p_picasso", email: "pablo@picasso.es" },
      { username: "mr_mistoo", email: "mr_mistoffelees@cats.com" },
    ],
  });

  const createdProfiles = await prisma.profile.createMany({
    data: [
      {
        nickName: "Alice",
        DOB: "19/08/1980",
        profileImgUrl: "https://www.alice.com",
        biography: "I am Alice, I am Alice, I am Alice.",
        userId: 1,
      },
      {
        nickName: "Pablito",
        DOB: "28/10/1881",
        profileImgUrl: "https://www.picasso.es",
        biography: "I am Picasso...Pablo Picasso...and i paint.",
        userId: 2,
      },
      {
        nickName: "Mr. Mistoffelees",
        DOB: "19/08/1993",
        profileImgUrl: "https://www.conjuring-cat.com",
        biography: "I am the conjuring cat.",
        userId: 3,
      },
    ],
  });

  const createdPosts = await prisma.post.createMany({
    data: [
      {
        title: "My first post",
        content: "As this is my first post i will keep it very short.",
        published: false,
        imgUrl: "https://www.alice-post.com",
        userId: 1,
      },
      {
        title: "Such a happy day",
        content: "The weather is sunny, i am happy.",
        published: true,
        imgUrl: "https://www.happy-day.com",
        userId: 2,
      },
      {
        title: "My second post",
        content: "This is my second post, so I am Alice.",
        published: true,
        userId: 1,
      },
    ],
  });

  const createdComments = await prisma.comment.createMany({
    data: [
      {
        title: "I like your post",
        content: "Very very very much agree on this",
        published: true,
        postId: 2,
      },
      {
        title: "Comment Title...",
        content: "I am having a very happy day too.",
        published: true,
        postId: 2,
      },
    ],
  });

  console.log(`${createdUsers.count} users created`, createdUsers);
  console.log(`${createdProfiles.count} profiles created`, createdProfiles);
  console.log(`${createdPosts.count} posts created`, createdPosts);
  console.log(`${createdComments.count} comments created`, createdComments);

  // Don't edit any of the code below this line
  process.exit(0);
}

seed().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
