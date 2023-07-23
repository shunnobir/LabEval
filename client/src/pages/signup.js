import Image from "next/image";
import Link from "next/link";

export default function Signup() {
  return (
    <div className="signup m-auto pt-[25vh] flex flex-col w-[450px] h-fit p-8 gap-4">
      <Image
        src="/labeval_logo.png"
        alt="LabEval Logo"
        width={190}
        height={40}
        style={{ objectFit: "contain", margin: "auto" }}
      />
      <span className="text-xl font-medium text-center"> SIGNUP </span>
      <form className="signup-form flex flex-col gap-6 w-full">
        <div className="form-row flex flex-col gap-1">
          <label className="text-sm font-medium"> Username </label>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="username"
            className="h-10 px-4"
          />
        </div>
        <div className="form-row flex flex-col gap-1">
          <label className="text-sm font-medium"> Email </label>
          <input
            id="email"
            type="text"
            name="email"
            placeholder="email"
            className="h-10 px-4"
          />
        </div>
        <div className="form-row flex flex-col gap-1">
          <label className="text-sm font-medium"> Password </label>
          <input
            id="password"
            type="password"
            name="passworde"
            placeholder="password"
            className="h-10 px-4"
          />
        </div>
        <button className="bg-blue-600 text-slate-50 h-10 rounded-[5px]">
          SIGNUP
        </button>
        <span className="text-center">
          {" "}
          Already have an account? <Link href="/login"> Login </Link>{" "}
        </span>
      </form>
    </div>
  );
}
