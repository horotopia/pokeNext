"use client";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Logo({ onClick }) {
  const router = useRouter();
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.push('/');
    }
  };

  return (
    <div className="cursor-pointer" onClick={handleClick}>
      <Image 
        src="/images.jpeg" 
        alt="Pokedex Logo" 
        width={128} 
        height={80} 
        className="h-auto w-32"
        priority
      />
    </div>
  );
}
