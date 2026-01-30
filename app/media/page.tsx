'use client'

import { useEffect, useState } from 'react'
import { getPosts } from '@/lib/content'
import { PostCard } from '@/components/cards/PostCard'
import { Container } from '@/components/ui/Container'
import { Post } from '@/lib/types'

const postTypes = [
  { value: 'all', label: 'Все' },
  { value: 'photo', label: 'Фото' },
  { value: 'video', label: 'Видео' },
  { value: 'news', label: 'Новости' },
  { value: 'case', label: 'Кейсы' },
]

export default function MediaPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [selectedType, setSelectedType] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPosts().then((data) => {
      setPosts(data)
      setLoading(false)
    })
  }, [])

  const filteredPosts =
    selectedType === 'all'
      ? posts
      : posts.filter((p) => p.type === selectedType)

  return (
    <Container className="py-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">Медиа</h1>

      {/* Types Filter */}
      <div className="flex flex-wrap gap-3 mb-8">
        {postTypes.map((type) => (
          <button
            key={type.value}
            onClick={() => setSelectedType(type.value)}
            className={`px-6 py-2 rounded-full transition-all duration-300 ${
              selectedType === type.value
                ? 'bg-brand-red text-white'
                : 'bg-white/50 hover:bg-white/80 backdrop-blur-sm border border-gray-200'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Загрузка...</p>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Материалов этого типа пока нет</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </Container>
  )
}
