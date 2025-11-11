import { MdNoteAlt } from "react-icons/md";
import Container from "./Container";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-slate-950">
      <Container>
        <div className="flex justify-between items-center gap-8">
          <div className="flex items-center gap-1 cursor-pointer">
            <MdNoteAlt size={24} />
            <div className="font-bold text-xl">WEBDEV.blog</div>
          </div>
          <div>Search</div>
          <div className="flex gap-5 md:gap-8 items-center">
            <ThemeToggle />
            <div>Notifications</div>
            <div>UserMenu</div>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
