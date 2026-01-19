export default function PortfolioListSkeleton() {
  return (
    <div className="flex flex-col-reverse">
      <div className="flex gap-4 mb-8 animate-pulse">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-8 w-20 bg-gray-200 rounded" />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-64 bg-gray-100 rounded-lg" />
        ))}
      </div>
    </div>
  );
}