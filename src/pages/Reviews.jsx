import { useState, useRef, useEffect } from "react"
import Navbar from "../components/MyNavbar"
import Footer from "../components/MyFooter"
import BgImage from "../assets/slider-bg-1.jpg"

const cardImg = "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg"/*ảnh mẫu*/

export default function Reviews() {
  const CARD_W = 2000
  const CARD_H = 280

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

  const containerRef = useRef(null)
  const isPanningRef = useRef(false)
  const panStartRef = useRef({ mouseX: 0, mouseY: 0, panX: 0, panY: 0 })
  const minimapRef = useRef(null)
  const MINIMAP_SIZE = 150

  function CardNode({ data, selected: isSelected, position, uniqueKey }) {
    const [hovered, setHovered] = useState(false)

    return (
      <div
        style={{
          width: CARD_W,
          height: CARD_H,
          background: isSelected
            ? "linear-gradient(135deg, #DC2626, #B91C1C)"
            : "linear-gradient(135deg, #FCA5A5, #F87171)",
          border: isSelected ? "4px solid #7F1D1D" : "4px solid #B91C1C",
          borderRadius: 12,
          boxShadow: isSelected
            ? "0 12px 30px rgba(127, 29, 29, 0.6), 0 0 0 2px #FEF3C7"
            : "0 8px 20px rgba(185, 28, 28, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
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
          transform: isSelected ? "scale(1.05)" : "scale(1)",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Top connection node */}
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
          }}
          onClick={(e) => {
            e.stopPropagation()
            // Handle connection logic here
            console.log("[v0] Top connection node clicked for", uniqueKey)
          }}
        />

        {/* Bottom connection node */}
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
          }}
          onClick={(e) => {
            e.stopPropagation()
            // Handle connection logic here
            console.log("[v0] Bottom connection node clicked for", uniqueKey)
          }}
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
          }}
        >
          {data.power || "--"}
        </div>

        {/* Header */}
        <div
          style={{
            width: "calc(100% - 16px)",
            margin: "8px 8px 0 8px",
            marginTop: "8px",
            background: isSelected
              ? "linear-gradient(135deg, #FEF3C7, #FDE68A)"
              : "linear-gradient(135deg, #FEE2E2, #FECACA)",
            color: isSelected ? "#92400E" : "#1F2937",
            padding: "12px 16px",
            fontSize: 16,
            textAlign: "center",
            borderRadius: "8px 8px 0 0",
            fontWeight: "bold",
            textShadow: "0 1px 2px rgba(0,0,0,0.1)",
            border: isSelected ? "2px solid #F59E0B" : "2px solid #B91C1C",
            borderBottom: "none",
            position: "relative",
          }}
        >
          {data.label || data.id}
        </div>

        {/* Image */}
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
          }}
        />

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
            transform: "rotate(45deg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: isSelected ? "#92400E" : "#FEF3C7",
            fontSize: 12,
            fontWeight: "bold",
            zIndex: 10,
            boxShadow: isSelected ? "0 2px 6px rgba(245, 158, 11, 0.3)" : "0 2px 6px rgba(127, 29, 29, 0.3)",
          }}
        >
          <span style={{ transform: "rotate(-45deg)" }}>{data.rarity?.[0] || "?"}</span>
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
            }}
          >
            <div>
              <strong style={{ color: "#FEF3C7" }}>Name:</strong> {data.label || data.id}
            </div>
            <div>
              <strong style={{ color: "#FEF3C7" }}>Description:</strong> {data.description || "No description"}
            </div>
            <div>
              <strong style={{ color: "#FEF3C7" }}>Power:</strong> {data.power ?? "?"}
            </div>
            <div>
              <strong style={{ color: "#FEF3C7" }}>Rarity:</strong> {data.rarity || "Unknown"}
            </div>
          </div>
        )}
      </div>
    )
  }

  const isValidCardName = (name) => {
    if (!name) return false
    const regex = /^thẻ\s+\d+\/?\d*$/i
    return regex.test(name.trim())
  }

  const handleDragStartFromList = (e, card) => {
    e.dataTransfer.setData("card", JSON.stringify(card))
    e.dataTransfer.effectAllowed = "copy"
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

  const handleDragCanvasCard = (e, uniqueKey) => {
    e.stopPropagation()
    const card = canvasCards.find((c) => c.uniqueKey === uniqueKey)
    if (!card) return

    const startMouseX = e.clientX
    const startMouseY = e.clientY
    const startMapX = card.x
    const startMapY = card.y

    const onMouseMove = (ev) => {
      const dxMap = (ev.clientX - startMouseX) / zoom
      const dyMap = (ev.clientY - startMouseY) / zoom

      setCanvasCards((prev) =>
        prev.map((c) => (c.uniqueKey === uniqueKey ? { ...c, x: startMapX + dxMap, y: startMapY + dyMap } : c)),
      )
    }

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseup", onMouseUp)
    }

    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseup", onMouseUp)
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
    if (!name || !isValidCardName(name)) return alert("Tên không hợp lệ")

    if (cards.some((c) => c.id.toLowerCase() === name.trim().toLowerCase())) {
      return alert("Tên thẻ đã tồn tại trong danh sách")
    }

    const selectedCards = canvasCards.filter((c) => selected.includes(c.uniqueKey))
    const avgPower = Math.floor(selectedCards.reduce((sum, c) => sum + (c.power || 50), 0) / selectedCards.length)

    const ukey = `new-${uniqueCounter}`
    setUniqueCounter((c) => c + 1)

    const rect = containerRef.current.getBoundingClientRect()
    const mapX = (rect.width / 2 - pan.x) / zoom - CARD_W / 2
    const mapY = (rect.height / 2 - pan.y) / zoom - CARD_H / 2

    const newCard = {
      id: name.trim(),
      uniqueKey: ukey,
      x: mapX,
      y: mapY,
      img: cardImg,
      description: `Ghép từ ${selectedCards.map((c) => c.id).join(" và ")}.`,
      power: avgPower,
      rarity: "Fusion",
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
    if (!name || !isValidCardName(name)) return alert("Tên không hợp lệ")
    if (cards.some((c) => c.id.toLowerCase() === name.trim().toLowerCase())) {
      return alert("Tên thẻ đã tồn tại trong danh sách")
    }

    setCanvasCards((prev) => prev.map((c) => (c.id === oldId ? { ...c, id: name.trim() } : c)))
    setCards((prev) => prev.map((c) => (c.id === oldId ? { ...c, id: name.trim() } : c)))
    setSelected([])
  }

  const handleAddCard = () => {
    const name = prompt("Nhập tên thẻ mới (vd: Thẻ 20):")
    if (!name || !isValidCardName(name)) return alert("Tên không hợp lệ")
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

  const handleZoomChange = (newZoom) => {
    const rect = containerRef.current.getBoundingClientRect()
    const centerPixelX = rect.width / 2
    const centerPixelY = rect.height / 2
    const centerMapX = (centerPixelX - pan.x) / zoom
    const centerMapY = (centerPixelY - pan.y) / zoom

    const newPanX = centerPixelX - centerMapX * newZoom
    const newPanY = centerPixelY - centerMapY * newZoom

    setZoom(newZoom)
    setPan({ x: newPanX, y: newPanY })
  }

  const handleMinimapClick = (e) => {
    const rect = containerRef.current.getBoundingClientRect()
    const worldWidth = rect.width * zoom
    const worldHeight = rect.height * zoom

    const minimapRect = minimapRef.current.getBoundingClientRect()
    const clickX = e.clientX - minimapRect.left
    const clickY = e.clientY - minimapRect.top

    const normalizedX = clickX / MINIMAP_SIZE
    const normalizedY = clickY / MINIMAP_SIZE

    const desiredWorldX = normalizedX * worldWidth
    const desiredWorldY = normalizedY * worldHeight

    const newPanX = rect.width / 2 - desiredWorldX
    const newPanY = rect.height / 2 - desiredWorldY
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

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setSelected([])
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

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
      <div className="flex flex-1 overflow-hidden">
        {/* Left List */}
        <div className="w-56 bg-gray-800 p-3 flex flex-col">
          <h3 className="mb-2 font-bold">Danh sách thẻ</h3>
          <div
            className="flex-1 overflow-y-auto pr-2"
            style={{
              maxHeight: "calc(100vh - 200px)",
              scrollbarWidth: "thin",
              scrollbarColor: "#4B5563 #374151",
            }}
          >
            <style jsx>{`
              .flex-1::-webkit-scrollbar {
                width: 6px;
              }
              .flex-1::-webkit-scrollbar-track {
                background: #374151;
                border-radius: 3px;
              }
              .flex-1::-webkit-scrollbar-thumb {
                background: #4B5563;
                border-radius: 3px;
              }
              .flex-1::-webkit-scrollbar-thumb:hover {
                background: #6B7280;
              }
            `}</style>
            {cards.map((c) => (
              <div
                key={c.id}
                draggable
                onDragStart={(e) => handleDragStartFromList(e, c)}
                className="p-2 mb-2 bg-gray-700 rounded cursor-grab hover:bg-gray-600"
              >
                <div className="font-bold text-sm">{c.id}</div>
                <div className="text-xs text-gray-300">Power: {c.power}</div>
                <div className="text-xs text-gray-400">{c.rarity}</div>
              </div>
            ))}
          </div>
          <button onClick={handleAddCard} className="mt-2 py-2 px-3 bg-pink-600 hover:bg-pink-500 rounded">
            + Tạo thẻ mới
          </button>
          <button onClick={handleRemoveCardFromList} className="mt-2 py-2 px-3 bg-red-600 hover:bg-red-500 rounded">
            - Xóa thẻ khỏi danh sách
          </button>
        </div>

        {/* Map */}
        <div
          ref={containerRef}
          className="flex-1 relative overflow-hidden"
          style={{
            backgroundImage: `url(${BgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDropToCanvas}
          onMouseDown={handleCanvasMouseDown}
        >
          <svg className="absolute left-0 top-0 w-full h-full pointer-events-none">
            {relations.map((r, i) => {
              const from = canvasCards.find((c) => c.uniqueKey === r.fromKey)
              const to = canvasCards.find((c) => c.uniqueKey === r.toKey)
              if (!from || !to) return null

              const A = instancePixelPos(from)
              const B = instancePixelPos(to)

              // Start point: bottom center of source card
              const startX = A.px + A.w / 2
              const startY = A.py + A.h

              // End point: top center of target card
              const endX = B.px + B.w / 2
              const endY = B.py

              // Create U-shaped connection with straight lines
              const midY = startY + (endY - startY) / 2

              return (
                <g key={i}>
                  {/* Vertical line down from source card */}
                  <line x1={startX} y1={startY} x2={startX} y2={midY} stroke="#000" strokeWidth={3} />
                  {/* Horizontal line connecting the two vertical lines */}
                  <line x1={startX} y1={midY} x2={endX} y2={midY} stroke="#000" strokeWidth={3} />
                  {/* Vertical line up to target card */}
                  <line x1={endX} y1={midY} x2={endX} y2={endY} stroke="#000" strokeWidth={3} />
                </g>
              )
            })}
          </svg>

          {canvasCards.map((c) => {
            const { px, py } = instancePixelPos(c)
            const parents = getParents(c.uniqueKey)
            return (
              <div
                key={c.uniqueKey}
                onMouseDown={(e) => handleDragCanvasCard(e, c.uniqueKey)}
                onClick={(e) => toggleSelectUnique(e, c.uniqueKey)}
                onMouseEnter={() => setHoveredCard({ ...c, parents })}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  position: "absolute",
                  left: px,
                  top: py,
                  transform: `scale(${zoom})`,
                  transformOrigin: "top left",
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

          <div className="absolute left-1/2 -translate-x-1/2 bottom-3 bg-gray-800 px-3 py-1 rounded shadow">
            <span className="text-xs">Zoom</span>
            <input
              type="range"
              min="0.4"
              max="2"
              step="0.05"
              value={zoom}
              onChange={(e) => handleZoomChange(Number(e.target.value))}
              className="mx-2"
            />
            <span className="text-xs">{zoom.toFixed(2)}x</span>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-56 bg-gray-800 p-3 flex flex-col">
          <h3 className="mb-2 font-bold">Thao tác</h3>
          <button onClick={handleMerge} className="mb-2 py-2 px-3 bg-pink-600 hover:bg-pink-500 rounded">
            Ghép thẻ
          </button>
          <button onClick={handleDelete} className="mb-2 py-2 px-3 bg-pink-600 hover:bg-pink-500 rounded">
            Xóa thẻ
          </button>
          <button onClick={handleUpdate} className="mb-4 py-2 px-3 bg-pink-600 hover:bg-pink-500 rounded">
            Cập nhật thẻ
          </button>
          <div className="flex-1"></div>
          <div>
            <h4 className="text-sm mb-1">Minimap</h4>
            <div
              ref={minimapRef}
              onClick={handleMinimapClick}
              className="relative bg-gray-700 border border-gray-500"
              style={{ width: MINIMAP_SIZE, height: MINIMAP_SIZE }}
            >
              {(() => {
                const rect = containerRef.current?.getBoundingClientRect()
                if (!rect) return null
                const worldWidth = rect.width * zoom
                const worldHeight = rect.height * zoom
                return canvasCards.map((c) => {
                  const { px, py, w, h } = instancePixelPos(c)
                  const minix = (px / worldWidth) * 60
                  const miniy = (py / worldHeight) * 60
                  const miniw = (w / worldWidth) * 80
                  const minih = (h / worldHeight) * 50
                  return (
                    <div
                      key={c.uniqueKey}
                      style={{
                        position: "absolute",
                        left: minix,
                        top: miniy,
                        width: miniw,
                        height: minih,
                        background: "#ec4899",
                      }}
                    />
                  )
                })
              })()}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
