import { Navbar, NavbarBrand, NavbarContent } from "@heroui/navbar";

import UserDropdown from "./UserDropdown";

function Header() {
  return (
    <Navbar isBlurred isBordered>
      <NavbarBrand>
        <p className="font-bold text-inherit">StudySocial</p>
      </NavbarBrand>
      <NavbarContent
        className="hidden sm:flex w-full max-w-xs gap-4"
        justify="center"
      >
        {/* <Input
          className="w-full"
          placeholder="Pesquisar grupos, pessoas, postagens..."
          startContent={<SearchIcon className="text-gray-500 size-4" />}
        /> */}
      </NavbarContent>
      <NavbarContent justify="end">
        <UserDropdown />
      </NavbarContent>

      {/* <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-row items-center gap-2 w-[60%]">
          <p className="font-bold text-inherit">StudySocial</p>
          <Input
            className="w-full"
            placeholder="Pesquisar grupos, pessoas, postagens..."
            startContent={<SearchIcon className="text-gray-500 size-4" />}
          />
        </div>
        <UserIcon className="text-gray-500 size-4" />
      </div> */}
    </Navbar>
  );
}

export default Header;
