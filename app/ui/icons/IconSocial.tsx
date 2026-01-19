const IconSocial = ({ className, code, color }: { className: string; code: string; color: string }) => {
  return (
    <svg
      width="24" height="24" viewBox="0 0 31 32" fill="none"
      className={className}
    >
      <path
        d={code}
        fill={color}
      />
    </svg>
  );
}

export default IconSocial;
