const EmptyCartIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="100" cy="100" r="90" fill="#F0F9F9" />
      <path
        d="M65 75H135L125 125H75L65 75Z"
        stroke="#018884"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="white"
      />
      <path
        d="M65 75L55 55H40"
        stroke="#018884"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="80" cy="135" r="5" fill="#018884" />
      <circle cx="120" cy="135" r="5" fill="#018884" />
      <path
        d="M90 60C90 60 95 45 110 45"
        stroke="#A8D4D3"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M95 95L105 105M105 95L95 105"
        stroke="#003D3B"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default EmptyCartIcon;
