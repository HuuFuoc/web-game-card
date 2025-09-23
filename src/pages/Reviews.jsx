import React, { useRef, useEffect, useState } from "react";
import Tree from "react-d3-tree";
import "../css/Reviews.css";

/* Dữ liệu ví dụ (có thể lấy từ BE) */
const familyData = {
  name: "Ông Tổ",
  avatar: "/ongto.png",
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
  const treeRef = useRef(null);
  const [size, setSize] = useState({ width: 800, height: 600 });
  const [selectedNode, setSelectedNode] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [zoomedNode, setZoomedNode] = useState(null);

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

  const isValidSize = Number.isFinite(size.width) && Number.isFinite(size.height) && size.width > 0 && size.height > 0;
  const translate = isValidSize ? { x: Math.round(size.width / 2), y: 100 } : { x: 400, y: 100 };

  // Xử lý click node: hiện popup gần vị trí click
  const handleNodeClick = (nodeDatum, event) => {
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (rect && event) {
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Tính vị trí popup tránh tràn màn hình
      const tooltipWidth = 300;
      const tooltipHeight = 200;
      let tooltipX = x + 20;
      let tooltipY = y - 100;

      if (tooltipX + tooltipWidth > size.width) {
        tooltipX = x - tooltipWidth - 20;
      }
      if (tooltipY < 0) {
        tooltipY = y + 20;
      }
      if (tooltipY + tooltipHeight > size.height) {
        tooltipY = size.height - tooltipHeight - 20;
      }

      setTooltipPosition({ x: tooltipX, y: tooltipY });
    }

    setSelectedNode(nodeDatum);
    setZoomedNode(nodeDatum.name);
    setTimeout(() => setZoomedNode(null), 200);
  };

  // Custom node: click để hiện popup
  const renderCustomNode = ({ nodeDatum }) => {
    const isZoomed = zoomedNode === nodeDatum.name;
     const isEmpty = !nodeDatum.avatar;
    return (
      <g
        onClick={(event) => handleNodeClick(nodeDatum, event.nativeEvent)}
        style={{ cursor: "pointer" }}
        transform={isZoomed ? "scale(1.1)" : "scale(1)"}
        className="transition-transform duration-200 ease-out"
      >
        {isEmpty ? (
        <>
          <circle r={35} fill="#222" stroke="#fff" strokeWidth={3} />
          <text
            x={0}
            y={8}
            textAnchor="middle"
            fontSize={32}
            fontWeight="bold"
            fill="#fff"
            style={{ pointerEvents: "none" }}
          >
            ?
          </text>
        </>
      ) : (
        <image
          href={nodeDatum.avatar}
          x={-35}
          y={-35}
          width={70}
          height={70}
          clipPath="circle(35px at 35px 35px)"
        />
      )}
      
         <text x={0} y={55} textAnchor="middle" fontSize={14} fontWeight="600" fill="#fff">
        {nodeDatum.name}
      </text>
      {nodeDatum.birthYear && (
        <text x={0} y={70} textAnchor="middle" fontSize={10} fill="#fff">
          {nodeDatum.birthYear}
        </text>
      )}
    </g>
  );
};

  return (
    <div className="review-container" style={{ position: "relative", minHeight: "100vh", background: "" }}>
      <h2 className="review-title" style={{ textAlign: "center", color: "#fff", paddingTop: 32, fontSize: 32 }}>Cây gia phả</h2>
      <div ref={wrapperRef} className="tree-wrapper" style={{ width: "100%", height: "80vh" }}>
        {isValidSize && (
          <Tree
            ref={treeRef}
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
            nodeSize={{ x: 220, y: 180 }}
            separation={{ siblings: 1, nonSiblings: 1.4 }}
            renderCustomNodeElement={renderCustomNode}
          />
        )}
      </div>
      {/* Popup thông tin node */}
      {selectedNode && (
        <div
          className="node-info-card fade-in-card"
          style={{
            position: "absolute",
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 4px 24px #0004",
            padding: 20,
            minWidth: 220,
            maxWidth: 300,
            zIndex: 100,
            // animation: "fade-in 0.2s",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <img
              src={selectedNode.avatar || "/placeholder.svg"}
              alt={selectedNode.name}
              style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover", border: "2px solid #8B5CF6" }}
            />
            <div>
              <h3 style={{ margin: 0, fontWeight: 600, fontSize: 18 }}>{selectedNode.name || "Chưa có tên"}</h3>
              {selectedNode.birthYear && <div style={{ fontSize: 12, color: "#666" }}>Sinh: {selectedNode.birthYear}</div>}
            </div>
          </div>
          {selectedNode.desc && <p style={{ fontSize: 14, color: "#444", marginBottom: 8 }}>{selectedNode.desc}</p>}
          {selectedNode.occupation && (
            <div style={{ fontSize: 13, color: "#555", marginBottom: 4 }}>
              <b>Nghề nghiệp:</b> {selectedNode.occupation}
            </div>
          )}
          {selectedNode.deathYear && (
            <div style={{ fontSize: 13, color: "#555", marginBottom: 4 }}>
              <b>Mất:</b> {selectedNode.deathYear}
            </div>
          )}
          <button
            onClick={() => setSelectedNode(null)}
            style={{
              marginTop: 12,
              width: "100%",
              background: "#8B5CF6",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "8px 0",
              cursor: "pointer",
              fontWeight: 500,
              fontSize: 14,
            }}
          >
            Đóng
          </button>
        </div>
      )}
    </div>
  );
}
