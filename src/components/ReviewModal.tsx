'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'

interface ReviewModalProps {
  isOpen: boolean
  onClose: () => void
  companyName: string
  onSubmit?: (review: {
    rating: number
    title: string
    content: string
    images: File[]
  }) => Promise<void>
}

export default function ReviewModal({ 
  isOpen, 
  onClose, 
  companyName,
  onSubmit 
}: ReviewModalProps) {
  const { user } = useAuth()
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [images, setImages] = useState<File[]>([])
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen) return null

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      const newImages = [...images, ...files].slice(0, 5) // 最大5枚まで
      setImages(newImages)

      // プレビューURL生成
      const newPreviewUrls = newImages.map(file => URL.createObjectURL(file))
      setImagePreviewUrls(newPreviewUrls)
    }
  }

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    const newPreviewUrls = imagePreviewUrls.filter((_, i) => i !== index)
    setImages(newImages)
    setImagePreviewUrls(newPreviewUrls)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      alert('ログインが必要です')
      return
    }

    if (rating === 0) {
      alert('評価を選択してください')
      return
    }

    if (!title.trim() || !content.trim()) {
      alert('タイトルと内容を入力してください')
      return
    }

    setIsSubmitting(true)

    try {
      if (onSubmit) {
        await onSubmit({
          rating,
          title: title.trim(),
          content: content.trim(),
          images
        })
      }

      // フォームリセット
      setRating(0)
      setTitle('')
      setContent('')
      setImages([])
      setImagePreviewUrls([])
      onClose()
    } catch (error) {
      console.error('レビュー投稿エラー:', error)
      alert('レビューの投稿に失敗しました')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-bold text-slate-900">レビューを投稿</h2>
            <p className="text-slate-600 text-sm mt-1">{companyName}</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              評価 <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1 transition-colors"
                >
                  <svg
                    className={`w-8 h-8 ${
                      star <= (hoveredRating || rating)
                        ? 'text-yellow-400'
                        : 'text-slate-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </button>
              ))}
              <span className="ml-2 text-sm text-slate-600">
                {rating > 0 && (
                  <>
                    {rating === 1 && '悪い'}
                    {rating === 2 && 'やや悪い'}
                    {rating === 3 && '普通'}
                    {rating === 4 && '良い'}
                    {rating === 5 && 'とても良い'}
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              タイトル <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="レビューのタイトルを入力してください"
              className="input-field"
              maxLength={100}
            />
            <div className="text-right text-xs text-slate-500 mt-1">
              {title.length}/100
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              レビュー内容 <span className="text-red-500">*</span>
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="サービスの詳細な感想を教えてください&#10;・料理の味、サービスの質について&#10;・店内の雰囲気について&#10;・価格に対する満足度について"
              className="input-field min-h-[120px] resize-y"
              maxLength={1000}
            />
            <div className="text-right text-xs text-slate-500 mt-1">
              {content.length}/1000
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              写真を追加（最大5枚）
            </label>
            
            {/* Image Previews */}
            {imagePreviewUrls.length > 0 && (
              <div className="grid grid-cols-5 gap-2 mb-4">
                {imagePreviewUrls.map((url, index) => (
                  <div key={index} className="relative aspect-square">
                    <img
                      src={url}
                      alt={`プレビュー ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload Button */}
            {images.length < 5 && (
              <label className="block">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="sr-only"
                />
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-slate-400 transition-colors cursor-pointer">
                  <svg className="w-8 h-8 text-slate-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                  <p className="text-sm text-slate-600">
                    クリックして写真を追加
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    PNG, JPG, GIF (最大10MB)
                  </p>
                </div>
              </label>
            )}
          </div>

          {/* Guidelines */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-900 mb-2">📝 レビューガイドライン</h4>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• 実際に利用された体験をもとに記載してください</li>
              <li>• 他の方にとって有用な情報を含めてください</li>
              <li>• 個人情報や誹謗中傷は含めないでください</li>
              <li>• 写真は店内の雰囲気や料理を撮影したものをご利用ください</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-ghost flex-1"
              disabled={isSubmitting}
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="btn-primary flex-1"
              disabled={isSubmitting || rating === 0 || !title.trim() || !content.trim()}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  投稿中...
                </div>
              ) : (
                'レビューを投稿'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}