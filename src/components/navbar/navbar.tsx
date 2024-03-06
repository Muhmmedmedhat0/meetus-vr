import { Avatar } from '@nextui-org/react';

interface NavbarProps {
  name: string | undefined;
}

function Navbar({ name }: NavbarProps) {
  return (
    <div className="px-12 pt-8 ">
      <Avatar
        className="ml-auto"
        showFallback
        name={name as string}
        src="https://images.unsplash.com/broken"
      />
    </div>
  );
}

export default Navbar;
