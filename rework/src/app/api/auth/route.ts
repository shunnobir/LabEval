import psql, { psql2 } from "@/database.config";
import generateId from "@/app/generateId";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// type PostSignupProps = {
//   uname: string;
//   email: string;
//   password: string;
//   isInstructor: boolean;
// };

export async function GET(req: NextRequest): Promise<NextResponse> {
  const user = cookies().get("user");
  if (!user?.value) return NextResponse.json({ user: undefined, ok: false });
  else return NextResponse.json({ user: JSON.parse(user.value), ok: true });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const searchParams = req.nextUrl.searchParams;
  const auth = searchParams.get("auth");

  if (auth === "signup") {
    return signupHandler(req);
  } else if (auth === "login") {
    return loginHandler(req);
  } else {
    return logoutHandler(req);
  }
}

async function signupHandler(req: NextRequest): Promise<NextResponse> {
  try {
    const { uname, email, password, isInstructor } = await req.json();
    let user = await psql`select * from users where username = ${uname}`;
    if (user.length !== 0) {
      return NextResponse.json({
        status: `username '${uname}' is already taken`,
        ok: false,
      });
    }

    user = await psql`select * from users where email = ${email}`;
    if (user.length !== 0) {
      return NextResponse.json({
        status: `email '${email}' is already registered`,
        ok: false,
      });
    }

    user = await psql`select * from users where email = ${uname}`;
    if (user.length !== 0) {
      return NextResponse.json({
        status: `username '${uname}' is already taken`,
        ok: false,
      });
    }

    const values = {
      user_id: generateId(10),
      username: uname,
      email: email,
      password: password,
      role: isInstructor ? "instructor" : "participant",
      join_date: new Date(),
    };

    await psql`insert into users (user_id, username, email, password, role, join_date) values ${psql(
      values
    )}`;
    if (process.env.NODE_ENV === "development") {
      await psql2`insert into users (user_id, username, email, password, role, join_date)  values ${psql(
        values
      )}`;
    }
    return NextResponse.json({ status: "signed up", ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: "internal database error", ok: false });
  }
}

async function loginHandler(req: NextRequest) {
  try {
    const { uname, password, role } = await req.json();
    let user = await psql`select user_id, 
                                  username,
                                  email,
                                  password,
                                  role,
                                  avatar,
                                  institution,
                                  country,
                                  city,
                                  join_date
                            from users
                            where username = ${uname}`;
    if (user.length !== 1) {
      return NextResponse.json({
        status: `wrong credentials`,
        ok: false,
      });
    }

    if (user[0].password !== password) {
      return NextResponse.json({
        status: `wrong password`,
        ok: false,
      });
    }

    if (user[0].role !== role) {
      return NextResponse.json({
        status: `invalid credential`,
        ok: false,
      });
    }

    const sixHours = 6 * 60 * 60 * 1000;
    cookies().set("user", JSON.stringify(user[0]), {
      expires: Date.now() + sixHours,
    });
    return NextResponse.json({ status: "logged in", ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: "internal database error", ok: false });
  }
}

async function logoutHandler(req: NextRequest) {
  try {
    cookies().delete("user");
    return NextResponse.json({ status: "logged out", ok: true });
  } catch (err) {
    return NextResponse.json({
      status: `could not log out. ${err}`,
      ok: false,
    });
  }
}
