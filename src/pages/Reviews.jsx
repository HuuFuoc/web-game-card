import React, { useState } from "react";
import Tree from "react-d3-tree";
import "../Reviews.css";

const rawData = {
  name: "Ông Tổ",
  info: "Người khai sinh dòng họ",
  children: [
    {
      name: "Con trai 1",
      info: "Thông tin Con trai 1",
      children: [
        
        {
          name: "Cháu 1.2",
          info: "Thông tin Cháu 1.2",
          children: [
            { name: "Chắt 1.2.1", info: "Thông tin Chắt 1.2.1" },
            { name: "Chắt 1.2.2", info: "Thông tin Chắt 1.2.2" },
            
          ],
        },
        {
          name: "Cháu 1.3",
          info: "Thông tin Cháu 1.3",
          children: [
            {
              name: "Chắt 1.3.1",
              info: "Thông tin Chắt 1.3.1",
              children: [
                { name: "Hậu duệ 1.3.1.1", info: "Thông tin Hậu duệ 1.3.1.1" },
                { name: "Hậu duệ 1.3.1.2", info: "Thông tin Hậu duệ 1.3.1.2" },
              ],
            },
            { name: "Chắt 1.3.2", info: "Thông tin Chắt 1.3.2" },
            
          ],
        },
      ],
    },
    {
      name: "Con trai 2",
      info: "Thông tin Con trai 2",
      children: [
        
        {
          name: "Cháu 2.3",
          info: "Thông tin Cháu 2.3",
          children: [
            { name: "Chắt 2.3.1", info: "Thông tin Chắt 2.3.1" },
            { name: "Chắt 2.3.2", info: "Thông tin Chắt 2.3.2" },
          ],
        },
        {
          name: "Cháu 2.4",
          info: "Thông tin Cháu 2.4",
          children: [
            { name: "Chắt 2.4.1", info: "Thông tin Chắt 2.4.1" },
            { name: "Chắt 2.4.2", info: "Thông tin Chắt 2.4.2" },
           
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
  const [selectedNodeForAdd, setSelectedNodeForAdd] = useState(null); 
  const [newNodeName, setNewNodeName] = useState("");

  // Toggle expand/collapse
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

  // Khi click node
  const onNodeClick = (nodeDatum) => {
    const clone = JSON.parse(JSON.stringify(treeData[0]));
    handleToggle(nodeDatum.name, clone);
    setTreeData([clone]);

    if (selectedNodeName === nodeDatum.name) {
      setSelectedNodeName(null);
    } else {
      setSelectedNodeName(nodeDatum.name);
    }

    setSelectedNodeForAdd(nodeDatum.name);
  };

  // Hàm thêm node mới
  const addChildNode = () => {
    if (!selectedNodeForAdd || !newNodeName.trim()) return;

    const clone = JSON.parse(JSON.stringify(treeData[0]));

    const dfs = (node) => {
      if (node.name === selectedNodeForAdd) {
        if (!node.children) node.children = [];
        node.children.push({ name: newNodeName, info: `Thông tin ${newNodeName}` });
      } else {
        if (node.children) node.children.forEach(dfs);
        if (node._children) node._children.forEach(dfs);
      }
    };

    dfs(clone);
    setTreeData([clone]);
    setNewNodeName("");
  };

  return (
    <div className="review-container">
      <h2 className="review-title">CÂY GIA PHẢ</h2>

      {/* Form thêm node */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20px",
          gap: "10px",
        }}
      >
        <input
          type="text"
          placeholder="Tên node mới"
          value={newNodeName}
          onChange={(e) => setNewNodeName(e.target.value)}
          disabled={!selectedNodeForAdd}
          style={{ color: "black" }} // chữ trong ô nhập màu đen
        />
        <button onClick={addChildNode} disabled={!selectedNodeForAdd}>
          {selectedNodeForAdd
            ? `Thêm con vào ${selectedNodeForAdd}`
            : "Chưa chọn node"}
        </button>
      </div>

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
                <g
                  onClick={() => onNodeClick(nodeDatum)}
                  style={{ cursor: "pointer" }}
                >
                  <circle
                    r={28}
                    fill="lightblue"
                    stroke="steelblue"
                    strokeWidth="2"
                  />
                  <text
                    fill="black"
                    x="35"
                    dy="5"
                    fontSize="16px"
                    fontWeight="700"
                  >
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
                        width={160}
                        height={50}
                        fill="rgba(240,240,240,1)" // nền xám nhạt
                        stroke="black"
                        strokeWidth="1"
                        rx={8}
                        ry={8}
                      />
                      <text x={10} y={30} fill="black" fontSize="12px">
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
