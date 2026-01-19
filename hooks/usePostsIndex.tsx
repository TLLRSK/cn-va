"use client";

import { ProjectData, IndexedPosts } from "@/types/types";
import { useEffect, useState } from "react";

function usePostsIndex(allProjects: ProjectData[], id: number) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [indexedPosts, setIndexedPosts] = useState<IndexedPosts>({
    prev: null,
    next: null,
  });

  const getPostsUrl = (id: number) => {

    if (allProjects.length > 0) {
      const currentIndex = allProjects.findIndex((post) => post.id === id);
      
      setCurrentIndex(currentIndex);

      if (currentIndex !== -1) {
        const prevIndex = currentIndex === 0 ? allProjects.length - 1 : currentIndex-1;
        const nextIndex =
          currentIndex + 1 < allProjects.length ? currentIndex + 1 : 0;

        setIndexedPosts({
          prev: {
            url: allProjects[prevIndex].slug,
            title: allProjects[prevIndex].title.rendered,
          },
          next: {
            url: allProjects[nextIndex].slug,
            title: allProjects[nextIndex].title.rendered,
          },
        });
      }
    }
  };

  useEffect(() => {
    getPostsUrl(id);
  }, []);

  return { currentIndex, indexedPosts };
}

export default usePostsIndex;
