"use client";

function Overlay({ onClose }: { onClose: () => void }) {
  const closeOverlay = () => {
    setTimeout(() => {
      onClose();
    }, 50);
  };
  return (
    <div
      onClick={closeOverlay}
      className={`overlay fixed inset-0 z-40 backdrop-blur-sm`}
    />
  );
}

export default Overlay;
