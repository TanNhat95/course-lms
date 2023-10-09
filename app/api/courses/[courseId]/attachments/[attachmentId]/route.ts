import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function DELETE (req: Request, {params}: {params: {attachmentId: string, courseId: string}}) {
    try {
        const { userId } = auth()
        if (!userId) {
            return new NextResponse('Unauthorized', {status: 401})
        }

        const courseOwner = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId
            }
        })

        if (!courseOwner) {
            return new NextResponse('Unauthorized', {status: 401})
        }

        const attachment = await db.attachment.delete({
            where: {
                courseId: params.courseId,
                id: params.attachmentId
            }
        })

        return NextResponse.json(attachment)
    } catch (error) {
        console.log(error)
        return new NextResponse('Something went wrong', {status: 500})
    }
}