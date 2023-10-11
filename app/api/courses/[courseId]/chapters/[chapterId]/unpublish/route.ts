import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function PATCH(req: Request, {params}: {params: {courseId: string, chapterId: string}}) {
    try {
        const { userId } = auth()

        if (!userId) {
            return new NextResponse('Unauthorized', {status: 401})
        }

        const ownCourse = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId
            }
        })

        if (!ownCourse) {
            return new NextResponse('Unauthorized', {status: 401})
        }

        const unPublishedChapter = await db.chapter.update({
            where: {
                courseId: params.courseId,
                id: params.chapterId
            },
            data: {
                isPublished: false
            }
        })

        /*
        const publishedChaptersInCourse = await db.chapter.findMany({
            where: {
                courseId: params.courseId,
                isPublished: true
            }
        })

        if (!publishedChaptersInCourse.length) {
            await db.course.update({
                where: {
                    id: params.courseId,
                },
                data: {
                    isPublished: false
                }
            })
        }

        */
        return NextResponse.json(unPublishedChapter)
    } catch (error) {
        console.log(error)
        return new NextResponse('Something went wrong', {status: 500})
    }
}