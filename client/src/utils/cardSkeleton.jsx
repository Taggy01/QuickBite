function CardSkeleton() {
    return (
        <div className="card bg-base-100 w-52 border border-neutral-content px-4">
            <div className="aspect-square pt-4">
                <div className="skeleton w-full h-full rounded-lg"></div>
            </div>

            <div className="card-body p-4 space-y-3">
                <div className="skeleton h-4 w-3/4"></div>
                <div className="skeleton h-3 w-1/2"></div>

                <div className="flex justify-between items-center pt-4">
                    <div className="skeleton h-4 w-16"></div>
                    <div className="skeleton h-8 w-16 rounded-lg"></div>
                </div>
            </div>
        </div>
    );
}

export default CardSkeleton;