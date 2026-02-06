export function EventCardSkeleton() {
  return (
    <div className="glass-card h-full overflow-hidden">
      {/* Image placeholder */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <div className="absolute inset-0 bg-gray-800 animate-pulse" />
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-800 rounded animate-pulse w-1/3" />
        <div className="h-6 bg-gray-800 rounded animate-pulse w-full" />
        <div className="h-6 bg-gray-800 rounded animate-pulse w-2/3" />
        <div className="flex justify-between">
          <div className="h-4 bg-gray-800 rounded animate-pulse w-1/4" />
          <div className="h-4 bg-gray-800 rounded animate-pulse w-1/4" />
        </div>
      </div>
    </div>
  )
}