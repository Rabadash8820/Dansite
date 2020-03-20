const REQUIRED_FIELD_SR = "(required)"

export default {
    title: "Contact",
    heading: "Contact",
    fields: {
        name: {
            label: "Name",
            required: { srText: REQUIRED_FIELD_SR },
            invalidFeedback: "Please provide your name, so I know what to call you!",
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
    btnSendSendingLbl: "Sending...",
    emailjsAlerts: {
        success: {
            heading: "Sent!",
            message: "Thanks for reaching out!",
        },
        failure: {
            heading: "Uh oh!",
            message: "Something went wrong while sending your message. Sorry about that :/ Please try again in a bit.",
        },
    }
}
