export function PostCardSkeleton() {
  return (
    <div className="glass-card h-full overflow-hidden">
      {/* Image */}
      <div className="aspect-[16/10] relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-800 animate-pulse" />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 space-y-3">
        <div className="h-4 bg-gray-800 rounded animate-pulse w-1/3" />

        <div className="h-6 bg-gray-800 rounded animate-pulse w-full" />

        <div className="h-4 bg-gray-800 rounded animate-pulse w-3/4" />
      </div>
    </div>
  )
}