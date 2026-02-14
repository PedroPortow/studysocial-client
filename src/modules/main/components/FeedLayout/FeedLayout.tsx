import Navigation from "./components/Navigation";

function FeedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-zinc-950">
      <div className="flex justify-center w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 gap-8">
        <aside className="hidden md:block w-64 shrink-0 sticky top-8 h-fit">
          <Navigation />
        </aside>

        <main className="flex flex-col gap-6 w-full max-w-xl pb-20 md:pb-0">
          {children}
        </main>

        <aside className="hidden lg:block w-80 shrink-0 sticky top-8 h-fit">
          {/*<div className="flex flex-col gap-4">
            <div className="p-4 rounded-2xl bg-default-50 border border-default-100 min-h-[200px] flex items-center justify-center text-default-400 text-sm">
              * algo aqui *
            </div>
          </div>*/}
        </aside>
      </div>
    </div>
  );
}

export default FeedLayout;
