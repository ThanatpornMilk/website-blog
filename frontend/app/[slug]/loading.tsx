/**
 * Blog Detail Loading State
 * Skeleton screen for the blog post content.
 */
export default function Loading() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12">
      {/* Skeleton for Header */}
      <div className="h-[400px] w-full bg-stone-100 rounded-3xl animate-pulse mb-12" />

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Skeleton for Title */}
        <div className="h-10 w-3/4 bg-stone-100 rounded-lg animate-pulse" />
        <div className="h-4 w-1/4 bg-stone-100 rounded-lg animate-pulse" />

        {/* Skeleton for Content */}
        <div className="space-y-3 pt-8">
          <div className="h-4 w-full bg-stone-100 rounded animate-pulse" />
          <div className="h-4 w-full bg-stone-100 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-stone-100 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
