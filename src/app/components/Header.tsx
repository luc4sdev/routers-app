'use client'

import { usePathname } from "next/navigation";
import { ThemeButton } from "./ThemeButton";

export function Header() {

    const pathname = usePathname();
    const currentPage = pathname.split('/').pop();
    if (currentPage) {
        const formattedPageName = currentPage.charAt(0).toUpperCase() + currentPage.slice(1);
        const title = formattedPageName.includes('-') ? formattedPageName.split('-')[0] + ' ' + formattedPageName.split('-')[1][0].toUpperCase() + formattedPageName.split('-')[1].slice(1) : formattedPageName
        return (
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-medium text-zinc-900 dark:text-zinc-100">{title === 'Clients' ? 'Clientes' : title === 'Routers' ? 'Roteadores' : title}</h1>
                <ThemeButton />
            </div>
        )

    }

    return (
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-medium text-zinc-900 dark:text-zinc-100">Dashboard</h1>
            <ThemeButton />
        </div>
    )
}