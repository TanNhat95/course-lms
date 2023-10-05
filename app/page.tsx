import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <p className='text-3xl text-sky-400'>Hello world</p>
      <Button variant="destructive">Button</Button>
    </>
  )
}
