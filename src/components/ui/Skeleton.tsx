import { twMerge } from 'tailwind-merge';

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export default function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={twMerge('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  );
}
