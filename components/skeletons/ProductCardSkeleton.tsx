export function ProductCardSkeleton() {
  return (
    <div className="glass-card h-full overflow-hidden">
      {/* Image placeholder */}
      <div className="relative aspect-square overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-gray-800 animate-pulse" />
      </div>

      {/* Content */}
      <div className="p-3.5 sm:p-5 space-y-3">
        <div className="h-3 bg-gray-800 rounded animate-pulse w-1/2" />

        <div className="h-6 bg-gray-800 rounded animate-pulse w-full" />

        <div className="flex items-center justify-between">
          <div className="h-6 bg-gray-800 rounded animate-pulse w-1/3" />

          {/* Colors indicator */}
          <div className="flex gap-1.5">
            <div className="w-4 h-4 rounded-full bg-gray-800 animate-pulse" />
            <div className="w-4 h-4 rounded-full bg-gray-800 animate-pulse" />
            <div className="w-4 h-4 rounded-full bg-gray-800 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}