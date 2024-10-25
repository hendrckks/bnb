import { twMerge } from 'tailwind-merge';

interface props {
  children: React.ReactNode;
  className?: string;
}

const LargeContainer = ({ children, className }: props) => {
  return (
    <div
      className={twMerge(
        'mx-auto max-w-[92vw] flex items-center justify-center',
        className
      )}
    >
      {children}
    </div>
  );
};

export default LargeContainer;
