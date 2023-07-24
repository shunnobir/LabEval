import { random_string } from "@/utility";
import psql from "../../database.config";

export default async function handler(req, res) {
  const body = { uid: random_string(10), ...req.body };
  if (req.method === "POST") {
    let result =
      await psql`select * from users where username = ${body.username}`;
    if (result.length === 0) {
      res.status(200).json({ status: `Username not registered` });
      return;
    }

    result =
      await psql`select * from users where username = ${body.username} and password = ${body.password}`;

    if (result.length === 0) {
      res.status(200).json({ status: "Wrong Password" });
      return;
    }

    if (result[0].role !== body.role) {
      res.status(200).json({ status: "Invalid role selection" });
      return;
    }

    if (result[0].accepted === "f") {
      res.status(200).json({
        status:
          "Your Instructor role request has not been accepted yet. Contact system admin.",
      });
      return;
    }

    res
      .status(200)
      .json({ status: "Successful", data: { ...result[0], password: "" } });
  }
}