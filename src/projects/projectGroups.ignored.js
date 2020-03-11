const GITHUB_USER_URL = "https://github.com/Rabadash8820/"
const GITHUB_DERPLOID_URL = "https://github.com/DerploidEntertainment/"

export default {
    misc: {
        heading: {
            id: "miscellaneous",
            level: "2"
        },
        projects: {
            waveAnalysisScripts: {
                image: {
                    src: "",
                    width: 200,
                    height: 200,
                },
                dates: {
                    start: { year: 2014 },    // Localized descriptor "Spring"
                    end: { year: 2016, month: 12 },
                },
                links: {
                    source: {
                        href: GITHUB_USER_URL + "WaveAnalysisScripts",
                        icon: "github"
                    },
                    rennaLab: {
                        href: "https://rennalab.uakron.edu",
                    },
                    publication: {
                        href: "https://www.ncbi.nlm.nih.gov/pubmed/28617242",
                        icon: "file-text"
                    },
                },
                readMore: {
                    id: "wave-analysis-scripts",
                    partial: () =>
                        (text, render) => render("{{> waveAnalysisScripts }}")
                }
            },
            hardyWeinberg: {
                href: GITHUB_USER_URL + "HardyWeinberg",
            },
            scammerFlooder: {
                href: GITHUB_USER_URL + "ScammerFlooder"
            },
            gravitySimulator: {
                href: GITHUB_USER_URL + "GravitySimulator"
            },
            nonIntersecting3dGraphs: {
                href: GITHUB_USER_URL + "NonIntersecting3dGraphs"
            },
            auto2048: {
                href: GITHUB_USER_URL + "2048"
            },
            factorioServer: {
                href: GITHUB_USER_URL + "FactorioServer"
            },
            gitAliases: {
                href: GITHUB_USER_URL + "GitAliases"
            },
            vsEditorConfig: {
                href: GITHUB_USER_URL + "VsEditorConfig"
            },
            vbaModuleManager: {
                href: GITHUB_USER_URL + "VbaModuleManager"
            },
        }
    },
    unityGames: {
        heading: {
            id: "unity-games",
            level: "2"
        },
        projects: {
            barrelRoll: {
                href: "#",
            },
            skelia: {
                href: "#",
            },
            highHandHoldem: {
                href: GITHUB_DERPLOID_URL + "HighHandHoldem"
            },
            gravityCopter: {
                href: GITHUB_USER_URL + "GravityCopter",
            },
        }
    },
    gameJams: {
        heading: {
            id: "game-jams",
            level: "2"
        },
        projects: {
            bubonic: {
                href: "#",
            },
            sendThemHome: {
                href: "#",
            },
            bm: {
                href: "#",
            },
        }
    }
}
