import bcrypt from "bcrypt";

const password = "Krishna@8018"; // Your seller password

const generateHash = async () => {
  const hash = await bcrypt.hash(password, 10);

  console.log(hash);
};

generateHash();