const HEADING_ARIA_LBL = "Anchor"

import skillGroups from "./skillGroups.en-US.ignored.js"
import jobs from "./jobs.en-US.ignored.js"
import education from "./education.en-US.ignored.js"

export default {
    title: "About",
    heading: "Who is Dan?",
    contact: {
        message: "Want to collaborate on your next project?",
        btnLbl: "Let's chat!"
    },
    aboutSection: {
        heading: {
            text: "Who is Dan?",
            ariaLabel: HEADING_ARIA_LBL
        },
        image: {
            alt: "Me giving my Designing New Lifeforms presentation at GDEX 2019",
        }
    },
    skillsSection: {
        heading: {
            text: "Skills",
            ariaLabel: HEADING_ARIA_LBL
        },
        skillGroups: skillGroups
    },
    jobsSection: {
        heading: {
            text: "Where I've Worked",
            ariaLabel: HEADING_ARIA_LBL
        },
        jobs: jobs
    },
    educationSection: {
        heading: {
            text: "Where I Got Learned",
            ariaLabel: HEADING_ARIA_LBL
        },
        stats: {
            lblGraduated: "Graduated",
            lblDegree: "Degree",
            lblDistinction: "Distinction",
            lblGpa: "GPA",
        },
        education: education
    },
}
