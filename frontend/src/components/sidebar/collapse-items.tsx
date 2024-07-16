"use client";
import React from "react";
import { ChevronUpIcon } from "../icons/sidebar/chevron-up-icon";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { SidebarItem } from "./sidebar-item";

interface Props {
  icon: React.ReactNode;
  title: string;
  items: Array<{ name: string; href: string }>;
}

export const CollapseItems = ({ icon, items, title }: Props) => {
  return (
    <div className="flex gap-4 h-full items-center">
      <Accordion className="px-0">
        <AccordionItem
          indicator={<ChevronUpIcon />}
          classNames={{
            indicator: "data-[open=true]:-rotate-180",
            trigger:
              "py-0 min-h-[50px] hover:bg-default-100 rounded-xl active:scale-[0.98] transition-transform px-4",
            title: "px-0 flex text-sm gap-4 h-full items-center cursor-pointer",
          }}
          aria-label={title}
          title={
            <div className="flex flex-row gap-4 items-center">
              <div className="w-6 h-6 flex items-center justify-center">
                {icon}
              </div>
              <span>{title}</span>
            </div>
          }
        >
          <div className="pl-14">
            {items.map((item, index) => (
              <SidebarItem
                key={index}
                title={item.name}
                href={item.href}
                icon={<div className="w-2 h-2 rounded-full bg-default-400" />}
              />
            ))}
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
