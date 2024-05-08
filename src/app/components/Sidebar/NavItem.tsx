import { ArrowRight } from "lucide-react";
import { ElementType } from "react";

interface NavItemProps {
    title: string;
    icon: ElementType;
    url: string;
}

export function NavItem({ title, icon: Icon, url }: NavItemProps) {
    return (
        <a href={url} className="group flex items-center gap-3 rounded px-3 py-2 hover:bg-emerald-50 dark:hover:bg-zinc-800">
            <Icon className="h-5 w-5 text-zinc-500" />
            <span className="font-medium text-zinc-700 group-hover:text-emerald-500 dark:text-zinc-100 dark:group-hover:text-emerald-300">{title}</span>
            <ArrowRight className="ml-auto h-5 w-5 text-zinc-400 group-hover:text-emerald-300 dark:text-zinc-600" />
        </a>
    )
}