// components/ScrollZoomComponent.js
"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../../styles/ScrollZoomComponent.module.css";

export default function ScrollZoomComponent() {
  const itemRefs = useRef([]); // 각 요소를 참조하는 배열
  const [activeIndex, setActiveIndex] = useState(null); // 현재 뷰포트에 있는 요소의 인덱스 저장

  // 각각의 항목을 객체로 정의
  const items = [
    { id: 1, content: "오늘도" },
    { id: 2, content: "내 하루는" },
    { id: 3, content: "평화롭다." },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setActiveIndex(index); // 뷰포트에 들어온 요소의 인덱스를 설정
          }
        });
      },
      { threshold: 0.5 }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      itemRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className={styles.zoomContainer}>
      {/* 객체 배열을 순회하여 각 요소에 대해 처리 */}
      {items.map((item, index) => (
        <div
          key={item.id}
          ref={(el) => (itemRefs.current[index] = el)}
          data-index={index}
          className={styles.zoomItem}
          style={{
            transform: activeIndex === index ? "scale(5)" : "scale(0.5)", // 활성화된 요소는 확대, 나머지는 축소
            transition: "transform 0.5s ease",
          }}
        >
          <h1>{item.content}</h1> {/* 각 객체의 content를 표시 */}
        </div>
      ))}
    </div>
  );
}
