import Link from "next/link";

const BreadCrumb = ({ productName }: { productName: string }) => {
  return (
    <nav className="flex gap-2 text-xs font-regular text-accent overflow-hidden">
      <Link href="/shop" className="ae hover:line-through">
        Shop
      </Link>{" "}
      <span className="ae">&gt; {productName}</span>
    </nav>
  );
};

export default BreadCrumb;
