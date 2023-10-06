'use client'
import { Layout, Compass, List, BarChart } from "lucide-react";
import SidebarItem from "./sidebar-item";
import { usePathname } from "next/navigation";

const guestRoutes = [
    {
        icon: Layout,
        label: 'Dashboard',
        href: '/',
    },
    {
        icon: Compass,
        label: 'Browser',
        href: '/search'
    }
]

const teacherRoutes = [
    {
        icon: List,
        label: 'Courses',
        href: '/teacher/courses',
    },
    {
        icon: BarChart,
        label: 'Analytics',
        href: '/teacher/analytics'
    }
]

const SideBarRoutes = () => {
    const pathname = usePathname()
    const isTeacherPage = pathname?.includes('/teacher')

    const routes = isTeacherPage ? teacherRoutes : guestRoutes
    return (
        <div className="flex flex-col w-full">
            {routes.map((route) => (
                <SidebarItem
                    key = {route.href}
                    href = {route.href}
                    label = {route.label}
                    icon = {route.icon}
                />
            ))}
        </div>
    );
}

export default SideBarRoutes;