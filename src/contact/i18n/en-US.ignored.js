const REQUIRED_FIELD_SR = "(required)"

export default {
    title: "Contact",
    heading: "Contact",
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
