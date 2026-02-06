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
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white drop-shadow-lg">Медиа</h1>

      {/* Types Filter */}
      <div className="flex flex-wrap gap-2 sm:gap-4 mb-8 sm:mb-12">
        {postTypes.map((type) => (
          <button
            key={type.value}
            onClick={() => setSelectedType(type.value)}
            className={`px-5 sm:px-8 py-2.5 transition-all duration-300 text-xs font-bold uppercase tracking-widest border ${selectedType === type.value
                ? 'bg-brand-crimson/10 border-brand-crimson text-white shadow-[0_0_20px_rgba(220,20,60,0.4)]'
                : 'bg-black border-white/10 hover:border-white/30 text-white/60 hover:text-white'
              }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-white/70">Загрузка...</p>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-white/70 text-lg">Материалов этого типа пока нет</p>
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
