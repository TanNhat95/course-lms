'use client'

import * as z from 'zod'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { PlusCircle } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Chapter, Course } from '@prisma/client'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ChaptersList from './chapters-list'

type ChapterFormProps = {
    initialData: Course & { chapters: Chapter[]}
    courseId: string
}

const formSchema = z.object({
    title: z.string().min(1)
})

const ChapterForm = ({initialData, courseId}: ChapterFormProps) => {
    const router = useRouter()
    const [isCreating, setIsCreating] = useState(false)



    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ''
        },
    })

    const { isValid, isSubmitting } = form.formState

    const toggleCreating = () => setIsCreating((current) => !current)

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/courses/${courseId}/chapters`, values)
            toast.success(`Chapter has been created`)
            toggleCreating()
            router.refresh()
        } catch (error) {
            toast.error('Something went wrong')
        }
    }
    return (
        <div className='mt-6 border bg-slate-100 rounded-md p-4'>
            <div className='font-medium flex items-center justify-between'>
                Course chapter
                <Button variant='ghost' onClick={toggleCreating}>
                    {isCreating ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <PlusCircle className='w-4 h-4 mr-2'/>
                            Add a chapter
                        </>
                    )}
                </Button>
            </div>
            {isCreating && (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-4 mt-4'
                    >
                        <FormField
                            control={form.control}
                            name='title'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder='e.g'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled = {!isValid || isSubmitting}>
                            Create
                        </Button>
                    </form>
                </Form>
            )}
            {!isCreating && (
                <div className={cn(
                    'text-sm mt-2',
                    !initialData.chapters.length && 'text-slate-500 italic'
                )}>
                    {!initialData.chapters.length && 'No chapters'}
                    <ChaptersList
                        onEdit={() => {}}
                        onReorder={() => {}}
                        items={initialData.chapters || []}
                    />
                </div>
            )}
            {!isCreating && (
                <p className='text-xs text-muted-foreground mt-4'>
                    Drag and drop to reorder the chapters
                </p>
            )}
        </div>
    );
}

export default ChapterForm;