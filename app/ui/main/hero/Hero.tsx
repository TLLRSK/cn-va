const Hero = async () => {
  return (
    <>
      <section className="hero min-h-[100dvh] flex flex-col relative items-center justify-center">
        <header className={headerClass}>
          <h1 className={titleClass}>
            <span className="at-lg leading-[90%] will-change-transform">coke</span>
            <span className="at-lg leading-[90%] will-change-transform">navarro</span>
          </h1>

          <div style={{backgroundImage:`url(/images/home.jpg)`}} className="hero-img animate-parallax image--anim [animation-range:0_100%] w-80 md:w-[20rem] lg:w-[clamp(20rem,16vw,24rem)] 2xl:w-[clamp(24rem,14vw,26rem)] aspect-square rounded-xl bg-no-repeat bg-cover bg-center overflow-hidden p-[1px]">
          </div>

          <h2 className={`${titleClass} text-highlight`}>
            <span className="at-lg leading-[90%] will-change-transform">visual</span>
            <span className="at-lg leading-[90%] will-change-transform">artist</span>
          </h2>
        </header>

        <p className="ae absolute bottom-0 uppercase text-xs font-semibold text-highlight text-left pb-sm">
          navarrocoke@gmail.com
        </p>
      </section>
    </>
  );
};

export default Hero;

const headerClass = "flex flex-col gap-y-lg items-center xl:mb-lg";
const titleClass = "w-full flex flex-col text-title md:text-title-xl font-black uppercase text-center overflow-hidden";
