import { formatDate } from '@/lib/utils'
import { Star } from 'lucide-react';
import Image from 'next/image'
import React from 'react'

export const generateStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
        stars.push(
            <Star size={20} fill='#F0C428' color='#F0C428' />
        );
    }

    return stars;
}

export default function ReviewCard({
    review
}: {
    review: any
}) {
    return (

        <div className='flex flex-col gap-3 py-4 bg-gray-100 px-4'>
            <div className='flex gap-2 items-center'>
                <Image src={review?.author?.image!} width={50} height={50} alt="user" className='rounded-full' />

                <div className='flex flex-col'>
                    <p className='text-sm text-muted-foreground font-bold'>{review?.author?.name!}</p>
                    <p className='text-sm text-muted-foreground'>{formatDate(review?.createdAt)} </p>
                </div>
            </div>

            <div className='flex'>
                {generateStars(review?.rating)}
            </div>
            <div>
                <p className='text-sm text-muted-foreground'>{review?.text}</p>
            </div>

        </div>

    )
}
