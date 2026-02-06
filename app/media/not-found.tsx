import Link from 'next/link'

export default function PostNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-brand-dark to-black">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">📰</div>
        <h1 className="text-4xl font-bold text-white mb-4">Статья не найдена</h1>
        <p className="text-gray-400 mb-8">
          Статья, которую вы ищете, не существует или была удалена.
        </p>
        <div className="flex flex-col gap-4">
          <Link
            href="/media"
            className="px-6 py-3 bg-brand-red text-white rounded-lg hover:bg-brand-dark transition-colors"
          >
            Все статьи
          </Link>
          <Link
            href="/"
            className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
          >
            На главную
          </Link>
        </div>
      </div>
    </div>
  )
}