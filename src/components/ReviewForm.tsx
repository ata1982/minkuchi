'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Rating,
  FormField,
  Input,
  Textarea,
  ImageUpload,
  Button
} from '@/components/ui'

interface ReviewFormData {
  rating: number
  title: string
  content: string
  tags: string[]
  images: File[]
  companyId: string
  userId: string
  createdAt: Date
  id: string
}

interface ReviewFormProps {
  companyId: string
  companyName: string
  isOpen: boolean
  onClose: () => void
  onSubmit: (reviewData: ReviewFormData) => Promise<void>
}

export default function ReviewForm({ companyId, companyName, isOpen, onClose, onSubmit }: ReviewFormProps) {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    rating: 5,
    title: '',
    content: '',
    tags: [] as string[],
    images: [] as File[]
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const commonTags = [
    'サービス', '接客', '清潔感', '価格', '立地', '雰囲気', 
    'おすすめ', 'コスパ', '技術力', '満足', 'リピート', '改善希望'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }))
  }

  const handleTagToggle = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }))
  }

  const handleImageUpload = (files: File[]) => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files].slice(0, 5)
    }))
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'タイトルを入力してください'
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'レビュー内容を入力してください'
    } else if (formData.content.length < 10) {
      newErrors.content = 'レビュー内容は10文字以上で入力してください'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      const reviewData = {
        ...formData,
        companyId,
        userId: user!.id,
        createdAt: new Date(),
        id: Date.now().toString()
      }
      
      await onSubmit(reviewData)
      
      // フォームリセット
      setFormData({
        rating: 5,
        title: '',
        content: '',
        tags: [],
        images: []
      })
      
      onClose()
    } catch (error) {
      console.error('レビュー投稿エラー:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader 
        title="レビューを投稿" 
        subtitle={companyName}
        onClose={onClose} 
      />

      <form onSubmit={handleSubmit}>
        <ModalBody>
          {/* Rating */}
          <FormField label="評価" required>
            <div className="flex items-center space-x-4">
              <Rating 
                value={formData.rating} 
                onChange={handleRatingChange}
                size="lg"
              />
              <span className="text-lg font-semibold text-slate-700">
                {formData.rating === 5 ? '最高！' : 
                 formData.rating === 4 ? '良い' :
                 formData.rating === 3 ? '普通' :
                 formData.rating === 2 ? 'いまいち' : '悪い'}
              </span>
            </div>
          </FormField>

          {/* Title */}
          <FormField 
            label="タイトル" 
            required 
            {...(errors.title && { error: errors.title })}
            help={`${formData.title.length}/100`}
          >
            <Input
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="レビューのタイトルを入力してください"
              error={!!errors.title}
              maxLength={100}
            />
          </FormField>

          {/* Content */}
          <FormField 
            label="レビュー内容" 
            required 
            {...(errors.content && { error: errors.content })}
            help={`${formData.content.length}/1000`}
          >
            <Textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="サービスの感想や体験について詳しく教えてください"
              rows={6}
              error={!!errors.content}
              maxLength={1000}
            />
          </FormField>

          {/* Tags */}
          <FormField label="タグ（任意）">
            <div className="flex flex-wrap gap-2">
              {commonTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    formData.tags.includes(tag)
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            {formData.tags.length > 0 && (
              <p className="help-text mt-2">
                選択中: {formData.tags.join(', ')}
              </p>
            )}
          </FormField>

          {/* Image Upload */}
          <FormField label="写真（任意・最大5枚）">
            <ImageUpload
              onFilesChange={handleImageUpload}
              maxFiles={5}
              dragActive={dragActive}
              onDragActive={setDragActive}
            />
            
            {/* Image Preview */}
            {formData.images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                {formData.images.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index + 1}`}
                      className="image-preview"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="image-remove"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </FormField>
        </ModalBody>

        <ModalFooter>
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1"
          >
            キャンセル
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            loading={isSubmitting}
            className="flex-1"
          >
            レビューを投稿
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  )
}