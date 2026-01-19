import { getPrivacyPolicy } from "@/lib/actions";

const PrivacyPolicyPage = async () => {
  const data = await getPrivacyPolicy();

  return (
    <article className="flex flex-col px-sm md:px-md">
      <header className="h-[33dvh] flex">
        <h1 className="animated-text text-title xl:text-title-xl font-bold uppercase leading-[90%] mt-auto">
          Privacy Policy
        </h1>
      </header>
      <div
        className="privacy-policy md:w-3/4 text-md font-regular text-secondary flex flex-col mt-sm [&>h2]:text-md [&>h2]:font-medium [&>h2]:mt-xl [&>h2]:mb-sm [&>h2]:text-highlight [&>p]:mb-lg [&>p]:text-xl [&>p]:font-medium "
        dangerouslySetInnerHTML={{
          __html: data.content.sanitized || data.content.rendered,
        }}
      />
    </article>
  );
};

export default PrivacyPolicyPage;
