import { twMerge } from 'tailwind-merge';

type Option = string | { value: string; label: string };

type SelectProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  ariaLabel?: string;
  className?: string;
  containerClassName?: string;
  selectClassName?: string;
  placeholder?: string;
};

function ChevronDownIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width={16}
      height={16}
      aria-hidden="true"
      className="opacity-80 text-white"
    >
      <path
        d="M4 6l4 4 4-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Select({
  id,
  value,
  onChange,
  options,
  ariaLabel,
  className,
  containerClassName,
  selectClassName,
  placeholder,
}: SelectProps) {
  return (
    <div className={twMerge('w-full', className)}>
      <div
        className={twMerge(
          'flex items-center gap-2.5 h-[38px] rounded-3xl bg-[#0B1125] pr-2 pl-4',
          containerClassName
        )}
        style={{ transform: 'rotate(0deg)', opacity: 1 }}
      >
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label={ariaLabel}
          className={twMerge(
            'w-full bg-transparent text-white text-sm outline-none appearance-none cursor-pointer',
            selectClassName
          )}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((opt) => {
            const val = typeof opt === 'string' ? opt : opt.value;
            const label = typeof opt === 'string' ? opt : opt.label;
            return (
              <option key={val} value={val}>
                {label}
              </option>
            );
          })}
        </select>
        <ChevronDownIcon />
      </div>
    </div>
  );
}
