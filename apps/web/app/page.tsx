import { getWhitelabel } from "../lib/utils";
import { BigLogo } from "../ui/big-logo";
import { Footer } from "../ui/footer";
import { Stats } from "../ui/stats";
import { RecentBlocksAndTransactions } from "../ui/stats";
import { Search } from "../ui/search";
import { EXPLORER_CONFIG } from "../config/explorers";
import { Metadata } from "next";

const whitelabel = getWhitelabel(); // TODO: deprecate
const {
  homepageTitle,
  homepageDescription,
  homepageKeywords,
  id: explorerId,
} = EXPLORER_CONFIG;

export function generateMetadata(): Metadata {
  return {
    title: homepageTitle,
    description: homepageDescription,
    keywords: homepageKeywords,
  };
}
export default function HomePage() {
  return (
    <div className="flex flex-col items-center bg-specialty-gray bg-[url('/images/home-bg.svg')] bg-top bg-no-repeat  min-h-screen">
      <div className="flex flex-col items-center justify-start w-full flex-1 space-y-10 pt-6 sm:pt-14 md:pt-18 tab:pt-28">
        {/* @ts-expect-error Async Server Component */}
        <BigLogo />
        <div className="w-full sm:max-w-[27.875rem] px-2">
          <Search optionGroups={whitelabel.searchOptions} />
        </div>
      </div>
      {/* @ts-expect-error Async Server Component */}
      {explorerId === "nautilus" ? <Stats extended={true} /> : null}
      {explorerId === "saga" ? <RecentBlocksAndTransactions/> : null}
      <Footer />
    </div>
  );
}

export const dynamic = "force-dynamic";
