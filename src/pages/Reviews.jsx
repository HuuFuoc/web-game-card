import React, { useRef, useEffect, useState } from "react";
import Tree from "react-d3-tree";
import "../Reviews.css";

/* Dữ liệu ví dụ (nhiều nhánh) */
const familyData = {
  name: "Ông Tổ",
  avatar: "/ongto.png",  // 👉 ảnh để import (đặt trong public hoặc import từ src/assets)
  children: [
    {
      name: "Nhánh A",
      children: [
        {
          name: "Con A1",
          children: [
            { name: "Cháu A1-1" },
            { name: "Cháu A1-2" },
            {
              name: "Cháu A1-3",
              children: [
                { name: "Chắt A1-3-1" },
                { name: "Chắt A1-3-2" },
                { name: "Chắt A1-3-3" },
              ],
            },
          ],
        },
        {
          name: "Con A2",
          children: [
            { name: "Cháu A2-1" },
            { name: "Cháu A2-2" },
          ],
        },
      ],
    },
    {
      name: "Nhánh B",
      children: [
        {
          name: "Con B1",
          children: [{ name: "Cháu B1-1" }, { name: "Cháu B1-2" }],
        },
        {
          name: "Con B2",
          children: [{ name: "Cháu B2-1" }, { name: "Cháu B2-2" }],
        },
      ],
    },
  ],
};

export default function Reviews() {
  const wrapperRef = useRef(null);
  const [size, setSize] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const setElSize = (rect) => {
      setSize({
        width: Math.max(300, Math.floor(rect.width)),
        height: Math.max(300, Math.floor(rect.height)),
      });
    };

    setElSize(el.getBoundingClientRect());

    let ro = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setElSize(entry.contentRect);
        }
      });
      ro.observe(el);
    } else {
      const onResize = () => setElSize(el.getBoundingClientRect());
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    return () => {
      if (ro) ro.disconnect();
    };
  }, []);

  const translate = { x: Math.round(size.width / 2), y: 100 };

  // Custom node: hình tròn + tên ở dưới
  const renderCircleNode = ({ nodeDatum }) => (
  <g>
    {nodeDatum.avatar ? (
      // Nếu có avatar thì hiển thị ảnh bo tròn
      <image
        href={nodeDatum.avatar}
        x={-40} // canh giữa
        y={-40}
        width={80}
        height={80}
        clipPath="circle(40px at 40px 40px)"
      />
    ) : (
      // Nếu không thì hiển thị vòng tròn gradient
      <circle
        r={40}
        fill="url(#purpleGradient)"
        stroke="#fff"
        strokeWidth={3}
      />
    )}

    {/* Tên hiển thị bên dưới */}
    <text
      x={0}
      y={60}
      textAnchor="middle"
      fontSize={14}
      fontWeight="600"
      fill="#fff"
    >
      {nodeDatum.name}
    </text>
  </g>
);


  return (
    <div className="review-container">
      <h2 className="review-title">Cây gia phả</h2>

      <div ref={wrapperRef} className="tree-wrapper">
        {size.width > 0 && size.height > 0 && (
          <Tree
            data={familyData}
            orientation="vertical"
            translate={translate}
            svgProps={{
              width: size.width,
              height: size.height,
              style: { width: "100%", height: "100%" },
            }}
            zoomable={true}
            scaleExtent={[0.1, 2]}
            nodeSize={{ x: 220, y: 180 }} // tăng khoảng cách giữa node
            separation={{ siblings: 1, nonSiblings: 1.4 }}
            renderCustomNodeElement={renderCircleNode}
          />
        )}
      </div>
    </div>
  );
}
