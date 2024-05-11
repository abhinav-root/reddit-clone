import { SignupForm } from "./_components/signup-form";
import GoToHome from "@/components/go-to-home";

export default function SignupPage() {
  return (
    <main>
      <section className="pt-10">
        <div className="text-left px-10">
          <GoToHome />
        </div>
        <div className="mx-auto max-w-sm">
          <SignupForm />
        </div>
      </section>
    </main>
  );
}
