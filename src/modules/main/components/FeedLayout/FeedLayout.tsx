function FeedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row justify-center w-full h-full gap-6 py-8">
      {/* <Navigation /> */}
      <div className="flex flex-col gap-6 w-full max-w-xl">{children}</div>
    </div>
  );
}

export default FeedLayout;
