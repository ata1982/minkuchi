'use server'

import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { prisma, authOptions } from '@/lib/core'

// Review Schema
const ReviewSchema = z.object({
  serviceId: z.number(),
  rating: z.number().min(1).max(5),
  title: z.string().min(1).max(255),
  content: z.string().min(10),
  pros: z.string().optional(),
  cons: z.string().optional(),
  visitDate: z.string().optional(),
})

// Service Schema
const ServiceSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().min(10),
  address: z.string().min(1),
  categoryId: z.number(),
  phone: z.string().optional(),
  website: z.string().url().optional(),
  openingHours: z.string().optional(),
})

// User Profile Schema
const UserProfileSchema = z.object({
  name: z.string().min(1).max(100),
  bio: z.string().max(500).optional(),
  location: z.string().max(100).optional(),
})

// Review Actions
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

    await updateServiceRating(serviceId)
    revalidatePath(`/services/${serviceId}`)
    return { success: true }
  } catch (error) {
    console.error('Review creation error:', error)
    throw new Error('レビューの投稿に失敗しました')
  }
}

export async function updateReview(reviewId: number, formData: FormData) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    redirect('/auth/signin')
  }

  const review = await prisma.review.findUnique({
    where: { id: reviewId }
  })

  if (!review || review.userId !== Number(session.user.id)) {
    throw new Error('Unauthorized')
  }

  const validatedFields = ReviewSchema.omit({ serviceId: true }).safeParse({
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

  try {
    await prisma.review.update({
      where: { id: reviewId },
      data: validatedFields.data
    })

    await updateServiceRating(review.serviceId)
    revalidatePath(`/services/${review.serviceId}`)
    return { success: true }
  } catch (error) {
    console.error('Review update error:', error)
    throw new Error('レビューの更新に失敗しました')
  }
}

export async function deleteReview(reviewId: number) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    redirect('/auth/signin')
  }

  const review = await prisma.review.findUnique({
    where: { id: reviewId }
  })

  if (!review || review.userId !== Number(session.user.id)) {
    throw new Error('Unauthorized')
  }

  try {
    await prisma.review.delete({
      where: { id: reviewId }
    })

    await updateServiceRating(review.serviceId)
    revalidatePath(`/services/${review.serviceId}`)
    return { success: true }
  } catch (error) {
    console.error('Review deletion error:', error)
    throw new Error('レビューの削除に失敗しました')
  }
}

// Service Actions
export async function createService(formData: FormData) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    redirect('/auth/signin')
  }

  const validatedFields = ServiceSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    address: formData.get('address'),
    categoryId: Number(formData.get('categoryId')),
    phone: formData.get('phone'),
    website: formData.get('website'),
    openingHours: formData.get('openingHours'),
  })

  if (!validatedFields.success) {
    throw new Error('Invalid form data')
  }

  try {
    const service = await prisma.service.create({
      data: {
        ...validatedFields.data,
        createdById: Number(session.user.id)
      }
    })

    revalidatePath('/services')
    return { success: true, serviceId: service.id }
  } catch (error) {
    console.error('Service creation error:', error)
    throw new Error('サービスの登録に失敗しました')
  }
}

// User Actions
export async function updateUserProfile(formData: FormData) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    redirect('/auth/signin')
  }

  const validatedFields = UserProfileSchema.safeParse({
    name: formData.get('name'),
    bio: formData.get('bio'),
    location: formData.get('location'),
  })

  if (!validatedFields.success) {
    throw new Error('Invalid form data')
  }

  try {
    await prisma.user.update({
      where: { id: Number(session.user.id) },
      data: validatedFields.data
    })

    revalidatePath('/profile')
    return { success: true }
  } catch (error) {
    console.error('Profile update error:', error)
    throw new Error('プロフィールの更新に失敗しました')
  }
}

// Utility Functions
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

// Like/Unlike Actions
export async function toggleReviewLike(reviewId: number) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    redirect('/auth/signin')
  }

  try {
    const existingLike = await prisma.reviewLike.findUnique({
      where: {
        userId_reviewId: {
          userId: Number(session.user.id),
          reviewId: reviewId
        }
      }
    })

    if (existingLike) {
      await prisma.reviewLike.delete({
        where: { id: existingLike.id }
      })
    } else {
      await prisma.reviewLike.create({
        data: {
          userId: Number(session.user.id),
          reviewId: reviewId
        }
      })
    }

    revalidatePath('/reviews')
    return { success: true }
  } catch (error) {
    console.error('Like toggle error:', error)
    throw new Error('いいねの処理に失敗しました')
  }
}