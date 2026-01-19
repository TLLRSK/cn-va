import { getPageData } from "@/lib/actions";
import MenuClient from "./MenuClient";

const Menu = async () => {
  const contactData = await getPageData("contact");
  const { email, social } = contactData.acf;
  return (
    <MenuClient email={email} social={social} />
  );
};

export default Menu;