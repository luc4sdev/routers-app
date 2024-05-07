'use client'

import { Check, Monitor, Moon, Sun } from "lucide-react";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useTheme } from "next-themes";

export function ThemeButton() {
    const { theme, resolvedTheme, setTheme } = useTheme()

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button className="bg-transparent outline-none" aria-label="Customise options">
                    {resolvedTheme === 'light'
                        ? <Sun className="w-5 h-5" />
                        : <Moon className="w-5 h-5" />
                    }
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content sideOffset={5}>

                    <DropdownMenu.RadioGroup className=" bg-zinc-50 dark:bg-zinc-800 flex flex-col justify-start gap-2 items-start border border-violet-300 shadow-sm rounded-lg px-3 py-3" value={theme} onValueChange={setTheme}>
                        <DropdownMenu.RadioItem className="flex items-center justify-start gap-2 font-medium outline-none cursor-pointer hover:text-yellow-500 dark:hover:text-yellow-300" value="light">

                            <Sun className="w-4 h-4" />
                            Light
                            <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
                                <Check className="w-3 h-3" />
                            </DropdownMenu.ItemIndicator>
                        </DropdownMenu.RadioItem>
                        <DropdownMenu.RadioItem className="flex items-center justify-start gap-2 font-medium outline-none cursor-pointer hover:text-violet-600 dark:hover:text-violet-300" value="dark">

                            <Moon className="w-4 h-4" />
                            Dark
                            <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
                                <Check className="w-3 h-3" />
                            </DropdownMenu.ItemIndicator>
                        </DropdownMenu.RadioItem>

                        <DropdownMenu.RadioItem className="flex items-center justify-start gap-2 font-medium outline-none cursor-pointer hover:text-violet-600 dark:hover:text-violet-300" value="system">

                            <Monitor className="w-4 h-4" />
                            System
                            <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
                                <Check className="w-3 h-3" />
                            </DropdownMenu.ItemIndicator>
                        </DropdownMenu.RadioItem>
                    </DropdownMenu.RadioGroup>

                    <DropdownMenu.Arrow />
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    )
}