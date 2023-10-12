'use client'

import { useForm } from 'react-hook-form'
import axios from "axios";
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from "next/navigation";
import Link from 'next/link'

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormMessage,
    FormLabel,
    FormItem
} from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { NextResponse } from 'next/server';
import toast from 'react-hot-toast';

const formSchema = z.object({
    title: z.string().min(1, {
        message: 'Title is required'
    })
})


const CreateCoursePage = () => {
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ''
        }
    })

    const {isSubmitting, isValid} = form.formState

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post('/api/courses', values)
            router.push(`/teacher/courses/${response.data.id}`)
            toast.success('Course has been created')
            router.refresh()
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong', {position: 'top-center'})
        }
    }
    return (
        <div className='max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6'>
            <div>
                <h1 className='text-2xl'>
                    Name your course
                </h1>
                <p className='text-sm text-slate-600'>
                    What would you like to name your course? Don&apos;t worry, you can change this later.
                </p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 mt-8'>
                        <FormField
                            control={form.control}
                            name='title'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Course Title
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder='shadcn'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        What will you teach in the course
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className='flex items-center gap-x-2'>
                            <Link href={'/'}>
                                <Button type='button' variant={'ghost'}>
                                    Cancel
                                </Button>
                            </Link>
                            <Button type='submit' disabled={isSubmitting || !isValid}>
                                Continue
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default CreateCoursePage;