const ButtonToggler = ({ text, isOpen, setIsOpen, className }: { text: string, isOpen: boolean, setIsOpen: (isOpen: boolean) => void, className: string }) => {
    return (
        <button
            className={`flex fixed text-md md:text-lg p-sm md:px-md font-extrabold xl:hover:opacity-60 transition-opacity text-primary mix-blend-difference hover:cursor-pointer uppercase ${className}`} onClick={() => setIsOpen(!isOpen)}>
            {text}
        </button>
    )
}

export default ButtonToggler;
