import Header from "./components/Header"

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      {children}
    </main>
  )
}

export default MainLayout
