import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import Mux from "@mux/mux-node"
import { NextResponse } from "next/server"

const { Video } = new Mux(
    process.env.MUX_TOKEN_ID!,
    process.env.MUX_TOKEN_SECRET!
)

export async function DELETE(req: Request, { params }: { params: { courseId: string}}) {
    try {
        const { userId } = auth()
        const { courseId } = params

        if (!userId) {
            return new NextResponse('Unauthorized', {status: 401})
        }

        const course = await db.course.findUnique({
            where: {
                id: courseId,
                userId
            },
            include: {
                chapters: {
                    include: {
                        muxData: true
                    }
                }
            }
        })

        if (!course) {
            return new NextResponse('Not Found', {status: 404})
        }

        //remove all video of each chapter in Mux when delete course
        for(const chapter of course.chapters) {
            if (chapter.muxData?.assetId) {
                await Video.Assets.del(chapter.muxData.assetId)
            }
        }

        const deleteCourse = await db.course.delete({
            where: {
                id: courseId
            }
        })


        return NextResponse.json(deleteCourse)
    } catch (error) {
        console.log(error)
        return new NextResponse('Something went wrong', {status: 500})
    }
}

export async function PATCH(req: Request, { params }: { params: { courseId: string}}) {
    try {
        const { userId } = auth()
        const { courseId } = params
        const values = await req.json()

        if (!userId) {
            return new NextResponse('Unauthorized', {status: 401})
        }
        const course = await db.course.update({
            where: {
                id: courseId,
                userId,
            },
            data: {
                ...values
            }
        })

        return NextResponse.json(course)
    } catch (error) {
        console.log(error)
        return new NextResponse('Something went wrong', {status: 500})
    }
}