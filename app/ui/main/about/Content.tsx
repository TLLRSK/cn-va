"use client";

import FeaturingList from "./FeaturingList";

const Content = ({ data }: { data: any }) => {
  const { working_as, focusing_on, represented_by, clients, based_in, featuring_list } = data;

  return (
    <article className="w-full flex flex-col px-sm md:px-md">
      <div className={`w-full pt-sm md:pt-md xl:pt-xl`}>
        <p className="md:w-3/4 xl:w-2/3 text-xl md:text-2xl font-extrabold uppercase leading-[90%]">
          Spanish Visual Artist based in {based_in.city}, {based_in.country}.
        </p>

        <div className="grid gap-md md:gap-0 mt-xl xl:mt-3xl md:grid-cols-12 mb-lg">
          <div className="md:col-span-4 w-3/4">
            <h2 className="text-sm font-medium text-highlight mb-2">Working on</h2>
            <p className="text-sm font-medium mb-sm">
              {working_as.map((item: { field: string }, i: number) => {
                return i < working_as.length - 1
                  ? `${
                      item.field +
                      (i + 1 === working_as.length - 1 ? " & " : ", ")
                    } `
                  : `${item.field}.`;
              })}
            </p>
            <p className="text-sm font-medium 2xl:w-3/4">{focusing_on}</p>
          </div>

          <div className="md:col-span-3 xl:col-span-2">
            <h2 className="text-sm font-medium text-highlight mb-2">Represented by</h2>

            <p className="w-2/3 text-sm font-medium capitalize">{represented_by}</p>
          </div>

          <div className="md:col-span-5 xl:col-span-4 xl:col-start-9 ">
            <h2 className="text-sm font-medium text-highlight mb-2">Clients include</h2>

            <ul className="grid grid-cols-2 gap-2">
              {clients.map((client: { client: string }, index: number) => (
                <li key={index}>
                  <p className="text-sm">{client.client}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <FeaturingList list={featuring_list} />
      </div>
    </article>
  );
};

export default Content;
