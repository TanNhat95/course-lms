'use client'

import qs from 'query-string'
import { cn } from "@/lib/utils"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { IconType } from "react-icons"

interface CategoryItemProps {
    label: string,
    value?: string,
    icon?: IconType
}

export const CategoryItem = ({label, icon: Icon, value}: CategoryItemProps) => {
    const pathName = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    const currentCategoryId = searchParams.get('categoryId')
    const currentTitle = searchParams.get('title')

    const isSelected = currentCategoryId === value

    const onClick = () => {
        const url = qs.stringifyUrl({
            url: pathName,
            query: {
                title: currentTitle,
                categoryId: isSelected ? null : value
            }
        }, { skipNull: true, skipEmptyString: true})
        router.push(url)
    }
    return (
        <button
            className={cn(
                'py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700',
                isSelected && 'border-sky-700 text-sky-800 bg-sky-200/20'
            )}
            type="button"
            onClick={onClick}
        >
            {Icon && <Icon size={20}/>}
            <div className='truncate'>
                {label}
            </div>
        </button>
    )
}