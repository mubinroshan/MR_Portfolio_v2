"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
  noIconBackground?: boolean;
}

function DisplayCard({
  className,
  icon = <Sparkles className="size-4 sm:size-6 text-amber-300" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName = "text-white",
  titleClassName = "text-white",
  noIconBackground = false,
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-28 sm:h-[10rem] md:h-44 lg:h-48 xl:h-[13rem] 2xl:h-[14.5rem] w-[16rem] xs:w-[19rem] sm:w-[24rem] md:w-[32rem] lg:w-[42rem] xl:w-[48rem] 2xl:w-[54rem] max-w-[95vw] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 bg-[#0d5c56] border-[#FAF6EB]/30 text-[#FAF6EB] p-3.5 sm:p-5 lg:p-7 xl:p-8 transition-all duration-700 hover:border-white/50 hover:bg-[#0e665f] [&>*]:flex [&>*]:items-center [&>*]:gap-2 shadow-2xl overflow-hidden",
        className
      )}
    >
      <div>
        {noIconBackground ? (
          <span className="relative inline-block text-amber-300 transform scale-110 sm:scale-125 focus:animate-pulse">
            {icon}
          </span>
        ) : (
          <span className="relative inline-block rounded-full bg-[#00a36c]/40 text-white p-1.5 sm:p-2 border border-white/20">
            {icon}
          </span>
        )}
        <p className={cn("text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-bold tracking-tight text-white keep-bright-white", titleClassName)}>{title}</p>
      </div>
      <p className="whitespace-nowrap text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-serif font-bold tracking-tight text-white keep-bright-white drop-shadow-sm">{description}</p>
      <p className="text-[10px] xs:text-xs sm:text-sm md:text-base text-[#FAF6EB] keep-bright-white-opacity font-mono font-medium tracking-wide">{date}</p>
    </div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const defaultCards = [
    {
      className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      className: "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      className: "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}
