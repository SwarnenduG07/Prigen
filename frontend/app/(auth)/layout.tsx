import { Background } from "@/components/ui/background";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      <Background />
      <div className="relative z-10">{children}</div>
    </main>
  );
};

export default AuthLayout;
