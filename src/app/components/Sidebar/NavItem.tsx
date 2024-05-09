import { ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { ElementType } from "react";

interface NavItemProps {
    title: string;
    icon: ElementType;
    url: string;
}

export function NavItem({ title, icon: Icon, url }: NavItemProps) {
    const pathName = usePathname()

    return (
        <a href={url} className="group flex items-center gap-3 rounded px-3 py-2 hover:bg-emerald-50 dark:hover:bg-zinc-800">
            <Icon className={`h-5 w-5  ${pathName.includes(url) ? 'text-emerald-500' : 'text-zinc-500'}`} />
            <span className={`font-medium group-hover:text-emerald-500 dark:group-hover:text-emerald-300 ${pathName.includes(url) ? 'text-emerald-500' : 'text-zinc-700 dark:text-zinc-100'}`}>{title}</span>
            <ArrowRight className={`ml-auto h-5 w-5 group-hover:text-emerald-300  ${pathName.includes(url) ? 'text-emerald-500' : 'text-zinc-400 dark:text-zinc-600'}`} />
        </a>
    )
}