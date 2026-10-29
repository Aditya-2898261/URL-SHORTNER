import mongoose from "mongoose";

const clickAnalyticsSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },

    shortCode: {
        type: String,
        required: true
    },

    clickedAt: {
        type: Date,
        required: true
    },

    country: {
        type: String,
        default: null
    },

    countryCode: {
        type: String,
        default: null
    },

    region: {
        type: String,
        default: null
    },

    city: {
        type: String,
        default: null
    },

    browser: {
        type: String,
        default: null
    },

    os: {
        type: String,
        default: null
    },

    device: {
        type: String,
        default: null
    },

    isBot: {
        type: Boolean,
        default: null
    },

    referrer: {
        type: String,
        default: null
    },

    utmSource: {
        type: String,
        default: null
    },

    utmMedium: {
        type: String,
        default: null
    },

    utmCampaign: {
        type: String,
        default: null
    },

    utmTerm: {
        type: String,
        default: null
    },

    utmContent: {
        type: String,
        default: null
    }
});

clickAnalyticsSchema.index({
    shortCode: 1,
    clickedAt: -1
});

const ClickAnalytics = mongoose.model(
    "ClickAnalytics",
    clickAnalyticsSchema
);

export default ClickAnalytics;