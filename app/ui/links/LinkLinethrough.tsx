"use client";
import { TLink } from "@/types/types"
import Link from "next/link"

const LinkLinethrough = ({
    href,
    label,
    onClick = undefined,
    checkIsActive,
    className
}: {
    href: string,
    label: string,
    onClick?: () => void,
    checkIsActive: (link: TLink) => boolean,
    className: string
}) => {
    const link = {
        href,
        label
    }
    return (
        <Link 
            href={href} 
            className={
                `
                relative link-linethrough after:content-[''] after:absolute after:left-0 after:right-0 after:top-[50%] after:-translate-y-[50%] 
                after:h-[3px] after:bg-background after:transition-transform after:duration-500 after:ease-in_out will-change-transform
                ${checkIsActive(link)
                ? "after:scale-x-100 after:origin-left"
                : "after:scale-x-0 after:origin-right group-hover/menu:after:scale-x-100 group-hover/menu:after:origin-left"
                }
                ${className}`
            }
                onClick={onClick}>
            {label}
        </Link >
    )
}

export default LinkLinethrough;