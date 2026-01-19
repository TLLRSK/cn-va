import LinkBackTo from "./ui/links/LinkBackTo";

const NotFoundPage = () => {
  return (
    <main className="h-screen relative">
      <header
        className="w-full h-full flex flex-col items-center justify-center gap-xs relative bg-cover bg-center"
        style={{ backgroundImage: "url(./images/404.gif)" }}
      >
        <h1 className="w-1/2 text-2xl xl:text-3xl font-black text-center text-inverse leading-[85%]">
          404
        </h1>
        <p className="text-sm font-regular text-center text-inverse">
          Not found
        </p>
      </header>
      <div className="absolute bottom-0 right-0 p-sm md:px-md text-inverse">
        <LinkBackTo url="/" label="to home" />
      </div>
    </main>
  );
};

export default NotFoundPage;
