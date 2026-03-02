export default function Home() {
  return (
    <div className="flex flex-col gap-7 p-11 max-w-8xl mx-auto w-full">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-primary">
          Popular Threads 📢
        </h1>
        <p className="text-muted-foreground">
          See what&apos;s happening across channels.
        </p>
      </div>
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {/*Popular Threads Here*/}
      </div>
    </div>
  );
}
