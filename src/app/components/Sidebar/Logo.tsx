import { Router } from "lucide-react"

export function Logo() {
    return (
        <a href="/clients" className="flex mx-1 items-center gap-3 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
            <Router className="w-8 h-8 text-emerald-500" />
            <span>Routers App</span>
        </a>
    )
}