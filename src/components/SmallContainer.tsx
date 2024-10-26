import { twMerge } from 'tailwind-merge';

interface props {
  children: React.ReactNode;
  className?: string;
}

const SmallContainer = ({ children, className }: props) => {
  return (
    <div
      className={twMerge(
        'mx-auto max-w-[1200px]',
        className
      )}
    >
      {children}
    </div>
  );
};

export default SmallContainer;
