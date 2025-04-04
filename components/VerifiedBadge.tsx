"use client";

import Image from "next/image";

interface Props {
  className?: string;
}

const VerifiedBadge = ({ className }: Props) => {
  return (
    <div className={`flex items-center gap-1 text-lystioPurple ${className}`}>
      <Image 
        src="/images/verified.svg" 
        width={16} 
        height={16} 
        alt="Verified"
      />
      <span className="text-xs font-medium">Verified</span>
    </div>
  );
};

export default VerifiedBadge;