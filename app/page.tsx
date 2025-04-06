import Listings from "@/components/sections/Listings";
import Header from "@/components/sections/Header";
import Navbar from "@/components/sections/Navbar";
import SearchInput from "@/components/SearchInput";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="sm:hidden my-4 w-full flex items-center justify-center px-4">
        <SearchInput />
      </div>
      <Header />
      <Listings />
    </>
  );
}

export const dynamic = "force-dynamic";
