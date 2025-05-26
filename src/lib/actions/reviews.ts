'use server'

import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

const ReviewSchema = z.object({
  serviceId: z.number(),
  rating: z.number().min(1).max(5),
  title: z.string().min(1).max(255),
  content: z.string().min(10),
  pros: z.string().optional(),
  cons: z.string().optional(),
  visitDate: z.string().optional(),
})

export async function createReview(formData: FormData) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    redirect('/auth/signin')
  }

  const validatedFields = ReviewSchema.safeParse({
    serviceId: Number(formData.get('serviceId')),
    rating: Number(formData.get('rating')),
    title: formData.get('title'),
    content: formData.get('content'),
    pros: formData.get('pros'),
    cons: formData.get('cons'),
    visitDate: formData.get('visitDate'),
  })

  if (!validatedFields.success) {
    throw new Error('Invalid form data')
  }

  const { serviceId, rating, title, content, pros, cons, visitDate } = validatedFields.data

  try {
    // レビューを作成
    await prisma.review.create({
      data: {
        userId: Number(session.user.id),
        serviceId,
        rating,
        title,
        content,
        pros: pros || null,
        cons: cons || null,
        visitDate: visitDate ? new Date(visitDate) : null,
      }
    })

    // サービスの平均評価を更新
    await updateServiceRating(serviceId)
    
    revalidatePath(`/services/${serviceId}`)
    return { success: true }
  } catch (error) {
    console.error('Review creation error:', error)
    throw new Error('レビューの投稿に失敗しました')
  }
}

async function updateServiceRating(serviceId: number) {
  const reviews = await prisma.review.findMany({
    where: { serviceId, isHidden: false },
    select: { rating: true }
  })

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum: number, review) => sum + Number(review.rating), 0) / reviews.length
    : 0

  await prisma.service.update({
    where: { id: serviceId },
    data: {
      averageRating,
      reviewCount: reviews.length
    }
  })
}