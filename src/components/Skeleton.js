import React from 'react'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonComp = () => {
  return (
    <div>
         <Skeleton height={40} width={300} className="mb-6" />
          <Skeleton height={30} width={200} className="mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton height={50} className="w-full mb-4" />
            <Skeleton height={50} className="w-full mb-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Skeleton height={50} className="w-full mb-4" />
            <Skeleton height={50} className="w-full mb-4" />
          </div>
          <Skeleton height={30} width={200} className="mb-4 mt-6" />
          <Skeleton height={100} className="w-full mb-4" />
          <Skeleton height={30} width={200} className="mb-4 mt-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton height={100} className="w-full mb-4" />
            <Skeleton height={100} className="w-full mb-4" />
          </div>
          <Skeleton height={30} width={200} className="mb-4 mt-6" />
          <Skeleton height={50} className="w-full mb-4" />
          <Skeleton height={50} width={150} className="mx-auto mt-8" />
    </div>
  )
}

export default SkeletonComp;