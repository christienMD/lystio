import Listings from "@/components/sections/Listings";
import ListsHeader from "@/components/sections/ListsHeader";
import Navbar from "@/components/sections/Navbar";
import SearchInput from "@/components/SearchInput";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="sm:hidden my-4 w-full flex items-center justify-center px-4">
        <SearchInput />
      </div>
      <ListsHeader />
      <Listings />
    </>
  );
}

export const dynamic = 'force-dynamic';
