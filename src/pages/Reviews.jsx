import React, { useState, useCallback } from "react";
import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
    Handle,
    Position,
} from "reactflow";
import "reactflow/dist/style.css";
import "../Reviews.css";
import Navbar from "../components/MyNavbar";
import BgImage  from "../assets/slider-bg-1.jpg";

const cardImg = "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg";

// Add more info to initial nodes
const initialNodes = [
    {
        id: "1",
        type: "cardNode",
        position: { x: 100, y: 100 },
        data: {
            label: "A1",
            img: cardImg,
            description: "A1 is a legendary warrior card.",
            power: 90,
            rarity: "Legendary"
        },
    },
    {
        id: "2",
        type: "cardNode",
        position: { x: 400, y: 100 },
        data: {
            label: "A2",
            img: cardImg,
            description: "A2 is a defensive guardian card.",
            power: 70,
            rarity: "Epic"
        },
    },
];

const initialEdges = [];

function CardNode({ data, selected }) {
    const [hovered, setHovered] = useState(false);

    return (
    <div
        style={{
            width: 200,
            height: 280,
            // <CHANGE> Updated selected state with red theme and more dramatic visual difference
            background: selected ? "linear-gradient(135deg, #DC2626, #B91C1C)" : "linear-gradient(135deg, #FCA5A5, #F87171)",
            border: selected ? "4px solid #7F1D1D" : "4px solid #B91C1C",
            borderRadius: 12,
            boxShadow: selected ? "0 12px 30px rgba(127, 29, 29, 0.6), 0 0 0 2px #FEF3C7" : "0 8px 20px rgba(185, 28, 28, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            color: "#1F2937",
            fontWeight: "bold",
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
            fontFamily: "serif",
            // <CHANGE> Added scale effect for selected state
            transform: selected ? "scale(1.05)" : "scale(1)",
            transition: "all 0.3s ease",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
    >
        {/* <CHANGE> Restored handles for React Flow */}
        <Handle
            type="target"
            position={Position.Top}
            style={{
                background: selected ? "linear-gradient(135deg, #F59E0B, #D97706)" : "linear-gradient(135deg, #DC2626, #B91C1C)",
                width: 14,
                height: 14,
                borderRadius: "50%",
                top: -7,
                left: "50%",
                transform: "translateX(-50%)",
                border: selected ? "3px solid #92400E" : "3px solid #B91C1C",
                boxShadow: selected ? "0 2px 8px rgba(146, 64, 14, 0.5)" : "0 2px 8px rgba(185, 28, 28, 0.5)",
            }}
        />
        <Handle
            type="source"
            position={Position.Bottom}
            style={{
                background: selected ? "linear-gradient(135deg, #F59E0B, #D97706)" : "linear-gradient(135deg, #DC2626, #B91C1C)",
                width: 14,
                height: 14,
                borderRadius: "50%",
                bottom: -7,
                left: "50%",
                transform: "translateX(-50%)",
                border: selected ? "3px solid #92400E" : "3px solid #B91C1C",
                boxShadow: selected ? "0 2px 8px rgba(146, 64, 14, 0.5)" : "0 2px 8px rgba(185, 28, 28, 0.5)",
            }}
        />

        {/* Cost circle - overlapping header */}
        <div
            style={{
                position: "absolute",
                top: 12,
                left: 12,
                width: 32,
                height: 32,
                borderRadius: "50%",
                // <CHANGE> Different colors for selected state
                background: selected ? "linear-gradient(135deg, #FEF3C7, #FDE68A)" : "linear-gradient(135deg, #DC2626, #B91C1C)",
                border: selected ? "3px solid #F59E0B" : "3px solid #7F1D1D",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: selected ? "#92400E" : "#FEF3C7",
                fontSize: 14,
                fontWeight: "bold",
                zIndex: 10,
                boxShadow: selected ? "0 2px 8px rgba(245, 158, 11, 0.4)" : "0 2px 8px rgba(127, 29, 29, 0.4)",
            }}
        >
            --
        </div>

        {/* Header */}
        <div
            style={{
                width: "calc(100% - 16px)",
                margin: "8px 8px 0 8px",
                marginTop: "8px",
                // <CHANGE> Different header colors for selected state
                background: selected ? "linear-gradient(135deg, #FEF3C7, #FDE68A)" : "linear-gradient(135deg, #FEE2E2, #FECACA)",
                color: selected ? "#92400E" : "#1F2937",
                padding: "12px 16px",
                fontSize: 16,
                textAlign: "center",
                borderRadius: "8px 8px 0 0",
                fontWeight: "bold",
                textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                border: selected ? "2px solid #F59E0B" : "2px solid #B91C1C",
                borderBottom: "none",
                position: "relative",
            }}
        >
            {data.label}
        </div>

        {/* Ảnh */}
        <img
            src={data.img || "/placeholder.svg?height=120&width=184"}
            alt={data.label}
            style={{
                width: "calc(100% - 16px)",
                height: 100,
                objectFit: "cover",
                // <CHANGE> Different border colors for selected state
                border: selected ? "2px solid #F59E0B" : "2px solid #B91C1C",
                borderTop: "none",
                borderBottom: "none",
                background: "linear-gradient(135deg, #F3F4F6, #E5E7EB)",
                margin: "0 8px",
            }}
        />

        {/* Nội dung */}
        <div
            style={{
                flex: 1,
                width: "calc(100% - 16px)",
                margin: "0 8px 8px 8px",
                // <CHANGE> Different content colors for selected state
                background: selected ? "linear-gradient(135deg, #FEF3C7, #FDE68A)" : "linear-gradient(135deg, #FEE2E2, #FECACA)",
                padding: "12px",
                fontSize: 11,
                fontWeight: "normal",
                color: selected ? "#92400E" : "#1F2937",
                textAlign: "left",
                lineHeight: 1.4,
                border: selected ? "2px solid #F59E0B" : "2px solid #B91C1C",
                borderTop: "none",
                borderRadius: "0 0 8px 8px",
                position: "relative",
            }}
        >
            <div style={{ fontWeight: "bold", color: selected ? "#D97706" : "#DC2626", marginBottom: 6, fontSize: 13 }}>
                {data.title || data.label}
            </div>
            <div style={{ color: selected ? "#92400E" : "#374151", fontSize: 10, lineHeight: 1.3 }}>
                {data.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ullamcorper eu ante a tempus."}
            </div>
        </div>

        {/* Bottom right diamond */}
        <div
            style={{
                position: "absolute",
                bottom: 8,
                right: 8,
                width: 32,
                height: 32,
                // <CHANGE> Different colors for selected state
                background: selected ? "linear-gradient(135deg, #FEF3C7, #FDE68A)" : "linear-gradient(135deg, #DC2626, #B91C1C)",
                border: selected ? "2px solid #F59E0B" : "2px solid #7F1D1D",
                transform: "rotate(45deg)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: selected ? "#92400E" : "#FEF3C7",
                fontSize: 12,
                fontWeight: "bold",
                zIndex: 10,
                boxShadow: selected ? "0 2px 6px rgba(245, 158, 11, 0.3)" : "0 2px 6px rgba(127, 29, 29, 0.3)",
            }}
        >
            <span style={{ transform: "rotate(-45deg)" }}>--</span>
        </div>

        {/* Tooltip */}
        {hovered && (
            <div
                className="card-tooltip-fadein"
                style={{
                    position: "absolute",
                    top: -100,
                    left: "100%",
                    marginLeft: 12,
                    background: "linear-gradient(135deg, #1F2937, #374151)",
                    color: "#F9FAFB",
                    padding: "12px 16px",
                    borderRadius: 8,
                    boxShadow: "0 8px 25px rgba(31, 41, 55, 0.4)",
                    whiteSpace: "normal",
                    zIndex: 100,
                    pointerEvents: "none",
                    minWidth: 180,
                    fontWeight: "normal",
                    fontSize: 12,
                    lineHeight: 1.4,
                    border: selected ? "2px solid #F59E0B" : "2px solid #DC2626",
                }}
            >
                <div><strong style={{ color: "#FEF3C7" }}>Name:</strong> {data.label}</div>
                <div><strong style={{ color: "#FEF3C7" }}>Description:</strong> {data.description || "No description"}</div>
                <div><strong style={{ color: "#FEF3C7" }}>Power:</strong> {data.power ?? "?"}</div>
                <div><strong style={{ color: "#FEF3C7" }}>Rarity:</strong> {data.rarity || "Unknown"}</div>
            </div>
        )}
    </div>
);
}

const nodeTypes = { cardNode: CardNode };

export default function Reviews() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [selectedNodes, setSelectedNodes] = useState([]);
    const [newCardLabel, setNewCardLabel] = useState("");

    // Handle node selection (max 2 for merge)
    const onNodeClick = useCallback((event, node) => {
        setSelectedNodes((prev) => {
            if (prev.includes(node.id)) {
                return prev.filter((id) => id !== node.id);
            }
            if (prev.length < 2) {
                return [...prev, node.id];
            }
            return prev;
        });
    }, []);

    // Add a new card node
    const handleAddCard = () => {
        if (!newCardLabel.trim()) return;
        const newId = (nodes.length + 1).toString();
        // Calculate a new position for the added card to avoid overlapping
        const newX = 50 + Math.random() * 500;
        const newY = 50 + Math.random() * 300;
        setNodes((nds) => [
            ...nds,
            {
                id: newId,
                type: "cardNode",
                position: { x: newX, y: newY },
                data: {
                    label: newCardLabel,
                    img: cardImg,
                    description: `${newCardLabel} is a newly created card.`,
                    power: Math.floor(Math.random() * 100),
                    rarity: "Common"
                },
            },
        ]);
        setNewCardLabel("");
    };

    // Merge two selected nodes into a new node, position it between them
    const handleMergeCard = () => {
        if (selectedNodes.length !== 2 || !newCardLabel.trim()) return;

        // Find the two selected nodes
        const nodeA = nodes.find((n) => n.id === selectedNodes[0]);
        const nodeB = nodes.find((n) => n.id === selectedNodes[1]);

        // Calculate the midpoint for the new node
        const newX = (nodeA.position.x + nodeB.position.x) / 2;
        const newY = Math.max(nodeA.position.y, nodeB.position.y) + 150;

        const newId = (nodes.length + 1).toString();
        setNodes((nds) => [
            ...nds,
            {
                id: newId,
                type: "cardNode",
                position: { x: newX, y: newY },
                data: {
                    label: newCardLabel,
                    img: cardImg,
                    description: `Merged from ${nodeA.data.label} and ${nodeB.data.label}.`,
                    power: Math.floor(((nodeA.data.power ?? 50) + (nodeB.data.power ?? 50)) / 2),
                    rarity: "Fusion"
                },
            },
        ]);
        setEdges((eds) => [
            ...eds,
            {
                id: `e${selectedNodes[0]}-${newId}`,
                source: selectedNodes[0],
                target: newId,
                type: "step",
                style: { stroke: "#fff", strokeWidth: 3 },
            },
            {
                id: `e${selectedNodes[1]}-${newId}`,
                source: selectedNodes[1],
                target: newId,
                type: "step",
                style: { stroke: "#fff", strokeWidth: 3 },
            },
        ]);
        setSelectedNodes([]);
        setNewCardLabel(""); // Clear input after merge
    };

    // Highlight selected nodes
    const customNodes = nodes.map((node) => ({
        ...node,
        selected: selectedNodes.includes(node.id),
    }));

    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                backgroundImage: `url(${BgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
                paddingTop: 64, // Prevents content from hiding under the fixed navbar
            }}
        >
            <Navbar />
            {/* Top bar */}
            <div
                style={{
                    position: "absolute",
                    top: 90,
                    left: 40,
                    zIndex: 10,
                    display: "flex",
                    gap: 12,
                }}
            >
                <input
                    type="text"
                    placeholder="Tên Card mới"
                    value={newCardLabel}
                    onChange={(e) => setNewCardLabel(e.target.value)}
                    style={{
                        padding: "6px 10px",
                        borderRadius: 6,
                        border: "1px solid #888",
                        fontSize: 16,
                        marginRight: 8,
                        color: "black",
                    }}
                />
                <button
                    onClick={handleAddCard}
                    style={{
                        background: "#3949ab",
                        color: "#fff",
                        border: "none",
                        borderRadius: 6,
                        padding: "8px 16px",
                        fontWeight: "bold",
                        fontSize: 16,
                        cursor: "pointer",
                    }}
                >
                    + Thêm Card
                </button>
                <button
                    onClick={handleMergeCard}
                    disabled={selectedNodes.length !== 2 || !newCardLabel.trim()}
                    style={{
                        background: selectedNodes.length === 2 && newCardLabel.trim() ? "#ffb300" : "#aaa",
                        color: "#222",
                        border: "none",
                        borderRadius: 6,
                        padding: "8px 16px",
                        fontWeight: "bold",
                        fontSize: 16,
                        cursor: selectedNodes.length === 2 && newCardLabel.trim() ? "pointer" : "not-allowed",
                    }}
                >
                    Ghép Card
                </button>
            </div>
            <ReactFlow
                nodes={customNodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodeClick={onNodeClick}
                nodeTypes={nodeTypes}
                fitView
                style={{ width: "100vw", height: "100vh" }}
            >
                <Background color="#aaa" gap={32} />
                <MiniMap />
                <Controls />
            </ReactFlow>
        </div>
    );
}