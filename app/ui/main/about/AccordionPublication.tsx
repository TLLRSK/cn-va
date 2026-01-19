import Link from "next/link";
import { ResponsiveImage } from "../../images/ResponsiveImage";

const AccordionListPublication = ({ list_items }: { list_items: any }) => {

  return (
    <ul id="category-list" className="h-0 grid md:grid-cols-2 gap-sm [interpolate-size:allow-keywords] group-has-[input:checked]:h-auto overflow-hidden transition-height duration-300 ease-in-out">
      {list_items.map((item: any, i: number) => {
        const { publication_image, main_text, secondary_text, url } = item;
        if (url) {
          return (
            <li key={i} className="opacity-0 group-has-[input:checked]:opacity-100 duration-500 transition-opacity">
              <Link href={url}>
                <div className="group/img w-full aspect-square grid grid-cols-12 items-center justify-center bg-muted">
                  <ResponsiveImage
                    image={publication_image}
                    className="col-span-6 col-start-4 group-hover/img:scale-[.94] transition-fading duration-700 ease-in_out"
                  />
                </div>
                <h3 className="text-sm mt-xs">{main_text}</h3>
                <p className="text-sm opacity-40 mb-sm">{secondary_text}</p>
              </Link>
            </li>
          );
        } else {
          <li key={i} className="opacity-0 group-has-[input:checked]:opacity-100 duration-500 transition-opacity">
            <div className="group/img w-full aspect-square grid grid-cols-12 items-center justify-center bg-muted">
              <ResponsiveImage
                image={publication_image}
                className="col-span-6 col-start-4 group-hover/img:scale-[.94] transition-fading duration-700 ease-in_out"
              />
            </div>
            <h3 className="text-sm mt-xs">{main_text}</h3>
            <p className="text-sm opacity-40 mb-sm">{secondary_text}</p>
          </li>;
        }
      })}
    </ul>
  );
};

export default AccordionListPublication;
