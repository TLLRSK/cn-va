"use client";

import { useEffect } from "react";

function ScrollToTop() {
    useEffect(() => {
        scrollTo(0, 0)
    }, [])
  return null
}

export default ScrollToTop