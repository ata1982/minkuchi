import { useState } from 'react'
import { Company } from '@/types/index'

interface CompanyTabProps {
  ownedCompanies: Company[]
  onCompanyUpdate: (company: Company, updates: Partial<Company>) => void
}

export function CompanyTab({ ownedCompanies, onCompanyUpdate }: CompanyTabProps) {
  const [editingCompany, setEditingCompany] = useState<Company | null>(null)
  const [formData, setFormData] = useState<Partial<Company>>({})

  const handleEdit = (company: Company) => {
    setEditingCompany(company)
    setFormData(company)
  }

  const handleSave = () => {
    if (!editingCompany || !formData) return
    onCompanyUpdate(editingCompany, formData)
    setEditingCompany(null)
    setFormData({})
  }

  const handleCancel = () => {
    setEditingCompany(null)
    setFormData({})
  }

  return (
    <div className="space-y-6">
      {ownedCompanies.map(company => (
        <div key={company.id} className="bg-white p-6 rounded-lg shadow">
          {editingCompany?.id === company.id ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">企業情報を編集</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">企業名</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">説明</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">住所</label>
                  <input
                    type="text"
                    value={formData.address || ''}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">電話番号</label>
                  <input
                    type="text"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ウェブサイト</label>
                <input
                  type="text"
                  value={formData.website || ''}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  保存
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  キャンセル
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{company.name}</h3>
                  <p className="text-sm text-gray-600">{company.category}</p>
                </div>
                <button
                  onClick={() => handleEdit(company)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  編集
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">住所:</span> {company.address}
                </div>
                <div>
                  <span className="font-medium">電話番号:</span> {company.phone}
                </div>
                <div>
                  <span className="font-medium">評価:</span> {company.rating} ({company.reviewCount}件のレビュー)
                </div>
                <div>
                  <span className="font-medium">ウェブサイト:</span>{' '}
                  {company.website ? (
                    <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                      {company.website}
                    </a>
                  ) : (
                    <span className="text-gray-500">未設定</span>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <span className="font-medium">説明:</span>
                <p className="text-gray-700 mt-1">{company.description}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}