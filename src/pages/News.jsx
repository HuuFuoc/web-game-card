import React, { useEffect, useRef } from "react";
import * as d3 from 'd3';
import f3 from 'family-chart';
import './family-chart.css';
import bgImage from "../assets/slider-bg-1.jpg";
import Navbar from "../components/MyNavbar";

const News = () => {
    const chartRef = useRef(null);

    // Data gia phả
    const familyData = [
        {
            "id": "0",
            "rels": {
                "spouses": ["8c92765f-92d3-4120-90dd-85a28302504c"],
                "father": "0c09cfa0-5e7c-4073-8beb-94f6c69ada19",
                "mother": "0fa5c6bc-5b58-40f5-a07e-d787e26d8b56",
                "children": ["ce2fcb9a-6058-4326-b56a-aced35168561", "f626d086-e2d6-4722-b4f3-ca4f15b109ab"]
            },
            "data": {
                "first name": "Agnus",
                "last name": "",
                "birthday": "1970",
                "avatar": "https://static8.depositphotos.com/1009634/988/v/950/depositphotos_9883921-stock-illustration-no-user-profile-picture.jpg",
                "gender": "M"
            }
        },
        {
            "id": "8c92765f-92d3-4120-90dd-85a28302504c",
            "data": {
                "gender": "F",
                "first name": "Andrea",
                "last name": "",
                "birthday": "",
                "avatar": ""
            },
            "rels": {
                "spouses": ["0"],
                "children": ["ce2fcb9a-6058-4326-b56a-aced35168561", "f626d086-e2d6-4722-b4f3-ca4f15b109ab"],
                "father": "d8897e67-db7c-4b72-ae7c-69aae266b140",
                "mother": "9397093b-30bb-420b-966f-62596b58447f"
            }
        },
        {
            "id": "0c09cfa0-5e7c-4073-8beb-94f6c69ada19",
            "data": {
                "gender": "M",
                "first name": "Zen",
                "last name": "",
                "birthday": "",
                "avatar": ""
            },
            "rels": {
                "children": ["0"],
                "spouses": ["0fa5c6bc-5b58-40f5-a07e-d787e26d8b56"]
            }
        },
        {
            "id": "0fa5c6bc-5b58-40f5-a07e-d787e26d8b56",
            "data": {
                "gender": "F",
                "first name": "Zebra",
                "last name": "",
                "birthday": "",
                "avatar": ""
            },
            "rels": {
                "spouses": ["0c09cfa0-5e7c-4073-8beb-94f6c69ada19"],
                "children": ["0"],
                "father": "12a9bddf-855a-4583-a695-c73fa8c0e9b2",
                "mother": "bd56a527-b613-474d-9f38-fcac0aae218b"
            }
        },
        {
            "id": "ce2fcb9a-6058-4326-b56a-aced35168561",
            "data": {
                "gender": "M",
                "first name": "Ben",
                "last name": "",
                "birthday": "",
                "avatar": ""
            },
            "rels": {
                "mother": "8c92765f-92d3-4120-90dd-85a28302504c",
                "father": "0",
                "spouses": ["b4e33c68-20a7-47ba-9dcc-1168a07d5b52"],
                "children": ["eabd40c9-4518-4485-af5e-e4bc3ffd27fb", "240a3f71-c921-42d7-8a13-dec5e1acc4fd"]
            }
        },
        {
            "id": "f626d086-e2d6-4722-b4f3-ca4f15b109ab",
            "data": {
                "gender": "F",
                "first name": "Becky",
                "last name": "",
                "birthday": "",
                "avatar": ""
            },
            "rels": {
                "mother": "8c92765f-92d3-4120-90dd-85a28302504c",
                "father": "0"
            }
        },
        {
            "id": "eabd40c9-4518-4485-af5e-e4bc3ffd27fb",
            "data": {
                "gender": "M",
                "first name": "Carlos",
                "last name": "",
                "birthday": "",
                "avatar": ""
            },
            "rels": {
                "mother": "b4e33c68-20a7-47ba-9dcc-1168a07d5b52",
                "father": "ce2fcb9a-6058-4326-b56a-aced35168561"
            }
        },
        {
            "id": "b4e33c68-20a7-47ba-9dcc-1168a07d5b52",
            "data": {
                "gender": "F",
                "first name": "Branka",
                "last name": "",
                "birthday": "",
                "avatar": ""
            },
            "rels": {
                "spouses": ["ce2fcb9a-6058-4326-b56a-aced35168561"],
                "children": ["eabd40c9-4518-4485-af5e-e4bc3ffd27fb", "240a3f71-c921-42d7-8a13-dec5e1acc4fd"]
            }
        },
        {
            "id": "240a3f71-c921-42d7-8a13-dec5e1acc4fd",
            "data": {
                "gender": "F",
                "first name": "Carla",
                "last name": "",
                "birthday": "",
                "avatar": ""
            },
            "rels": {
                "mother": "b4e33c68-20a7-47ba-9dcc-1168a07d5b52",
                "father": "ce2fcb9a-6058-4326-b56a-aced35168561"
            }
        },
        {
            "id": "12a9bddf-855a-4583-a695-c73fa8c0e9b2",
            "data": {
                "gender": "M",
                "first name": "Yvo",
                "last name": "",
                "birthday": "",
                "avatar": ""
            },
            "rels": {
                "children": ["0fa5c6bc-5b58-40f5-a07e-d787e26d8b56"],
                "spouses": ["bd56a527-b613-474d-9f38-fcac0aae218b"]
            }
        },
        {
            "id": "bd56a527-b613-474d-9f38-fcac0aae218b",
            "data": {
                "gender": "F",
                "first name": "Yva",
                "last name": "",
                "birthday": "",
                "avatar": ""
            },
            "rels": {
                "spouses": ["12a9bddf-855a-4583-a695-c73fa8c0e9b2"],
                "children": ["0fa5c6bc-5b58-40f5-a07e-d787e26d8b56"]
            }
        },
        {
            "id": "d8897e67-db7c-4b72-ae7c-69aae266b140",
            "data": {
                "gender": "M",
                "first name": "Zadro",
                "last name": "",
                "birthday": "",
                "avatar": ""
            },
            "rels": {
                "children": ["8c92765f-92d3-4120-90dd-85a28302504c"],
                "spouses": ["9397093b-30bb-420b-966f-62596b58447f"]
            }
        },
        {
            "id": "9397093b-30bb-420b-966f-62596b58447f",
            "data": {
                "gender": "F",
                "first name": "Zadra",
                "last name": "",
                "birthday": "",
                "avatar": ""
            },
            "rels": {
                "spouses": ["d8897e67-db7c-4b72-ae7c-69aae266b140"],
                "children": ["8c92765f-92d3-4120-90dd-85a28302504c"]
            }
        }
    ];

    useEffect(() => {
        if (chartRef.current) {
            createFamilyChart(familyData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function createFamilyChart(data) {
        let tree, main_id;

        const cont = chartRef.current;
        // Clear previous content
        cont.innerHTML = '';
        
        const svg = f3.createSvg(cont);

        updateTree({ initial: true });

        function updateTree(props) {
            tree = f3.calculateTree(data, { main_id });
            f3.view(tree, svg, Card(tree, svg, onCardClick), props || {});
        }

        function updateMainId(_main_id) {
            main_id = _main_id;
        }

        function onCardClick(e, d) {
            updateMainId(d.data.id);
            updateTree();
        }

        function Card(tree, svg, onCardClick) {
            return function (d) {
                if (d.data.main) {
                    this.innerHTML = '';
                    const card = d3.select(this);
                    card.append('rect')
                        .attr('width', 220)
                        .attr('height', 70)
                        .attr('fill', '#4f46e5')
                        .attr('stroke', '#e5e7eb')
                        .attr('stroke-width', 2)
                        .attr('rx', 8)
                        .attr('transform', `translate(${[-220/2, -70/2]})`);
                    
                    card.append('text')
                        .attr('fill', 'white')
                        .text('Main Person')
                        .attr('transform', `translate(${[0, -25]})`)
                        .attr('text-anchor', 'middle')
                        .attr('font-size', 12)
                        .attr('font-weight', 'bold');
                    
                    card.append('text')
                        .attr('fill', 'white')
                        .text(`${d.data.data['first name']} ${d.data.data['last name']}`)
                        .attr('transform', `translate(${[0, -5]})`)
                        .attr('text-anchor', 'middle')
                        .attr('font-size', 14);
                    
                    if (d.data.data.birthday) {
                        card.append('text')
                            .attr('fill', 'white')
                            .text(`Born: ${d.data.data.birthday}`)
                            .attr('transform', `translate(${[0, 15]})`)
                            .attr('text-anchor', 'middle')
                            .attr('font-size', 10);
                    }
                    return;
                } else {
                    return f3.elements.CardSvg({
                        svg,
                        card_dim: { w: 220, h: 70, text_x: 75, text_y: 15, img_w: 60, img_h: 60, img_x: 5, img_y: 5 },
                        card_display: [d => `${d.data['first name']} ${d.data['last name']}`],
                        onCardClick,
                        img: true,
                        mini_tree: true,
                        onMiniTreeClick: onCardClick,
                    }).call(this, d);
                }
            };
        }
    }

    return (
        <div className="bg-gray-900 min-h-screen">
            {/* Navbar */}
            <Navbar />
            
            {/* Header Section */}
            <section
                className="relative py-16"
                style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-[#7c2a7a99] to-[#0c1022cc]"></div>
                <div className="relative z-10 text-center text-white">
                    <h1 className="text-5xl font-bold mb-4">Family Tree</h1>
                    <p className="text-xl text-gray-300">Explore our family genealogy</p>
                </div>
            </section>

            {/* Family Chart Section */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-white mb-4">Interactive Family Tree</h2>
                        <p className="text-gray-400 mb-6">Click on any family member to focus on their branch</p>
                    </div>

                    {/* Chart Container */}
                    <div className="bg-gray-800 rounded-xl shadow-2xl p-6">
                        <div 
                            ref={chartRef}
                            className="f3"
                            style={{
                                width: '100%',
                                height: '800px',
                                backgroundColor: '#1f2937',
                                borderRadius: '12px',
                                border: '2px solid #374151'
                            }}
                        ></div>
                    </div>

                    {/* Instructions */}
                    <div className="mt-8 bg-gray-800 rounded-lg p-6">
                        <h3 className="text-xl font-bold text-white mb-4">How to Use</h3>
                        <div className="grid md:grid-cols-3 gap-4 text-gray-300">
                            <div className="flex items-start space-x-3">
                                <div className="bg-pink-500 rounded-full w-6 h-6 flex items-center justify-center text-white text-sm font-bold">1</div>
                                <div>
                                    <h4 className="font-semibold text-white">Click to Focus</h4>
                                    <p className="text-sm">Click on any person to make them the center of the tree</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="bg-pink-500 rounded-full w-6 h-6 flex items-center justify-center text-white text-sm font-bold">2</div>
                                <div>
                                    <h4 className="font-semibold text-white">Navigate Branches</h4>
                                    <p className="text-sm">Explore different family branches by clicking on relatives</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="bg-pink-500 rounded-full w-6 h-6 flex items-center justify-center text-white text-sm font-bold">3</div>
                                <div>
                                    <h4 className="font-semibold text-white">View Details</h4>
                                    <p className="text-sm">See relationships, birth dates, and family connections</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default News;
