"use client";

import { useLenis } from "@/app/context/lenisContext";
import { useEffect, useRef } from "react";

const useBlockScrolling = (isOpen: boolean) => {
  const lenis = useLenis();
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined" || !lenis) return;

    const btn = document.querySelector(".topbar") as HTMLElement | null;
    const originalBtnMarginRight = btn ? btn.style.marginRight : "";

    if (isOpen) {
      scrollPositionRef.current = window.scrollY;

      lenis.stop();

      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = "hidden";

      if (btn && scrollBarWidth > 0) {
        const computed = getComputedStyle(btn);
        const computedMarginRight = parseFloat(computed.marginRight) || 0;
        btn.style.marginRight = `${computedMarginRight + scrollBarWidth}px`;
      }

      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }
    } else {
      const savedPosition = scrollPositionRef.current;
     
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";

      if (btn) {
        btn.style.marginRight = originalBtnMarginRight;
      }
   
      requestAnimationFrame(() => {
        window.scrollTo({
          top: savedPosition,
          behavior: 'instant' as ScrollBehavior
        });
 
        requestAnimationFrame(() => {
          lenis.start();
        });
      });
    }

    return () => {
      if (btn) {
        btn.style.marginRight = originalBtnMarginRight;
      }
      if (isOpen) {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
        lenis.start();
      }
    };
  }, [isOpen, lenis]);
};

export default useBlockScrolling;