export default function Balloon({
  isUser,
  text,
  title,
  time,
  className = '',
}: {
  isUser: boolean;
  text: string;
  title?: string;
  time?: string;
  className?: string;
}) {
  const bubbleBase = isUser
    ? 'bg-gradient-to-r from-[#1E75FF] to-[#2EA2FF] text-white rounded-bl-none'
    : 'bg-[#e7dfdf1f] text-white rounded-br-none';

  return (
    <div
      className={`max-w-6/12 flex ${isUser ? 'justify-start' : 'justify-end'}`}
    >
      <div
        className={`relative max-w-[85%] min-w-0 px-6 py-4 rounded-3xl ${bubbleBase} ${className}`}
      >
        {title && (
          <div className="font-semibold text-sm leading-5 tracking-normal text-[#FFFFFF80] mb-2">
            {title}
          </div>
        )}
        <div className="font-normal text-sm leading-5 tracking-normal wrap-break-word whitespace-pre-wrap">
          {text}
        </div>
        <div className={`mt-2 flex items-center gap-2 $ text-white/80`}>
          {time && <span className="text-xs">{time}</span>}
          {isUser && (
            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4">
              <path
                d="M9 16l-3.5-3.5 1.4-1.4L9 13.2l8.1-8.1 1.4 1.4z"
                fill="currentColor"
              />
              <path
                d="M6.5 16l-3.5-3.5 1.4-1.4L6.5 13.2 14.6 5.1l1.4 1.4z"
                fill="currentColor"
                opacity="0.8"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
