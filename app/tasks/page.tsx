import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import Dashboard from "@/components/ui/dashboard";

export default async function TasksPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/"); // ou "/login" si tu veux
  }

  return <Dashboard session={session} />;
}
