import Link from "next/link";

const AccordionListText = ({ list_items }: { list_items: any }) => {
  const mock = {
    name: "Exhibition",
    type: "text",
    list_items: [
      {
        publication_image: null,
        main_text: "https://www",
        secondary_text: "https://www",
        url: "https://www",
      },
    ],
  };
  
  return (
    <ul id="accordion" className="h-0 overflow-hidden flex md:grid md:grid-cols-2 flex-col gap-sm [interpolate-size:allow-keywords] group-has-[input:checked]:h-auto transition-height duration-300 ease-in-out">
      {list_items.map((item: any, i: number) => {
        if (item.url) {
          return (
            <li key={i} className="md:col-start-2 opacity-0 group-has-[input:checked]:opacity-100 duration-500 transition-opacity">
              <Link href={item.url}>
                <h3 className="text-sm">{item.main_text}</h3>
                <p className="text-sm opacity-40 mb-sm">{item.secondary_text}</p>
              </Link>
            </li>
          );
        } else {
          <li key={i} className="md:col-start-2 opacity-0 group-has-[input:checked]:opacity-100 duration-500 transition-opacity">
            <h3 className="text-sm">{item.main_text}</h3>
            <p className="text-sm opacity-40 mb-sm">{item.secondary_text}</p>
          </li>;
        }
      })}
    </ul>
  );
};

export default AccordionListText;