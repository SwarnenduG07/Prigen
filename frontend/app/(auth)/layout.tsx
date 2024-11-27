
const AuthLayout = ({children}: {children: React.ReactNode}) => {
    return (
      <main className="h-screen bg-gradient-to-br from-zinc-700 from-[-10%] via-slate-950 via-[30%] to-neutral-900 to-[100%] overflow-auto">
          <div className="">
              {children} 
          </div>
      </main>
    )
}
export default AuthLayout