import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import bcrypt from "bcrypt";

async function main() {
  const email = "superadmin@school.com"; 
  const password = "SuperSecurePassword"; 

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password: hashedPassword,
      role: "superadmin",
    },
  });

  console.log("Super Admin created successfully!");
}

main()
  .catch((e) => console.error(e))
  .finally(() => process.exit());
