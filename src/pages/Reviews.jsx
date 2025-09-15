import React, { useState } from "react";
import Tree from "react-d3-tree";
import "../Reviews.css";

const rawData = {
  name: "Ông Tổ",
  info: "Người khai sinh dòng họ",
  children: [
    {
      name: "Con trai 1",
      info: "Thông tin chi tiết Con trai 1",
      children: [
        { name: "Cháu 1.1", info: "Thông tin Cháu 1.1" },
        { name: "Cháu 1.2", info: "Thông tin Cháu 1.2" },
        {
          name: "Cháu 1.3",
          info: "Thông tin Cháu 1.3",
          children: [
            { name: "Chắt 1.3.1", info: "Thông tin Chắt 1.3.1" },
            { name: "Chắt 1.3.2", info: "Thông tin Chắt 1.3.2" },
            {
              name: "Chắt 1.3.3",
              info: "Thông tin Chắt 1.3.3",
              children: [
                { name: "Hậu duệ 1.3.3.1", info: "Thông tin Hậu duệ 1.3.3.1" },
                { name: "Hậu duệ 1.3.3.2", info: "Thông tin Hậu duệ 1.3.3.2" },
                { name: "Hậu duệ 1.3.3.3", info: "Thông tin Hậu duệ 1.3.3.3" },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Con trai 2",
      info: "Thông tin Con trai 2",
      children: [
        { name: "Cháu 2.1", info: "Thông tin Cháu 2.1" },
        { name: "Cháu 2.2", info: "Thông tin Cháu 2.2" },
        {
          name: "Cháu 2.3",
          info: "Thông tin Cháu 2.3",
          children: [
            { name: "Chắt 2.3.1", info: "Thông tin Chắt 2.3.1" },
            { name: "Chắt 2.3.2", info: "Thông tin Chắt 2.3.2" },
            { name: "Chắt 2.3.3", info: "Thông tin Chắt 2.3.3" },
          ],
        },
      ],
    },
    {
      name: "Con trai 3",
      info: "Thông tin Con trai 3",
      children: [
        { name: "Cháu 3.1", info: "Thông tin Cháu 3.1" },
        { name: "Cháu 3.2", info: "Thông tin Cháu 3.2" },
        { name: "Cháu 3.3", info: "Thông tin Cháu 3.3" },
        {
          name: "Cháu 3.4",
          info: "Thông tin Cháu 3.4",
          children: [
            { name: "Chắt 3.4.1", info: "Thông tin Chắt 3.4.1" },
            { name: "Chắt 3.4.2", info: "Thông tin Chắt 3.4.2" },
            {
              name: "Chắt 3.4.3",
              info: "Thông tin Chắt 3.4.3",
              children: [
                { name: "Hậu duệ 3.4.3.1", info: "Thông tin Hậu duệ 3.4.3.1" },
                { name: "Hậu duệ 3.4.3.2", info: "Thông tin Hậu duệ 3.4.3.2" },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Con gái 1",
      info: "Thông tin Con gái 1",
      children: [
        { name: "Cháu gái 1.1", info: "Thông tin Cháu gái 1.1" },
        { name: "Cháu gái 1.2", info: "Thông tin Cháu gái 1.2" },
        {
          name: "Cháu gái 1.3",
          info: "Thông tin Cháu gái 1.3",
          children: [
            { name: "Chắt gái 1.3.1", info: "Thông tin Chắt gái 1.3.1" },
            { name: "Chắt gái 1.3.2", info: "Thông tin Chắt gái 1.3.2" },
          ],
        },
      ],
    },
    {
      name: "Con gái 2",
      info: "Thông tin Con gái 2",
      children: [
        { name: "Cháu gái 2.1", info: "Thông tin Cháu gái 2.1" },
        { name: "Cháu gái 2.2", info: "Thông tin Cháu gái 2.2" },
        { name: "Cháu gái 2.3", info: "Thông tin Cháu gái 2.3" },
        {
          name: "Cháu gái 2.4",
          info: "Thông tin Cháu gái 2.4",
          children: [
            { name: "Chắt gái 2.4.1", info: "Thông tin Chắt gái 2.4.1" },
            { name: "Chắt gái 2.4.2", info: "Thông tin Chắt gái 2.4.2" },
            { name: "Chắt gái 2.4.3", info: "Thông tin Chắt gái 2.4.3" },
          ],
        },
      ],
    },
  ],
};

// Collapse tất cả node từ đầu
const collapseAll = (node) => {
  if (node.children) {
    node._children = node.children;
    node._children.forEach(collapseAll);
    node.children = null;
  }
};

export default function FamilyTree() {
  const [treeData, setTreeData] = useState(() => {
    const clone = JSON.parse(JSON.stringify(rawData));
    collapseAll(clone);
    return [clone];
  });

  const [selectedNodeName, setSelectedNodeName] = useState(null);

  const handleToggle = (nodeName, node) => {
    if (node.name === nodeName) {
      if (node.children) {
        node._children = node.children;
        node.children = null;
      } else if (node._children) {
        node.children = node._children;
        node._children = null;
      }
    } else {
      if (node.children) node.children.forEach((c) => handleToggle(nodeName, c));
      if (node._children) node._children.forEach((c) => handleToggle(nodeName, c));
    }
  };

  const onNodeClick = (nodeDatum) => {
    const clone = JSON.parse(JSON.stringify(treeData[0]));
    handleToggle(nodeDatum.name, clone);
    setTreeData([clone]);

    setSelectedNodeName(nodeDatum.name);
  };

  return (
    <div className="review-container">
      <h2 className="review-title">CÂY GIA PHẢ</h2>
      <div style={{ display: "flex", height: "100%" }}>
        <div className="tree-wrapper" style={{ flex: 1 }}>
          <Tree
            data={treeData}
            orientation="vertical"
            translate={{ x: 600, y: 80 }}
            nodeSize={{ x: 250, y: 150 }}
            collapsible={false}
            renderCustomNodeElement={({ nodeDatum }) => {
              const hasChildren = nodeDatum.children || nodeDatum._children;
              const isCollapsed = !!nodeDatum._children;
              const isSelected = nodeDatum.name === selectedNodeName;

              return (
                <g onClick={() => onNodeClick(nodeDatum)} style={{ cursor: "pointer" }}>
                  <circle r={28} fill="lightblue" stroke="steelblue" strokeWidth="2" />
                  <text fill="black" x="35" dy="5" fontSize="16px" fontWeight="700">
                    {nodeDatum.name}
                  </text>
                  {hasChildren && (
                    <text
                      x="0"
                      y="-35"
                      textAnchor="middle"
                      style={{ fontSize: "20px", fontWeight: "bold" }}
                    >
                      {isCollapsed ? "+" : "−"}
                    </text>
                  )}

                  {/* Khung thông tin nhỏ bên cạnh node */}
                  {isSelected && nodeDatum.info && (
                    <g transform="translate(50, -10)">
                      <rect
                        x={0}
                        y={0}
                        width={150}
                        height={50}
                        fill="rgba(255, 255, 255, 1)"
                        rx={8}
                        ry={8}
                      />
                      <text
                        x={10}
                        y={25}
                        fill="white"
                        fontSize="12px"
                      >
                        {nodeDatum.info}
                      </text>
                    </g>
                  )}
                </g>
              );
            }}
          />
        </div>
      </div>
    </div>
  );
}
