export function SkeletonCard() {
    return (
        <>
            {[...Array(8)].map((_, index) => (
                <div key={index} className="animate-pulse w-full lg:w-60 h-64 bg-zinc-200 dark:bg-zinc-700 flex flex-col justify-center items-center py-3 gap-3 rounded-lg">
                    <p className="w-44 h-4 bg-gray-300 animate-pulse rounded"></p>
                    <div className="w-28 h-28 bg-gray-300 animate-pulse rounded-full"></div>
                    <p className="w-24 h-4 bg-gray-300 animate-pulse rounded"></p>
                    <div className="w-36 h-8 bg-gray-300 animate-pulse rounded"></div>
                </div>
            ))}

        </>
    )
}