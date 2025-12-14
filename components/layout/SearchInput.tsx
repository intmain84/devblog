import { Search } from "lucide-react";
import { Input } from "../ui/input";

const SearchInput = () => {
  return (
    <div className="relative hidden sm:block">
      <Search className="absolute top-[10px] left-2 h-4 w-4 text-muted-foreground" />
      <Input placeholder="Search" className="pl-8 bg-primary/10" />
    </div>
  );
};

export default SearchInput;
