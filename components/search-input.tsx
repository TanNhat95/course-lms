'use client'

import qs from 'query-string'
import { Search } from "lucide-react"
import { Input } from "./ui/input"
import { useEffect, useState } from "react"
import { useDebounce } from "@/hooks/use-debounce"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export const SearchInput = () => {
    const pathName = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    const [value, setValue] = useState('')
    const debounceValue = useDebounce(value)

    const currentCategoryId = searchParams.get('categoryId')

    useEffect(() => {
        const url = qs.stringifyUrl({
            url: pathName,
            query: {
                categoryId: currentCategoryId,
                title: debounceValue
            }
        }, {skipEmptyString: true, skipNull: true})
        router.push(url)
    }, [debounceValue, currentCategoryId,router,pathName])

    return (
        <div className="relative">
            <Input
                className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200" placeholder="Search a course"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <Search className="h-4 w-4 absolute top-3 left-3 text-slate-600"/>
        </div>
    )
}