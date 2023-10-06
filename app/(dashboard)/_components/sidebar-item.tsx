'use client'
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { useRouter, usePathname } from 'next/navigation'

type SidebarItemProps = {
    label: string,
    href: string,
    icon: LucideIcon
}

const SidebarItem = ({icon: Icon, label, href}: SidebarItemProps) => {
    const router = useRouter()
    const pathname = usePathname()
    const isActive =
        (pathname === '/' && href === '/') ||
        (pathname === href) || pathname?.startsWith(`${href}/`)

    const onClick = () => {
        router.push(href)
    }

    return (
        <button onClick={onClick} type='button' className={cn(
            'flex items-center gap-x-2 text-slate-500 text-sm font-medium pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20',
            isActive && 'text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-500'
        )}>
            <div className="flex items-center gap-x-2 py-4">
                <Icon size={22} className={cn(
                    'text-slate-500',
                    isActive && 'text-sky-700'
                )}/>
                {label}
            </div>
            <div className={cn(
                'ml-auto border-2 border-sky-700 h-full transition-all opacity-0',
                isActive && 'opacity-100'
            )}/>
        </button>
    );
}

export default SidebarItem;