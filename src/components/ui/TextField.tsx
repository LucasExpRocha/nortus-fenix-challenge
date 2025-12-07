import { twMerge } from 'tailwind-merge';

type RHFRegister = {
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  ref?: React.RefCallback<HTMLInputElement>;
};

type TextFieldProps = {
  id: string;
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  type?: string;
  required?: boolean;
  className?: string;
  register?: RHFRegister;
  variant?: 'default' | 'filter';
  startIcon?: React.ReactNode;
  outside?: boolean;
  inputClassName?: string;
  containerClassName?: string;
};

export default function TextField({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  autoComplete,
  autoFocus,
  type = 'text',
  required = true,
  className,
  register,
  variant = 'default',
  startIcon,
  outside = false,
  inputClassName = '',
  containerClassName = '',
}: TextFieldProps) {
  const inputName = register?.name ?? id;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    register?.onChange?.(e);
    onChange?.(e.target.value);
  };

  return (
    <div className={twMerge('w-full', className)}>
      {variant === 'filter' ? (
        <div className={twMerge('w-full')}>
          {outside && (
            <label
              htmlFor={id}
              className={twMerge(
                'mb-1 block font-inter font-normal text-xs tracking-[0.32px] px-1'
              )}
            >
              {label} {required && <span className="text-[#FFB4AB]">*</span>}
            </label>
          )}
          <div
            className={twMerge(
              'relative flex items-center gap-3 h-[38px] rounded-3xl border border-slate-700 bg-[#0B1125] px-4 py-2 focus-within:border-blue-500',
              containerClassName
            )}
          >
            {startIcon && <span aria-hidden="true">{startIcon}</span>}
            <input
              {...register}
              id={id}
              name={inputName}
              type={type}
              autoComplete={autoComplete}
              autoFocus={autoFocus}
              value={value}
              onChange={handleChange}
              aria-invalid={!!error}
              aria-describedby={error ? `${id}-error` : undefined}
              aria-label={label}
              placeholder={placeholder}
              className={twMerge(
                outside
                  ? 'flex-1 bg-transparent font-inter not-italic font-normal text-[14px] leading-[22px] tracking-[0] outline-none placeholder-slate-400'
                  : 'peer flex-1 bg-transparent font-inter not-italic font-normal text-[14px] leading-[22px] tracking-[0] outline-none placeholder-transparent',
                inputClassName
              )}
            />
            {!outside && (
              <label
                htmlFor={id}
                className={twMerge(
                  'absolute left-4 transition-all pointer-events-none',
                  'peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2',
                  'peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:z-10 peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:text-xs',
                  'peer-focus:-top-2 peer-focus:translate-y-0 peer-focus:z-10 peer-focus:px-1 peer-focus:text-xs'
                )}
              >
                {label} {required && <span className="text-[#FFB4AB]">*</span>}
              </label>
            )}
          </div>

          {error && (
            <span
              id={`${id}-error`}
              className="mt-1 mx-4 block font-inter font-normal leading-5 tracking-[0.51px] text-sm text-red-500"
              aria-live="polite"
            >
              {error}
            </span>
          )}
        </div>
      ) : (
        <div className="relative w-full">
          {outside && (
            <label
              htmlFor={id}
              className={twMerge(
                'mb-1 block font-medium text-base leading-6 tracking-[0.15px] ml-5.5'
              )}
            >
              {label} {required && <span className="text-[#FFB4AB]">*</span>}
            </label>
          )}
          <div
            className={twMerge(
              'w-full rounded-2xl border border-slate-700 bg-[#0E1626] focus-within:border-blue-500 font-normal',
              containerClassName
            )}
          >
            <input
              {...register}
              id={id}
              name={inputName}
              type={type}
              autoComplete={autoComplete}
              autoFocus={autoFocus}
              value={value}
              onChange={handleChange}
              aria-invalid={!!error}
              aria-describedby={error ? `${id}-error` : undefined}
              placeholder={placeholder}
              className={twMerge(
                outside
                  ? 'w-full bg-transparent font-inter font-normal text-lg md:leading-7 tracking-[0.32px] py-2 px-5 md:py-5 rounded-2xl outline-none placeholder-slate-400'
                  : 'peer w-full bg-transparent font-inter font-normal text-lg md:leading-7 tracking-[0.32px] py-2 px-5 md:py-5 rounded-2xl outline-none placeholder-transparent peer-focus:placeholder-slate-400',
                inputClassName
              )}
            />

            {!outside && (
              <label
                htmlFor={id}
                className={twMerge(
                  'absolute left-4 transition-all pointer-events-none',
                  'peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2',
                  'peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:z-10 peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:text-xs',
                  'peer-focus:-top-2 peer-focus:translate-y-0 peer-focus:z-10 peer-focus:px-1 peer-focus:text-xs'
                )}
                style={{ transform: 'translateY(-50%)' }}
              >
                {label} {required && <span className="text-[#FFB4AB]">*</span>}
              </label>
            )}
          </div>

          {placeholder && !outside && (
            <span
              id={`${id}-placeholder`}
              className="mt-1 mx-4 block font-inter font-normal text-base leading-5 tracking-[0.51px]"
              aria-live="polite"
            >
              {placeholder}
            </span>
          )}

          {error && (
            <span
              id={`${id}-error`}
              className="mt-1 mx-4 block font-inter font-normal leading-5 tracking-[0.51px] text-sm text-red-500"
              aria-live="polite"
            >
              {error}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
