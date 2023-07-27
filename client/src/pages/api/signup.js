import bcrypt from "bcrypt";

import { random_string } from "@/utility";
import psql from "../../database.config";

export default async function handler(req, res) {
  const body = { uid: random_string(10), ...req.body };
  if (req.method === "POST") {
    let result =
      await psql`select * from users where username = ${body.username}`;
    if (result.length > 0) {
      res.status(200).json(`Username is already taken`);
      return;
    }

    result = await psql`select * from users where email = ${body.email}`;
    if (result.length > 0) {
      res.status(200).json("Email is already registered");
      return;
    }

    const saltRound = 10;
    const hash = await bcrypt.hash(body.password, saltRound);

    body.password = hash;
    await psql`insert into users values ${psql(body)}`;
    res.status(200).json("Successful");
  }
}
