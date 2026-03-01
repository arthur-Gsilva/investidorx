import { Skeleton } from "@/components/ui/skeleton"

export const SkeletonBox = () => {
    return(
        <div className="flex w-full h-40">
            <Skeleton 
                className="w-full h-40"
            />
        </div>
    )
}