export default function Home() {
  return (
    <main>
      <section className="h-dvh flex justify-center items-center">
        <article className="relative flex justify-center items-center flex-col gap-15 p-10">
          <h1 className="text-5xl font-bold font-stretch-extra-condensed">
            Learning Management as&nbsp;
            <span className="text-blue-300">Open Source</span>
          </h1>
          <p className="text-lg text-neutral-400 max-w-[50ch] text-center">
            We aim to achieve the goals of the common user
          </p>
        </article>
      </section>
      <section className="h-dvh bg-[url(/images/lmaos.jpg)] bg-center">

      </section>
    </main>
  );
}
