import bcrypt from "bcrypt";

const password = "123456"; // Your seller password

const generateHash = async () => {
  const hash = await bcrypt.hash(password, 10);

  console.log(hash);
};

generateHash();