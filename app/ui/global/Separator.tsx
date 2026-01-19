import React from 'react'

type Separator = "primary" | "secondary" | "highlight" | "muted" | "accent" | "inverse" | "background" | "foreground";

function Separator({ color, className }: { color: Separator, className?: string}) {
  return (
    <span className={`h-[1px] w-full flex bg-${color} ${className}`} />
  )
}

export default Separator