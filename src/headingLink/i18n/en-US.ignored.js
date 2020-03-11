const REQUIRED_FIELD_SR = "(required)"
const HEADING_ARIA_LBL = "Anchor"

export default {
    pages: {
        about: {
            options: {
                title: "About",
                heading: "Who is Dan?",
            },
            navbar: {
                label: "About"
            },
            aboutSection: {
                heading: {
                    text: "Who is Dan?",
                    ariaLabel: HEADING_ARIA_LBL
                }
            },
            skillsSection: {
                heading: {
                    text: "Who is Dan?",
                    ariaLabel: HEADING_ARIA_LBL
                }
            },
            jobsSection: {
                heading: {
                    text: "Where I've Worked",
                    ariaLabel: HEADING_ARIA_LBL
                }
            },
            educationSection: {
                heading: {
                    text: "Where I Got Learned",
                    ariaLabel: HEADING_ARIA_LBL
                }
            },
        },
        projects: {
            options: {
                title: "Projects",
                heading: "Projects",
            },
            navbar: {
                label: "Projects"
            }
        },
        contact: {
            options: {
                title: "Contact",
                heading: "Contact",
            },
            navbar: {
                label: "Contact"
            },
            fields: {
                firstName: {
                    label: "First name",
                    required: { srText: REQUIRED_FIELD_SR },
                    invalidFeedback: "Please provide your first name, so I know what to call you!",
                },
                lastName: {
                    label: "Last name",
                },
                email: {
                    label: "Email",
                    required: { srText: REQUIRED_FIELD_SR },
                    invalidFeedback: "Please provide a valid email, so I can get back to you",
                },
                referral: {
                    label: "How did you hear about me?",
                },
                message: {
                    label: "Tell me about your project, or anything really!",
                    required: { srText: REQUIRED_FIELD_SR },
                    invalidFeedback: "Please enter a message, so we have something to talk about!",
                },
            },
            btnSendLbl: "Send!",
            emailjsAlerts: {
                success: "Success! Thanks for reaching out!",
                failure: "Whoa, something went wrong while sending your message. Sorry about that :/ Please try again in a bit.",
            }
        }
    },
}
