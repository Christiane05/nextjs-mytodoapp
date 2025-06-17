// app/login/page.tsx
import GoogleLoginButton from "@/components/ui/googleloginbutton";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <GoogleLoginButton />
    </div>
  );
}
