'use client'

import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";

import { isTeacher } from "@/lib/teachers";

export const NavbarRoutes = () => {
    const { userId } = useAuth()
    const pathname = usePathname()

    const isTeacherPage = pathname?.startsWith('/teacher')
    const isCoursesPage = pathname?.startsWith('/courses')
    const isSearchPage = pathname === '/search'

    return (
        <>
            {isSearchPage && (
                <div className="hidden md:block">
                    <SearchInput />
                </div>
            )}
            <div className="flex gap-x-2 ml-auto">
                {isTeacherPage || isCoursesPage ? (
                    <Link href={'/'}>
                        <Button size='sm' variant='ghost'>
                            <LogOut className="h-4 w-4 mr-2" />
                            Exit
                        </Button>
                    </Link>
                ) : (
                    <Link href={'teacher/courses'}>
                        <Button size='sm' variant='ghost'>
                            Teacher mode
                        </Button>
                    </Link>
                )}
                <UserButton
                    afterSignOutUrl="/"
                />
            </div>
        </>
    );
}
