import { useState, useRef, useEffect } from "react"
import Navbar from "../components/MyNavbar"
import Footer from "../components/MyFooter"
import BgImage from "../assets/slider-bg-1.jpg"

const cardImg = "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg"

export default function Reviews() {
    // Card size driven by container width (with clamp)
    const [CARD_W, setCARD_W] = useState(200)
    const [CARD_H, setCARD_H] = useState(280)

    // Zoom bounds (unified)
    const MIN_ZOOM = 0.1
    const MAX_ZOOM = 3

    const clamp = (n, min, max) => Math.min(max, Math.max(min, n))

    const isTouchDevice =
        typeof window !== "undefined" &&
        ("ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0)

    const initialCards = Array.from({ length: 10 }, (_, i) => ({
        id: `Thẻ ${i + 1}`,
        img: cardImg,
        description: `Thẻ ${i + 1} là một thẻ bài mạnh mẽ với khả năng đặc biệt.`,
        power: Math.floor(Math.random() * 100) + 1,
        rarity: ["Common", "Rare", "Epic", "Legendary"][Math.floor(Math.random() * 4)],
    }))

    const [cards, setCards] = useState(initialCards)
    const [canvasCards, setCanvasCards] = useState([])
    const [selected, setSelected] = useState([])
    const [relations, setRelations] = useState([])
    const [uniqueCounter, setUniqueCounter] = useState(1)
    const [zoom, setZoom] = useState(1)
    const [pan, setPan] = useState({ x: 0, y: 0 })
    const [hoveredCard, setHoveredCard] = useState(null)

    // Desktop sidebars open/close
    const [leftOpen, setLeftOpen] = useState(true)
    const [rightOpen, setRightOpen] = useState(true)

    // REVEAL: edge hover states for desktop toggle buttons
    const [showLeftToggle, setShowLeftToggle] = useState(false)
    const [showRightToggle, setShowRightToggle] = useState(false)

    // Mobile overlays + animation states
    const [showCardsPanel, setShowCardsPanel] = useState(false)   // mounted
    const [cardsPanelOpen, setCardsPanelOpen] = useState(false)   // for transition
    const [showActionsPanel, setShowActionsPanel] = useState(false)
    const [actionsPanelOpen, setActionsPanelOpen] = useState(false)
    const ANIM_MS = 220

    const openCardsPanel = () => {
        setShowCardsPanel(true)
        requestAnimationFrame(() => setCardsPanelOpen(true))
    }
    const closeCardsPanel = () => {
        setCardsPanelOpen(false)
        setTimeout(() => setShowCardsPanel(false), ANIM_MS)
    }

    const openActionsPanel = () => {
        setShowActionsPanel(true)
        requestAnimationFrame(() => setActionsPanelOpen(true))
    }
    const closeActionsPanel = () => {
        setActionsPanelOpen(false)
        setTimeout(() => setShowActionsPanel(false), ANIM_MS)
    }

    const containerRef = useRef(null)
    const isPanningRef = useRef(false)
    const panStartRef = useRef({ mouseX: 0, mouseY: 0, panX: 0, panY: 0 })
    const minimapRef = useRef(null)
    const MINIMAP_SIZE = 200
    const MINIMAP_PAD = 40

    const getContentBounds = () => {
        if (canvasCards.length === 0) {
            return {
                minX: -CARD_W, minY: -CARD_H,
                maxX: CARD_W, maxY: CARD_H,
            }
        }
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
        canvasCards.forEach((c) => {
            minX = Math.min(minX, c.x)
            minY = Math.min(minY, c.y)
            maxX = Math.max(maxX, c.x + CARD_W)
            maxY = Math.max(maxY, c.y + CARD_H)
        })
        return { minX, minY, maxX, maxY }
    }

    // ResizeObserver to scale cards based on available canvas width
    useEffect(() => {
        const el = containerRef.current
        if (!el) return
        const ro = new ResizeObserver((entries) => {
            const { width: w } = entries[0].contentRect
            const targetW = clamp(Math.round(w / 3.6), 140, 220)
            const targetH = Math.round(targetW * 1.35)
            setCARD_W(targetW)
            setCARD_H(targetH)
        })
        ro.observe(el)
        return () => ro.disconnect()
    }, [])

  

    function CardNode({ data, selected: isSelected, position, uniqueKey }) {
        const [hovered, setHovered] = useState(false)
        const [tilt, setTilt] = useState({ x: 0, y: 0 })
        const [shine, setShine] = useState({ x: 50, y: 50 })
        const moveRaf = useRef(0)
        const nodeRef = useRef(null)

        const small = CARD_W <= 160
        const BASE_W = 200
        const BASE_H = 280
        const cardScale = CARD_W / BASE_W

        const updateFrom = (clientX, clientY) => {
            if (!nodeRef.current) return
            const rect = nodeRef.current.getBoundingClientRect()
            const px = clientX - rect.left
            const py = clientY - rect.top
            const nx = (px / rect.width) * 2 - 1
            const ny = (py / rect.height) * 2 - 1
            const MAX = 12
            cancelAnimationFrame(moveRaf.current)
            moveRaf.current = requestAnimationFrame(() => {
                setTilt({ x: nx * MAX, y: -ny * MAX })
                setShine({ x: (px / rect.width) * 100, y: (py / rect.height) * 100 })
            })
        }

        const onPointerMove = (e) => {
            if (e.pointerType === "touch" || !hovered) return
            updateFrom(e.clientX, e.clientY)
        }
        const onMouseMove = (e) => {
            // Fallback when DevTools emulates touch (no pointer events for hover)
            if (!hovered) return
            updateFrom(e.clientX, e.clientY)
        }

        const resetHover = () => {
            cancelAnimationFrame(moveRaf.current)
            setTilt({ x: 0, y: 0 })
            setShine({ x: 50, y: 50 })
        }

        return (
            <div
                ref={nodeRef}
                style={{
                    width: BASE_W,
                    height: BASE_H,
                    position: "relative",
                    transform: `scale(${cardScale * (isSelected ? 1.05 : hovered ? 1.03 : 1)})`,
                    transformOrigin: "top left",
                    transition: "transform 220ms ease, filter 220ms ease",
                    filter: hovered ? "brightness(1.04) saturate(1.05)" : "none",
                    cursor: "pointer",
                }}
                // Enter: accept any non-touch pointer
                onPointerEnter={(e) => {
                    if (e.pointerType !== "touch") setHovered(true)
                }}
                // Leave: only when the pointer truly exits this element (not when moving between children)
                onPointerOutCapture={(e) => {
                    if (e.pointerType === "touch") return
                    // If the next element is still inside this card, ignore
                    const next = e.relatedTarget
                    if (next && nodeRef.current && nodeRef.current.contains(next)) return
                    setHovered(false)
                    resetHover()
                }}
                onPointerMove={(e) => {
                    if (e.pointerType !== "touch" && hovered) updateFrom(e.clientX, e.clientY)
                }}
                onPointerCancel={() => { setHovered(false); resetHover() }}
                // Optional mouse fallback (helps on odd devices)
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => { setHovered(false); resetHover() }}
                onMouseMove={(e) => { if (hovered) updateFrom(e.clientX, e.clientY) }}
            >
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: isSelected
                            ? "linear-gradient(135deg, #DC2626, #B91C1C)"
                            : "linear-gradient(135deg, #FCA5A5, #F87171)",
                        border: isSelected ? "4px solid #7F1D1D" : "4px solid #B91C1C",
                        borderRadius: 12,
                        boxShadow: hovered
                            ? "0 16px 35px rgba(185, 28, 28, 0.50), 0 0 0 2px rgba(255,255,255,0.06) inset"
                            : small
                                ? "0 4px 10px rgba(185, 28, 28, 0.35)"
                                : isSelected
                                    ? "0 12px 30px rgba(127, 29, 29, 0.6), 0 0 0 2px #FEF3C7"
                                    : "0 8px 20px rgba(185, 28, 28, 0.4), inset 0 1px 0 rgba(255,255,255,0.18)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        color: "#1F2937",
                        fontWeight: "bold",
                        overflow: "visible",
                        fontFamily: "serif",
                        paddingTop: 24,
                        transform: `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                        transformStyle: "preserve-3d",
                        transition: "box-shadow 200ms ease",
                        pointerEvents: "auto",
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            borderRadius: 12,
                            pointerEvents: "none",
                            mixBlendMode: "screen",
                            background: hovered
                                ? `radial-gradient(600px 300px at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.35), rgba(255,255,255,0.06) 30%, rgba(255,255,255,0) 60%)`
                                : "transparent",
                            transition: "background 120ms ease",
                            zIndex: 2,
                        }}
                    />

                    {/* Top node */}
                    <div
                        style={{
                            position: "absolute",
                            top: -8,
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: 16,
                            height: 16,
                            borderRadius: "50%",
                            background: isSelected ? "#FEF3C7" : "#DC2626",
                            border: "2px solid #fff",
                            cursor: "pointer",
                            zIndex: 20,
                            boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                            transition: "transform 150ms ease",
                        }}
                        onClick={(e) => {
                            e.stopPropagation()
                            console.log(" Top connection node ", uniqueKey)
                        }}
                        onMouseDown={(e) => (e.currentTarget.style.transform = "translateX(-50%) scale(0.9)")}
                        onMouseUp={(e) => (e.currentTarget.style.transform = "translateX(-50%) scale(1)")}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = "translateX(-50%) scale(1)")}
                    />

                    {/* Bottom node */}
                    <div
                        style={{
                            position: "absolute",
                            bottom: -8,
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: 16,
                            height: 16,
                            borderRadius: "50%",
                            background: isSelected ? "#FEF3C7" : "#DC2626",
                            border: "2px solid #fff",
                            cursor: "pointer",
                            zIndex: 20,
                            boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                            transition: "transform 150ms ease",
                        }}
                        onClick={(e) => {
                            e.stopPropagation()
                            console.log(" Bottom connection node ", uniqueKey)
                        }}
                        onMouseDown={(e) => (e.currentTarget.style.transform = "translateX(-50%) scale(0.9)")}
                        onMouseUp={(e) => (e.currentTarget.style.transform = "translateX(-50%) scale(1)")}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = "translateX(-50%) scale(1)")}
                    />

                    {/* Cost circle */}
                    <div
                        style={{
                            position: "absolute",
                            top: 12,
                            left: 12,
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            background: isSelected
                                ? "linear-gradient(135deg, #FEF3C7, #FDE68A)"
                                : "linear-gradient(135deg, #DC2626, #B91C1C)",
                            border: isSelected ? "3px solid #F59E0B" : "3px solid #7F1D1D",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: isSelected ? "#92400E" : "#FEF3C7",
                            fontSize: 14,
                            fontWeight: "bold",
                            zIndex: 10,
                            boxShadow: isSelected ? "0 2px 8px rgba(245, 158, 11, 0.4)" : "0 2px 8px rgba(127, 29, 29, 0.4)",
                            transition: "transform 150ms ease",
                            transform: hovered ? "translateZ(30px)" : "translateZ(0)",
                        }}
                        onMouseDown={(e) => (e.currentTarget.style.transform = "translateZ(30px) scale(0.96)")}
                        onMouseUp={(e) => (e.currentTarget.style.transform = "translateZ(30px) scale(1)")}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = hovered ? "translateZ(30px)" : "translateZ(0)")}
                    >
                        {data.power || "--"}
                    </div>

                    {/* Header */}
                    <div
                        style={{
                            width: "calc(100% - 16px)",
                            margin: "8px 8px 0 8px",
                            background: isSelected
                                ? "linear-gradient(135deg, #FEF3C7, #FDE68A)"
                                : "linear-gradient(135deg, #FEE2E2, #FECACA)",
                            color: isSelected ? "#92400E" : "#1F2937",
                            padding: "12px 16px",
                            fontSize: 16,
                            textAlign: "center",
                            borderRadius: "8px 8px 0 0",
                            fontWeight: "bold",
                            textShadow: hovered ? "0 2px 6px rgba(0,0,0,0.2)" : "0 1px 2px rgba(0,0,0,0.1)",
                            border: isSelected ? "2px solid #F59E0B" : "2px solid #B91C1C",
                            borderBottom: "none",
                            position: "relative",
                            transform: hovered ? "translateZ(15px)" : "translateZ(0)",
                            transition: "transform 180ms ease, text-shadow 180ms ease",
                        }}
                    >
                        {data.label || data.id}
                    </div>

                    {/* Image */}
                    <div style={{ position: "relative", width: "100%" }}>
                        <img
                            src={data.img || "/placeholder.svg?height=120&width=184"}
                            alt={data.label || data.id}
                            style={{
                                width: "calc(100% - 16px)",
                                height: 100,
                                objectFit: "cover",
                                border: isSelected ? "2px solid #F59E0B" : "2px solid #B91C1C",
                                borderTop: "none",
                                borderBottom: "none",
                                background: "linear-gradient(135deg, #F3F4F6, #E5E7EB)",
                                margin: "0 8px",
                                pointerEvents: "none",
                                transform: hovered ? "translateZ(10px) scale(1.02)" : "translateZ(0) scale(1)",
                                transition: "transform 200ms ease",
                            }}
                        />
                        {!hovered ? null : (
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    margin: "0 8px",
                                    background: `radial-gradient(40% 60% at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.22), rgba(255,255,255,0) 60%)`,
                                    pointerEvents: "none",
                                    transition: "background 120ms ease",
                                }}
                            />
                        )}
                    </div>

                    {/* Content */}
                    <div
                        style={{
                            flex: 1,
                            width: "calc(100% - 16px)",
                            margin: "0 8px 8px 8px",
                            background: isSelected
                                ? "linear-gradient(135deg, #FEF3C7, #FDE68A)"
                                : "linear-gradient(135deg, #FEE2E2, #FECACA)",
                            padding: "12px",
                            fontSize: 11,
                            fontWeight: "normal",
                            color: isSelected ? "#92400E" : "#1F2937",
                            textAlign: "left",
                            lineHeight: 1.4,
                            border: isSelected ? "2px solid #F59E0B" : "2px solid #B91C1C",
                            borderTop: "none",
                            borderRadius: "0 0 8px 8px",
                            position: "relative",
                            transform: hovered ? "translateZ(12px)" : "translateZ(0)",
                            transition: "transform 180ms ease",
                        }}
                    >
                        <div style={{ fontWeight: "bold", color: isSelected ? "#D97706" : "#DC2626", marginBottom: 6, fontSize: 13 }}>
                            {data.title || data.label || data.id}
                        </div>
                        <div style={{ color: isSelected ? "#92400E" : "#374151", fontSize: 10, lineHeight: 1.3 }}>
                            {data.description || "Một thẻ bài mạnh mẽ với khả năng đặc biệt trong trận chiến."}
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
                            background: isSelected
                                ? "linear-gradient(135deg, #FEF3C7, #FDE68A)"
                                : "linear-gradient(135deg, #DC2626, #B91C1C)",
                            border: isSelected ? "2px solid #F59E0B" : "2px solid #7F1D1D",
                            transform: hovered ? "rotate(45deg) translateZ(14px)" : "rotate(45deg)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: isSelected ? "#92400E" : "#FEF3C7",
                            fontSize: 12,
                            fontWeight: "bold",
                            zIndex: 10,
                            boxShadow: isSelected
                                ? "0 2px 6px rgba(245, 158, 11, 0.4)"
                                : hovered
                                    ? "0 4px 10px rgba(127, 29, 29, 0.45)"
                                    : "0 2px 6px rgba(127, 29, 29, 0.3)",
                            transition: "transform 180ms ease, box-shadow 180ms ease",
                        }}
                    >
                        <span style={{ transform: "rotate(-45deg)" }}>{data.rarity?.[0] || "?"}</span>
                    </div>
                </div>

                {/* Tooltip */}
                {hovered && (
                    <div
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
                            border: isSelected ? "2px solid #F59E0B" : "2px solid #DC2626",
                            opacity: 1,
                            transition: "opacity 150ms ease",
                        }}
                    >
                        <div><strong style={{ color: "#FEF3C7" }}>Name:</strong> {data.label || data.id}</div>
                        <div><strong style={{ color: "#FEF3C7" }}>Description:</strong> {data.description || "No description"}</div>
                        <div><strong style={{ color: "#FEF3C7" }}>Power:</strong> {data.power ?? "?"}</div>
                        <div><strong style={{ color: "#FEF3C7" }}>Rarity:</strong> {data.rarity || "Unknown"}</div>
                    </div>
                )}
            </div>
        )
    }

    const handleDragStartFromList = (e, card) => {
        e.dataTransfer.setData("card", JSON.stringify(card))
        e.dataTransfer.effectAllowed = "copy"
    }

    const addCardToCanvasCenter = (card) => {
        const rect = containerRef.current.getBoundingClientRect()
        const mapX = (rect.width / 2 - pan.x) / zoom - CARD_W / 2
        const mapY = (rect.height / 2 - pan.y) / zoom - CARD_H / 2
        const ukey = `${card.id}-${uniqueCounter}`
        setUniqueCounter((c) => c + 1)
        setCanvasCards((prev) => [...prev, { ...card, uniqueKey: ukey, x: mapX, y: mapY }])
    }

    const handleDropToCanvas = (e) => {
        e.preventDefault()
        const data = e.dataTransfer.getData("card")
        if (!data) return
        const card = JSON.parse(data)

        const rect = containerRef.current.getBoundingClientRect()
        const pixelX = e.clientX - rect.left
        const pixelY = e.clientY - rect.top

        const mapX = (pixelX - pan.x) / zoom - CARD_W / 2
        const mapY = (pixelY - pan.y) / zoom - CARD_H / 2

        const ukey = `${card.id}-${uniqueCounter}`
        setUniqueCounter((c) => c + 1)

        setCanvasCards((prev) => [...prev, { ...card, uniqueKey: ukey, x: mapX, y: mapY }])
    }

    // Pan the canvas (mouse/pointer)
    const handleCanvasMouseDown = (e) => {
        if (e.target !== containerRef.current) return
        isPanningRef.current = true
        panStartRef.current = {
            mouseX: e.clientX,
            mouseY: e.clientY,
            panX: pan.x,
            panY: pan.y,
        }

        const onMouseMove = (ev) => {
            if (!isPanningRef.current) return
            const dx = ev.clientX - panStartRef.current.mouseX
            const dy = ev.clientY - panStartRef.current.mouseY
            setPan({
                x: panStartRef.current.panX + dx,
                y: panStartRef.current.panY + dy,
            })
        }

        const onMouseUp = () => {
            isPanningRef.current = false
            document.removeEventListener("mousemove", onMouseMove)
            document.removeEventListener("mouseup", onMouseUp)
        }

        document.addEventListener("mousemove", onMouseMove)
        document.addEventListener("mouseup", onMouseUp)
    }

    // Zoom helpers
    const handleZoomChangeAt = (pixelX, pixelY, newZoom) => {
        const rect = containerRef.current.getBoundingClientRect()
        // World coordinate under the pixel
        const centerMapX = (pixelX - pan.x) / zoom
        const centerMapY = (pixelY - pan.y) / zoom
        const clamped = clamp(newZoom, MIN_ZOOM, MAX_ZOOM)
        const newPanX = pixelX - centerMapX * clamped
        const newPanY = pixelY - centerMapY * clamped
        setZoom(clamped)
        setPan({ x: newPanX, y: newPanY })
    }

    const handleZoomChange = (newZoom) => {
        const rect = containerRef.current.getBoundingClientRect()
        handleZoomChangeAt(rect.width / 2, rect.height / 2, newZoom)
    }

    // Pointer-based drag for cards (touch + mouse)
    const handleCardPointerDown = (e, card) => {
        e.preventDefault()
        e.stopPropagation()

        const pointerId = e.pointerId
        const startX = e.clientX
        const startY = e.clientY
        const startMapX = card.x
        const startMapY = card.y
        let moved = false
        const DRAG_THRESHOLD = 5

        const target = e.currentTarget
        if (target.setPointerCapture) target.setPointerCapture(pointerId)

        const onMove = (ev) => {
            if (ev.pointerId !== pointerId) return
            const dx = ev.clientX - startX
            const dy = ev.clientY - startY
            if (!moved && (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD)) {
                moved = true
            }
            if (moved) {
                const dxMap = dx / zoom
                const dyMap = dy / zoom
                setCanvasCards((prev) =>
                    prev.map((pc) => (pc.uniqueKey === card.uniqueKey ? { ...pc, x: startMapX + dxMap, y: startMapY + dyMap } : pc)),
                )
            }
        }

        const onUp = (ev) => {
            if (ev.pointerId !== pointerId) return
            window.removeEventListener("pointermove", onMove)
            window.removeEventListener("pointerup", onUp)
            window.removeEventListener("pointercancel", onUp)
            if (!moved) {
                toggleSelectUnique(ev, card.uniqueKey)
            }
        }

        window.addEventListener("pointermove", onMove, { passive: true })
        window.addEventListener("pointerup", onUp, { passive: true })
        window.addEventListener("pointercancel", onUp, { passive: true })
    }

    const toggleSelectUnique = (e, uniqueKey) => {
        e.stopPropagation()
        setSelected((prev) =>
            prev.includes(uniqueKey) ? prev.filter((k) => k !== uniqueKey) : [...prev, uniqueKey].slice(-2),
        )
    }

    const handleMerge = () => {
        if (selected.length !== 2) return alert("Chọn đúng 2 thẻ để ghép")
        const name = prompt("Nhập tên thẻ mới (vd: Thẻ 11):")
        if (!name) return alert("Tên không hợp lệ")
        if (cards.some((c) => c.id.toLowerCase() === name.trim().toLowerCase())) {
            return alert("Tên thẻ đã tồn tại trong danh sách")
        }

        const selectedCards = canvasCards.filter((c) => selected.includes(c.uniqueKey))
        const avgPower = Math.floor(selectedCards.reduce((sum, c) => sum + (c.power || 50), 0) / selectedCards.length)

        const ukey = `new-${uniqueCounter}`
        setUniqueCounter((c) => c + 1)

        const pairKeys = [...selected].sort().join("|")
        const previousFusions = canvasCards.filter(
            (c) =>
                c.isFusion &&
                c.description &&
                (() => {
                    const parents = relations
                        .filter((r) => r.toKey === c.uniqueKey)
                        .map((r) => r.fromKey)
                        .sort()
                        .join("|")
                    return parents === pairKeys
                })(),
        )

        const verticalMargin = 40
        let mapX, mapY
        if (previousFusions.length > 0) {
            const lastFusion = previousFusions[previousFusions.length - 1]
            mapX = lastFusion.x + CARD_W + 32
            mapY = lastFusion.y + verticalMargin
        } else if (selectedCards.length > 0) {
            const firstCard = selectedCards[0]
            mapX = firstCard.x + CARD_W + 32
            mapY = firstCard.y + verticalMargin
        } else {
            const rect = containerRef.current.getBoundingClientRect()
            mapX = (rect.width / 2 - pan.x) / zoom - CARD_W / 2
            mapY = (rect.height / 2 - pan.y) / zoom - CARD_H / 2 + verticalMargin
        }

        const newCard = {
            id: name.trim(),
            uniqueKey: ukey,
            x: mapX,
            y: mapY,
            img: cardImg,
            description: `Ghép từ ${selectedCards.map((c) => c.id).join(" và ")}.`,
            power: avgPower,
            rarity: "Fusion",
            isFusion: true,
        }

        setCanvasCards((prev) => [...prev, newCard])
        setCards((prev) => [
            ...prev,
            {
                id: newCard.id,
                img: cardImg,
                description: newCard.description,
                power: newCard.power,
                rarity: newCard.rarity,
            },
        ])

        setRelations((prev) => [
            ...prev,
            { fromKey: selected[0], toKey: newCard.uniqueKey },
            { fromKey: selected[1], toKey: newCard.uniqueKey },
        ])

        setSelected([])
    }

    const handleDelete = () => {
        if (selected.length < 1) return alert("Chọn ít nhất 1 thẻ để xóa")
        setCanvasCards((prev) => prev.filter((c) => !selected.includes(c.uniqueKey)))
        setRelations((prev) => prev.filter((r) => !selected.includes(r.fromKey) && !selected.includes(r.toKey)))
        setSelected([])
    }

    const handleUpdate = () => {
        if (selected.length !== 1) return alert("Chọn đúng 1 thẻ để cập nhật")
        const uniqueKey = selected[0]
        const instance = canvasCards.find((c) => c.uniqueKey === uniqueKey)
        if (!instance) return

        const oldId = instance.id
        const name = prompt("Nhập tên mới (vd: Thẻ 12):")
        if (!name) return alert("Tên không hợp lệ")
        if (cards.some((c) => c.id.toLowerCase() === name.trim().toLowerCase())) {
            return alert("Tên thẻ đã tồn tại trong danh sách")
        }

        setCanvasCards((prev) => prev.map((c) => (c.id === oldId ? { ...c, id: name.trim() } : c)))
        setCards((prev) => prev.map((c) => (c.id === oldId ? { ...c, id: name.trim() } : c)))
        setSelected([])
    }

    const handleAddCard = () => {
        const name = prompt("Nhập tên thẻ mới (vd: Thẻ 20):")
        if (!name) return alert("Tên không hợp lệ")
        if (cards.some((c) => c.id.toLowerCase() === name.trim().toLowerCase())) {
            return alert("Tên thẻ đã tồn tại trong danh sách")
        }
        setCards((prev) => [
            ...prev,
            {
                id: name.trim(),
                img: cardImg,
                description: `${name.trim()} là một thẻ bài mới được tạo.`,
                power: Math.floor(Math.random() * 100) + 1,
                rarity: "Common",
            },
        ])
    }

    const handleRemoveCardFromList = () => {
        const name = prompt("Nhập tên thẻ muốn xóa (vd: Thẻ 5):")
        if (!name) return
        setCards((prev) => prev.filter((c) => c.id.toLowerCase() !== name.trim().toLowerCase()))
        setCanvasCards((prev) => prev.filter((c) => c.id.toLowerCase() !== name.trim().toLowerCase()))
        setRelations((prev) =>
            prev.filter(
                (r) =>
                    !canvasCards.find((c) => c.id.toLowerCase() === name.trim().toLowerCase() && c.uniqueKey === r.fromKey) &&
                    !canvasCards.find((c) => c.id.toLowerCase() === name.trim().toLowerCase() && c.uniqueKey === r.toKey),
            ),
        )
    }

    // Multiplicative zoom buttons feel better on mobile
    const zoomIn = () => handleZoomChange(zoom * 1.12)
    const zoomOut = () => handleZoomChange(zoom / 1.12)

    const fitToView = () => {
        if (canvasCards.length === 0) return
        const rect = containerRef.current.getBoundingClientRect()
        const padding = 40

        let minX = Infinity,
            minY = Infinity,
            maxX = -Infinity,
            maxY = -Infinity
        canvasCards.forEach((c) => {
            minX = Math.min(minX, c.x)
            minY = Math.min(minY, c.y)
            maxX = Math.max(maxX, c.x + CARD_W)
            maxY = Math.max(maxY, c.y + CARD_H)
        })
        const bbW = maxX - minX
        const bbH = maxY - minY

        const scaleX = rect.width / (bbW + padding * 2)
        const scaleY = rect.height / (bbH + padding * 2)
        const newZoom = clamp(Math.min(scaleX, scaleY), MIN_ZOOM, MAX_ZOOM)

        const worldCx = minX + bbW / 2
        const worldCy = minY + bbH / 2
        const newPanX = rect.width / 2 - worldCx * newZoom
        const newPanY = rect.height / 2 - worldCy * newZoom

        setZoom(newZoom)
        setPan({ x: newPanX, y: newPanY })
    }

    const handleMinimapClick = (e) => {
        const containerRect = containerRef.current.getBoundingClientRect()
        const miniRect = minimapRef.current.getBoundingClientRect()

        const { minX, minY, maxX, maxY } = getContentBounds()
        const contentW = Math.max(1, maxX - minX)
        const contentH = Math.max(1, maxY - minY)

        const scale = Math.min(
            MINIMAP_SIZE / (contentW + MINIMAP_PAD * 2),
            MINIMAP_SIZE / (contentH + MINIMAP_PAD * 2)
        )

        const clickX = e.clientX - miniRect.left
        const clickY = e.clientY - miniRect.top

        // minimap -> world (unscaled) coords
        const worldX = (clickX / scale) + (minX - MINIMAP_PAD)
        const worldY = (clickY / scale) + (minY - MINIMAP_PAD)

        // center viewport on that world point
        const newPanX = containerRect.width / 2 - worldX * zoom
        const newPanY = containerRect.height / 2 - worldY * zoom
        setPan({ x: newPanX, y: newPanY })
    }

    const instancePixelPos = (c) => {
        return {
            px: c.x * zoom + pan.x,
            py: c.y * zoom + pan.y,
            w: CARD_W * zoom,
            h: CARD_H * zoom,
        }
    }

    // Touch support for panning, pinch-to-zoom and double-tap zoom
    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const ts = { pinch: false, startDist: 0, startZoom: 1, lastTap: 0, lastTapX: 0, lastTapY: 0 }

        const onTouchStart = (e) => {
            if (e.touches.length === 2) {
                const [t1, t2] = e.touches
                const dx = t1.clientX - t2.clientX
                const dy = t1.clientY - t2.clientY
                ts.pinch = true
                ts.startDist = Math.hypot(dx, dy)
                ts.startZoom = zoom
                e.preventDefault()
                return
            }

            if (e.touches.length === 1) {
                // Double-tap to zoom at tap location
                const now = Date.now()
                const rect = container.getBoundingClientRect()
                const t = e.touches[0]
                const px = t.clientX - rect.left
                const py = t.clientY - rect.top
                if (now - ts.lastTap < 300 && Math.hypot(px - ts.lastTapX, py - ts.lastTapY) < 40) {
                    e.preventDefault()
                    const target = zoom < MAX_ZOOM - 0.01 ? clamp(zoom * 1.6, MIN_ZOOM, MAX_ZOOM) : 1
                    handleZoomChangeAt(px, py, target)
                    ts.lastTap = 0
                    return
                }
                ts.lastTap = now
                ts.lastTapX = px
                ts.lastTapY = py

                if (e.target === container) {
                    isPanningRef.current = true
                    panStartRef.current = {
                        mouseX: t.clientX,
                        mouseY: t.clientY,
                        panX: pan.x,
                        panY: pan.y,
                    }
                }
            }
        }

        const onTouchMove = (e) => {
            if (ts.pinch && e.touches.length === 2) {
                const [t1, t2] = e.touches
                const dx = t1.clientX - t2.clientX
                const dy = t1.clientY - t2.clientY
                const dist = Math.hypot(dx, dy)
                const ratio = dist / ts.startDist
                const rect = container.getBoundingClientRect()
                const midX = (t1.clientX + t2.clientX) / 2 - rect.left
                const midY = (t1.clientY + t2.clientY) / 2 - rect.top
                const newZoom = clamp(ts.startZoom * ratio, MIN_ZOOM, MAX_ZOOM)
                handleZoomChangeAt(midX, midY, newZoom)
                e.preventDefault()
                return
            }

            if (isPanningRef.current && e.touches.length === 1) {
                const t = e.touches[0]
                const dx = t.clientX - panStartRef.current.mouseX
                const dy = t.clientY - panStartRef.current.mouseY
                setPan({
                    x: panStartRef.current.panX + dx,
                    y: panStartRef.current.panY + dy,
                })
                e.preventDefault()
            }
        }

        const onTouchEnd = () => {
            ts.pinch = false
            isPanningRef.current = false
        }

        container.addEventListener("touchstart", onTouchStart, { passive: false })
        container.addEventListener("touchmove", onTouchMove, { passive: false })
        container.addEventListener("touchend", onTouchEnd)
        container.addEventListener("touchcancel", onTouchEnd)

        return () => {
            container.removeEventListener("touchstart", onTouchStart)
            container.removeEventListener("touchmove", onTouchMove)
            container.removeEventListener("touchend", onTouchEnd)
            container.removeEventListener("touchcancel", onTouchEnd)
        }
    }, [zoom, pan])

    useEffect(() => {
        // Keyboard shortcuts and block browser zoom
        const onKey = (e) => {
            if (e.key === "Escape") setSelected([])

            if ((e.ctrlKey || e.metaKey) && (e.key === "+" || e.key === "-" || e.key === "=")) {
                e.preventDefault()
            }
            if (e.key === "f" && (e.ctrlKey || e.metaKey)) {
                e.preventDefault()
                fitToView()
            }
        }

        const onWheel = (e) => {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault()
            }
        }

        window.addEventListener("keydown", onKey, { passive: false })
        window.addEventListener("wheel", onWheel, { passive: false })

        const container = containerRef.current
        if (container) {
            const handleWheel = (e) => {
                if (e.ctrlKey || e.metaKey) return
                e.preventDefault()
                const rect = container.getBoundingClientRect()
                const pixelX = e.clientX - rect.left
                const pixelY = e.clientY - rect.top
                const scaleFactor = e.deltaY < 0 ? 1.12 : 0.88
                const newZoom = clamp(zoom * scaleFactor, MIN_ZOOM, MAX_ZOOM)
                if (newZoom !== zoom) {
                    handleZoomChangeAt(pixelX, pixelY, newZoom)
                }
            }
            container.addEventListener("wheel", handleWheel, { passive: false })

            return () => {
                window.removeEventListener("keydown", onKey)
                window.removeEventListener("wheel", onWheel)
                container.removeEventListener("wheel", handleWheel)
            }
        }

        return () => {
            window.removeEventListener("keydown", onKey)
            window.removeEventListener("wheel", onWheel)
        }
    }, [zoom, pan])

    const getParents = (uniqueKey) => {
        const rels = relations.filter((r) => r.toKey === uniqueKey)
        return rels.map((r) => {
            const from = canvasCards.find((c) => c.uniqueKey === r.fromKey)
            return from?.id || "?"
        })
    }

    return (
        <div className="bg-gray-900 min-h-screen flex flex-col text-white">
            <Navbar />

            {/* Main layout: stack on mobile, columns on md+ */}
            <div className="flex flex-1 overflow-hidden mt-20 flex-col md:flex-row">
                {/* Left List (desktop/tablet) */}
                <div
                    className={`hidden md:flex bg-gray-800 transition-all duration-200 flex-col h-[calc(100vh-80px)] overflow-hidden ${leftOpen ? "md:w-56 lg:w-64 xl:w-72 p-3 pt-4" : "md:w-0 p-0"}`}
                    aria-expanded={leftOpen}
                >
                    {leftOpen && (
                        <>
                            <h3 className="mb-2 font-bold">Danh sách thẻ</h3>
                            <div
                                className="flex-1 overflow-y-auto pr-2"
                                style={{
                                    maxHeight: "calc(100vh - 80px)",
                                    scrollbarWidth: "thin",
                                    scrollbarColor: "#4B5563 #374151",
                                }}
                            >
                                <style>{`
                                .flex-1::-webkit-scrollbar { width: 6px; }
                                .flex-1::-webkit-scrollbar-track { background: #374151; border-radius: 3px; }
                                .flex-1::-webkit-scrollbar-thumb { background: #4B5563; border-radius: 3px; }
                                .flex-1::-webkit-scrollbar-thumb:hover { background: #6B7280; }
                              `}</style>
                                {cards.map((c) => (
                                    <div
                                        key={c.id}
                                        draggable
                                        onDragStart={(e) => handleDragStartFromList(e, c)}
                                        className="p-2 mb-2 bg-gray-700 rounded cursor-grab hover:bg-gray-600 transition-colors"
                                    >
                                        <div className="font-bold text-sm">{c.id}</div>
                                        <div className="text-xs text-gray-300">Power: {c.power}</div>
                                        <div className="text-xs text-gray-400">{c.rarity}</div>
                                    </div>
                                ))}
                            </div>
                            <button onClick={handleAddCard} className="mt-2 py-2 px-3 bg-pink-600 hover:bg-pink-500 rounded transition-colors">
                                + Tạo thẻ mới
                            </button>
                            <button onClick={handleRemoveCardFromList} className="mt-2 py-2 px-3 bg-red-600 hover:bg-red-500 rounded transition-colors">
                                - Xóa thẻ khỏi danh sách
                            </button>
                        </>
                    )}
                </div>

                {/* Map */}
                <div
                    ref={containerRef}
                    className="flex-1 relative overflow-hidden"
                    style={{
                        backgroundImage: `url(${BgImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        touchAction: "none",
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDropToCanvas}
                    onMouseDown={handleCanvasMouseDown}
                >
                    {/* Mobile toggles for side panels */}
                    <div className="md:hidden absolute top-2 left-2 z-50 flex gap-2">
                        <button
                            className="px-3 py-1 rounded bg-gray-800/80 backdrop-blur hover:bg-gray-700 transition-colors"
                            onClick={openCardsPanel}
                        >
                            Cards
                        </button>
                        <button
                            className="px-3 py-1 rounded bg-gray-800/80 backdrop-blur hover:bg-gray-700 transition-colors"
                            onClick={openActionsPanel}
                        >
                            Actions
                        </button>
                    </div>

                    {/* Desktop toggles for side panels (appear when hovering near edges) */}
                    {/* Left edge */}
                    <div
                        className="hidden md:block absolute top-1/2 -translate-y-1/2 left-0 z-50"
                        onMouseEnter={() => setShowLeftToggle(true)}
                        onMouseLeave={() => setShowLeftToggle(false)}
                    >
                        <div className="relative h-28 w-8">
                            <button
                                className={`absolute left-2 top-1/2 -translate-y-1/2 px-3 py-1 rounded bg-gray-800/80 backdrop-blur hover:bg-gray-700 transition-all duration-200 ${showLeftToggle ? "opacity-100 pointer-events-auto translate-x-0" : "opacity-0 pointer-events-none -translate-x-2"}`}
                                onClick={() => setLeftOpen((v) => !v)}
                                aria-expanded={leftOpen}
                                aria-label="Toggle cards sidebar"
                            >
                                {leftOpen ? "Hide" : "Show"} Cards
                            </button>
                        </div>
                    </div>
                    {/* Right edge */}
                    <div
                        className="hidden md:block absolute top-1/2 -translate-y-1/2 right-0 z-50"
                        onMouseEnter={() => setShowRightToggle(true)}
                        onMouseLeave={() => setShowRightToggle(false)}
                    >
                        <div className="relative h-28 w-8">
                            <button
                                className={`absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 rounded bg-gray-800/80 backdrop-blur hover:bg-gray-700 transition-all duration-200 ${showRightToggle ? "opacity-100 pointer-events-auto translate-x-0" : "opacity-0 pointer-events-none translate-x-2"}`}
                                onClick={() => setRightOpen((v) => !v)}
                                aria-expanded={rightOpen}
                                aria-label="Toggle actions sidebar"
                            >
                                {rightOpen ? "Hide" : "Show"} Actions
                            </button>
                        </div>
                    </div>

                    {/* Connections */}
                    <svg className="absolute left-0 top-0 w-full h-full pointer-events-none">
                        {relations.map((r, i) => {
                            const from = canvasCards.find((c) => c.uniqueKey === r.fromKey)
                            const to = canvasCards.find((c) => c.uniqueKey === r.toKey)
                            if (!from || !to) return null

                            const A = instancePixelPos(from)
                            const B = instancePixelPos(to)

                            const startX = A.px + A.w / 2
                            const startY = A.py + A.h
                            const endX = B.px + B.w / 2
                            const endY = B.py
                            const midY = startY + (endY - startY) / 2

                            const arrowW = 16
                            const arrowH = 12

                            return (
                                <g key={i}>
                                    <line x1={startX} y1={startY} x2={startX} y2={midY} stroke="#000" strokeWidth={3} />
                                    <line x1={startX} y1={midY} x2={endX} y2={midY} stroke="#000" strokeWidth={3} />
                                    <line x1={endX} y1={midY} x2={endX} y2={endY} stroke="#000" strokeWidth={3} />
                                    <polygon
                                        points={`${endX - arrowW / 2},${endY} ${endX + arrowW / 2},${endY} ${endX},${endY + arrowH}`}
                                        fill="#111"
                                    />
                                </g>
                            )
                        })}
                    </svg>

                    {/* Cards */}
                    {canvasCards.map((c) => {
                        const { px, py } = instancePixelPos(c)
                        const parents = getParents(c.uniqueKey)
                        return (
                            <div
                                key={c.uniqueKey}
                                onPointerDown={(e) => handleCardPointerDown(e, c)}
                                onMouseEnter={() => setHoveredCard({ ...c, parents })}
                                onMouseLeave={() => setHoveredCard(null)}
                                style={{
                                    position: "absolute",
                                    left: px,
                                    top: py,
                                    transform: `scale(${zoom})`,
                                    transformOrigin: "top left",
                                    willChange: "transform",
                                }}
                            >
                                <CardNode
                                    data={c}
                                    selected={selected.includes(c.uniqueKey)}
                                    position={{ x: c.x, y: c.y }}
                                    uniqueKey={c.uniqueKey}
                                />
                            </div>
                        )
                    })}

                    {/* Zoom toolbar */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-3 bg-gray-800/90 px-3 py-1 rounded shadow flex items-center gap-2">
                        <button className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600 transition-colors" onClick={zoomOut} aria-label="Zoom out">
                            -
                        </button>
                        <span className="text-xs">Zoom</span>
                        <input
                            type="range"
                            min={MIN_ZOOM}
                            max={MAX_ZOOM}
                            step="0.05"
                            value={zoom}
                            onChange={(e) => handleZoomChange(Number(e.target.value))}
                            className="mx-2 align-middle"
                        />
                        <span className="text-xs w-10 text-center">{zoom.toFixed(2)}x</span>
                        <button className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600 transition-colors" onClick={zoomIn} aria-label="Zoom in">
                            +
                        </button>
                        <button className="ml-2 px-2 py-1 bg-pink-600 hover:bg-pink-500 rounded text-xs transition-colors" onClick={fitToView}>
                            Fit
                        </button>
                    </div>
                </div>

                {/* Right Panel (desktop/tablet) */}
                <div
                    className={`hidden md:flex bg-gray-800 transition-all duration-200 flex-col ${rightOpen ? "md:w-56 lg:w-64 xl:w-72 p-3" : "md:w-0 p-0 overflow-hidden"}`}
                    aria-expanded={rightOpen}
                >
                    {rightOpen && (
                        <>
                            <h3 className="mb-2 font-bold">Thao tác</h3>
                            <button onClick={handleMerge} className="mb-2 py-2 px-3 bg-pink-600 hover:bg-pink-500 rounded transition-colors">
                                Ghép thẻ
                            </button>
                            <button onClick={handleDelete} className="mb-2 py-2 px-3 bg-pink-600 hover:bg-pink-500 rounded transition-colors">
                                Xóa thẻ
                            </button>
                            <button onClick={handleUpdate} className="mb-4 py-2 px-3 bg-pink-600 hover:bg-pink-500 rounded transition-colors">
                                Cập nhật thẻ
                            </button>
                            <div className="flex-1"></div>
                            {/* Minimap (desktop only) */}
                            <div>
                                <h4 className="text-sm mb-1">Minimap</h4>
                                <div
                                    ref={minimapRef}
                                    onClick={handleMinimapClick}
                                    className="relative bg-gray-700 border border-gray-500"
                                    style={{ width: MINIMAP_SIZE, height: MINIMAP_SIZE, overflow: "hidden" }}
                                >
                                    {(() => {
                                        const rect = containerRef.current?.getBoundingClientRect()
                                        if (!rect) return null

                                        const { minX, minY, maxX, maxY } = getContentBounds()
                                        const contentW = Math.max(1, maxX - minX)
                                        const contentH = Math.max(1, maxY - minY)

                                        const scale = Math.min(
                                            MINIMAP_SIZE / (contentW + MINIMAP_PAD * 2),
                                            MINIMAP_SIZE / (contentH + MINIMAP_PAD * 2)
                                        )

                                        const toMiniX = (wx) => (wx - (minX - MINIMAP_PAD)) * scale
                                        const toMiniY = (wy) => (wy - (minY - MINIMAP_PAD)) * scale

                                        // viewport in world coords
                                        const viewX = -pan.x / zoom
                                        const viewY = -pan.y / zoom
                                        const viewW = rect.width / zoom
                                        const viewH = rect.height / zoom

                                        // map to minimap space
                                        const vx = toMiniX(viewX)
                                        const vy = toMiniY(viewY)
                                        const vw = viewW * scale
                                        const vh = viewH * scale

                                        const clamp01 = (n, min, max) => Math.min(max, Math.max(min, n))
                                        const x0 = clamp01(vx, 0, MINIMAP_SIZE)
                                        const y0 = clamp01(vy, 0, MINIMAP_SIZE)
                                        const x1 = clamp01(vx + vw, 0, MINIMAP_SIZE)
                                        const y1 = clamp01(vy + vh, 0, MINIMAP_SIZE)
                                        const clampedView = {
                                            left: x0,
                                            top: y0,
                                            width: Math.max(2, x1 - x0),
                                            height: Math.max(2, y1 - y0),
                                        }

                                        return (
                                            <>
                                                {canvasCards.map((c) => {
                                                    const mx = toMiniX(c.x)
                                                    const my = toMiniY(c.y)
                                                    const mw = CARD_W * scale
                                                    const mh = CARD_H * scale
                                                    return (
                                                        <div
                                                            key={c.uniqueKey}
                                                            style={{
                                                                position: "absolute",
                                                                left: mx,
                                                                top: my,
                                                                width: mw,
                                                                height: mh,
                                                                background: "#ec4899",
                                                                borderRadius: 2,
                                                            }}
                                                        />
                                                    )
                                                })}
                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        left: clampedView.left,
                                                        top: clampedView.top,
                                                        width: clampedView.width,
                                                        height: clampedView.height,
                                                        border: "2px solid #10b981",
                                                        background: "rgba(16,185,129,0.12)",
                                                        pointerEvents: "none",
                                                        boxShadow: "0 0 0 1px rgba(0,0,0,0.25) inset",
                                                    }}
                                                />
                                            </>
                                        )
                                    })()}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Overlays - Cards */}
            {showCardsPanel && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div
                        className={`absolute inset-0 bg-black/50 transition-opacity duration-200 ${cardsPanelOpen ? "opacity-100" : "opacity-0"}`}
                        onClick={closeCardsPanel}
                    />
                    <div
                        className={`absolute bottom-0 left-0 right-0 bg-gray-800 rounded-t-2xl px-4 pb-4 pt-6 max-h-[80vh] overflow-y-auto transform transition-transform duration-200 ease-out ${cardsPanelOpen ? "translate-y-0" : "translate-y-full"}`}
                        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-bold">Danh sách thẻ</h3>
                            <button className="px-3 py-1 bg-gray-700 rounded" onClick={closeCardsPanel}>
                                Close
                            </button>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                            {cards.map((c) => (
                                <div
                                    key={c.id}
                                    draggable={!isTouchDevice}
                                    onDragStart={(e) => !isTouchDevice && handleDragStartFromList(e, c)}
                                    onClick={() => {
                                        if (isTouchDevice) {
                                            addCardToCanvasCenter(c)
                                            closeCardsPanel()
                                        }
                                    }}
                                    className="p-2 bg-gray-700 rounded hover:bg-gray-600 active:bg-gray-600 transition-colors"
                                >
                                    <div className="font-bold text-sm">{c.id}</div>
                                    <div className="text-xs text-gray-300">Power: {c.power}</div>
                                    <div className="text-xs text-gray-400">{c.rarity}</div>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2 mt-3">
                            <button onClick={handleAddCard} className="flex-1 py-2 px-3 bg-pink-600 hover:bg-pink-500 rounded transition-colors">
                                + Tạo thẻ mới
                            </button>
                            <button
                                onClick={handleRemoveCardFromList}
                                className="flex-1 py-2 px-3 bg-red-600 hover:bg-red-500 rounded transition-colors"
                            >
                                - Xóa thẻ
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Overlays - Actions (no minimap on mobile) */}
            {showActionsPanel && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div
                        className={`absolute inset-0 bg-black/50 transition-opacity duration-200 ${actionsPanelOpen ? "opacity-100" : "opacity-0"}`}
                        onClick={closeActionsPanel}
                    />
                    <div
                        className={`absolute bottom-0 left-0 right-0 bg-gray-800 rounded-t-2xl px-4 pb-4 pt-6 max-h-[70vh] overflow-y-auto transform transition-transform duration-200 ease-out ${actionsPanelOpen ? "translate-y-0" : "translate-y-full"}`}
                        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-bold">Thao tác</h3>
                            <button className="px-3 py-1 bg-gray-700 rounded" onClick={closeActionsPanel}>
                                Close
                            </button>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={handleMerge} className="flex-1 py-2 px-3 bg-pink-600 hover:bg-pink-500 rounded transition-colors">
                                Ghép thẻ
                            </button>
                            <button onClick={handleDelete} className="flex-1 py-2 px-3 bg-pink-600 hover:bg-pink-500 rounded transition-colors">
                                Xóa thẻ
                            </button>
                            <button onClick={handleUpdate} className="flex-1 py-2 px-3 bg-pink-600 hover:bg-pink-500 rounded transition-colors">
                                Cập nhật
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}