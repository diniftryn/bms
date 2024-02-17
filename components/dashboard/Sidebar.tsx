import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { LayersIcon, PlusIcon } from "@radix-ui/react-icons";
import { ReactNode } from "react";
import Link from "next/link";
import { BASE_URL } from "@/config";
import { Url } from "url";

export default function Sidebar({ className }: { className: string }) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Classes</h2>
          <div className="space-y-1">
            <SidebarItem icon={<LayersIcon className="mr-2 h-4 w-4" />} name="View All Classes" path={`${BASE_URL}/class/`} />
            <SidebarItem icon={<PlusIcon className="mr-2 h-4 w-4" />} name="New Class" path={`${BASE_URL}/class/new`} />
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Instructors</h2>
          <div className="space-y-1">
            <SidebarItem icon={<LayersIcon className="mr-2 h-4 w-4" />} name="View All Instructors" path={`${BASE_URL}/instructor/`} />
            <SidebarItem icon={<PlusIcon className="mr-2 h-4 w-4" />} name="New Instructor" path={`${BASE_URL}/instructor/new`} />
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({ icon, name, path }: { icon: ReactNode; name: string; path: string | Url }) {
  return (
    <Button variant="ghost" className="w-full justify-start" asChild>
      <Link href={path}>
        {icon}
        {name}
      </Link>
    </Button>
  );
}
