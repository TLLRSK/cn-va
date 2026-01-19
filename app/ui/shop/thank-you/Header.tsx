const Header = ({ email }: { email: string }) => {
  return (
    <header className="h-screen md:col-span-7 bg-foreground flex flex-col justify-center relative p-sm md:px-0 md:pl-md md:sticky md:top-0">
      
      <div className="flex-1 flex flex-col justify-center gap-5 xl:col-span-8 xl:col-start-2">
        <h1 className="flex flex-col text-3xl font-black text-inverse uppercase leading-[90%] xl:leading-[85%] overflow-hidden">
          <div className="flex overflow-hidden">
            <span className="at">Thank</span>
          </div>
          <div className="flex overflow-hidden">
            <span className="at">You</span>
          </div>
        </h1>

        <p className="flex text-sm text-inverse font-regular overflow-hidden">
          <span className="ae">Your order has been received.</span>
        </p>
      </div>

      <p className="flex items-start flex-col text-sm font-regular overflow-hidden">
        <span className="ae text-inverse">The receipt will be sent to:</span>
        <span className="ae text-accent">{email}</span>
      </p>
    </header>
  );
};

export default Header;
