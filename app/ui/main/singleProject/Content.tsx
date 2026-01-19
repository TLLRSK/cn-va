"use client";
import { useSingleProject } from "@/app/context/singleProjectContext";
import LinkProduct from "../../links/LinkProduct";

const Content = () => {
  const { content, project_details, link, description_colors } = useSingleProject();

  return (
    <div className="flex items-center xl:h-screen p-sm md:px-md py-xl" style={{backgroundColor:description_colors.background}}>
      <div className="flex flex-col md:grid md:grid-cols-12 gap-lg xl:gap-0 xl:my-auto">
        <div
          className="ae md:w-3/4 xl:w-full text-xl font-bold md:col-span-12 xl:col-span-8 uppercase leading-[100%]"
          style={{color:description_colors.text}}
          dangerouslySetInnerHTML={{
            __html: content?.rendered,
          }}
        />

        <div className="flex flex-col gap-lg md:col-span-12 md:grid xl:flex  md:grid-cols-2 xl:col-span-3 xl:col-start-10 md:items-end xl:items-start">
          <ul className="flex flex-col gap-md">
            {project_details && project_details?.map((d, i) => {
              const { title, list } = d.detail;
              return (
                <li key={i}>
                  <h2 className="text-sm font-medium text-muted opacity-50 mb-2">
                    {title}
                  </h2>
                  {list?.map((item: { text: string }, i: number) => {
                    return (
                      <p key={i} className="text-sm font-medium mb-2 last:mb-0" style={{color:description_colors.text}}>
                        {item.text}
                      </p>
                    );
                  })}
                </li>
              );
            })}
          </ul>

          {link.url && <LinkProduct color={description_colors.text} />}
        </div>
      </div>
    </div>
  );
};

export default Content;