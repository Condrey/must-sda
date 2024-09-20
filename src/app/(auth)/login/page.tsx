import LoginImage from "@/assets/login-image.jpg";
import { webName } from "@/lib/utils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "./login-form";

export const metadata: Metadata = {
  title: "Login",
};
export default function Page() {
  return (
    <main className="flex min-h-dvh items-center p-5">
      <div className="mx-auto flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-xl bg-card shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <h1 className="text-3xl font-bold">{`Login to ${webName}`}</h1>
          <div className="space-y-5">
            <LoginForm />
            <Link
              href={`/signup`}
              className="block text-center hover:underline"
            >
              {`Don't have an account? SignUp`}
            </Link>
          </div>
        </div>

        <Image
          src={LoginImage}
          alt=""
          className="hidden w-1/2 object-cover md:block"
        />
      </div>
    </main>
  );
}
