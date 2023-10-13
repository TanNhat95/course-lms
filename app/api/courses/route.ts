import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { isTeacher } from "@/lib/teachers"

export async function POST(req: Request) {
    try {
        const { userId } = auth()
        const { title } = await req.json()

        if (!userId || isTeacher(userId)) {
            return new NextResponse('Unauthorized', {status: 401})
        }

        const courses = await db.course.create({
            data: {
                title,
                userId
            }
        })

        return NextResponse.json(courses, {status: 200})
    } catch (error) {
        console.log(error)
        return new NextResponse('Something went wrong !!!', {status: 500})
    }
}