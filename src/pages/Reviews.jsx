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
                width: 80,
                height: 120,
                background: selected ? "#ffe082" : "#222",
                border: selected ? "3px solid #ffb300" : "2px solid #444",
                borderRadius: 10,
                boxShadow: "0 2px 8px #0008",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: "bold",
                cursor: "pointer",
                position: "relative",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Handles for React Flow edges */}
            <Handle
                type="target"
                position={Position.Top}
                style={{
                    background: "#fff",
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    top: -5,
                    left: 35,
                    border: "2px solid #3949ab",
                }}
            />
            <Handle
                type="source"
                position={Position.Bottom}
                style={{
                    background: "#fff",
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    bottom: -5,
                    left: 35,
                    border: "2px solid #ffb300",
                }}
            />
            <img
                src={data.img}
                alt={data.label}
                style={{
                    width: 60,
                    height: 60,
                    borderRadius: 6,
                    marginBottom: 8,
                    background: "#fff",
                }}
            />
            <div>{data.label}</div>
            {hovered && (
                <div
                    style={{
                        position: "absolute",
                        top: -110,
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "#333",
                        color: "#fff",
                        padding: "10px 16px",
                        borderRadius: 8,
                        boxShadow: "0 2px 8px #0008",
                        whiteSpace: "normal",
                        zIndex: 100,
                        pointerEvents: "none",
                        minWidth: 180,
                        fontWeight: "normal"
                    }}
                >
                    <div><strong>Name:</strong> {data.label}</div>
                    <div><strong>Description:</strong> {data.description || "No description"}</div>
                    <div><strong>Power:</strong> {data.power ?? "?"}</div>
                    <div><strong>Rarity:</strong> {data.rarity || "Unknown"}</div>
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
                backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80')",
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