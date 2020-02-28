const GITHUB_USER_URL = "https://github.com/Rabadash8820/"
const GITHUB_DERPLOID_URL = "https://github.com/DerploidEntertainment/"

export default [
    {
        heading: {
            id: "miscellaneous",
            heading: "Miscellaneous",
            level: "2"
        },
        projects: [
            {
                name: "Wave Analysis Scripts",
                description: "I built these scripts while working as a research assistant at the University of Akron. Check out Dr. Jordan Renna's lab page for description of the work.",
                image: {
                    src: "",
                    alt: "",
                    width: 200,
                    height: 200,
                },
                dates: {
                    start: { year: 2014, descriptor: "Spring" },
                    end: { year: 2016, month: 12 },
                },
                links: [
                    {
                        text: "Source code",
                        href: GITHUB_USER_URL + "WaveAnalysisScripts",
                        icon: "github"
                    },
                    {
                        text: "Renna lab",
                        href: "https://rennalab.uakron.edu",
                    },
                    {
                        text: "Publication",
                        href: "https://www.ncbi.nlm.nih.gov/pubmed/28617242",
                        icon: "file-text"
                    },
                ],
                readMore: {
                    id: "wave-analysis-scripts",
                    partial: "WaveAnalysisScripts",
                }
            },
            {
                name: "HardyWeinberg",
                description: "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
                href: GITHUB_USER_URL + "HardyWeinberg",
            },
            {
                name: "ScammerFlooder",
                description: "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
                href: GITHUB_USER_URL + "ScammerFlooder"
            },
            {
                name: "GravitySimulator",
                description: "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
                href: GITHUB_USER_URL + "GravitySimulator"
            },
            {
                name: "NonIntersecting3dGraphs",
                description: "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
                href: GITHUB_USER_URL + "NonIntersecting3dGraphs"
            },
            {
                name: "2048",
                description: "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
                href: GITHUB_USER_URL + "2048"
            },
            {
                name: "FactorioServer",
                description: "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
                href: GITHUB_USER_URL + "FactorioServer"
            },
            {
                name: "GitAliases",
                description: "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
                href: GITHUB_USER_URL + "GitAliases"
            },
            {
                name: "VsEditorConfig",
                description: "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
                href: GITHUB_USER_URL + "VsEditorConfig"
            },
            {
                name: "VbaModuleManager",
                description: "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
                href: GITHUB_USER_URL + "VbaModuleManager"
            },
        ]
    },
    {
        heading: {
            id: "unity-games",
            heading: "Unity Games",
            level: "2"
        },
        projects: [
            {
                name: "BarrelRoll",
                description: "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
                href: "#",
            },
            {
                name: "Skelia",
                description: "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
                href: "#",
            },
            {
                name: "HighHandHoldem",
                description: "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
                href: GITHUB_DERPLOID_URL + "HighHandHoldem"
            },
            {
                name: "GravityCopter",
                description: "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
                href: GITHUB_USER_URL + "GravityCopter",
            },
        ]
    },
    {
        heading: {
            id: "game-jams",
            heading: "Game Jams",
            level: "2"
        },
        projects: [
            {
                name: "DemiSword Bubonic",
                description: "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
                href: "#",
            },
            {
                name: "Send Them Home",
                description: "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
                href: "#",
            },
            {
                name: "Body Maintenance (BM)",
                description: "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
                href: "#",
            },
        ]
    }
]
