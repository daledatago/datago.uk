type DatagoMarkProps = {
  className?: string;
  size?: number;
};

export function DatagoMark({ className = "", size = 36 }: DatagoMarkProps) {
  return (
    <svg
      aria-hidden="true"
      className={`datago-mark ${className}`.trim()}
      height={size}
      viewBox="0 0 64 64"
      width={size}
    >
      <rect className="datago-mark__sq-1" x="6" y="6" width="34" height="34" rx="6" />
      <rect className="datago-mark__sq-2" x="24" y="24" width="34" height="34" rx="6" />
    </svg>
  );
}

