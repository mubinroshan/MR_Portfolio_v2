import { CopyCode } from "@/components/ui/copy-code-button";
import DisplayCards from "@/components/ui/display-cards";
import { Sparkles, Shield, Database } from "lucide-react";

const defaultCards = [
  {
    icon: <Shield className="size-5 sm:size-7 text-emerald-300 keep-emerald-icon" />,
    title: "SecOps",
    description: "Cloud security & zoning rulesets",
    date: "Active",
    iconClassName: "text-emerald-300 keep-emerald-icon",
    titleClassName: "text-white font-serif keep-bright-white",
    className:
      "[grid-area:stack] hover:-translate-y-12 shadow-2xl bg-[#0d5c56] border-[#FAF6EB]/30 text-white keep-bright-white",
  },
  {
    icon: <Database className="size-5 sm:size-7 text-teal-300 keep-teal-icon" />,
    title: "Healthcare ETL",
    description: "Optimized intake analysis flows",
    date: "Ready",
    iconClassName: "text-teal-300 keep-teal-icon",
    titleClassName: "text-white font-serif keep-bright-white",
    className:
      "[grid-area:stack] translate-x-4 sm:translate-x-14 md:translate-x-24 lg:translate-x-28 xl:translate-x-[7.5rem] 2xl:translate-x-36 translate-y-4 sm:translate-y-8 md:translate-y-12 lg:translate-y-14 xl:translate-y-[4.1rem] 2xl:translate-y-[4.6rem] hover:-translate-y-6 shadow-2xl bg-[#0b504a] border-[#FAF6EB]/30 text-white keep-bright-white",
  },
  {
    icon: <Sparkles className="size-5 sm:size-7 text-amber-400 fill-amber-400 stroke-amber-500 stroke-[1.5] keep-amber-star" />,
    title: "EHR Isolation",
    description: "Zero-trust network configuration",
    date: "Deployed",
    iconClassName: "text-amber-400 keep-amber-star",
    titleClassName: "text-white font-serif keep-bright-white",
    noIconBackground: true,
    className:
      "[grid-area:stack] translate-x-8 sm:translate-x-28 md:translate-x-48 lg:translate-x-56 xl:translate-x-[15rem] 2xl:translate-x-72 translate-y-8 sm:translate-y-16 md:translate-y-24 lg:translate-y-28 xl:translate-y-[8.2rem] 2xl:translate-y-[9.2rem] hover:translate-y-14 shadow-2xl bg-[#09413c] border-[#FAF6EB]/30 text-white keep-bright-white",
  },
];

export function DisplayCardsDemo() {
  return (
    <div className="flex h-56 xs:h-64 sm:h-[18rem] md:h-[22rem] lg:h-[26rem] xl:h-[28rem] 2xl:h-[30rem] w-full items-center justify-center py-6 sm:py-8 select-none overflow-visible">
      <div className="w-full max-w-full flex justify-center overflow-visible">
        <DisplayCards cards={defaultCards} />
      </div>
    </div>
  );
}

export default function DemoOne() {
  return (
    <div className="w-full">
      <CopyCode />
    </div>
  );
}
