const axios = require('axios');
const API_KEY = 'AIzaSyD5MEcauwP7P-LrQ9Vqix-C5NsSsRdNrv0';
const APIurl = `https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=${API_KEY}`;
const pageSpeedInsightsChecker = async (url) => {
    const data = {
        effectiveConnectionType: '4G',
        formFactor: 'DESKTOP',
        origin: url,
    };

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await axios.post(APIurl, data, config);
        return {
            timeToFirstByte: response.data.record.metrics.experimental_time_to_first_byte.percentiles.p75,
            firstInputDelay: response.data.record.metrics.first_input_delay.percentiles.p75,
            interactionToNextPaint: response.data.record.metrics.interaction_to_next_paint.percentiles.p75,
            firstContentfulPaint: response.data.record.metrics.first_contentful_paint.percentiles.p75,
            largestContentfulPaint: response.data.record.metrics.largest_contentful_paint.percentiles.p75
        };
    } catch (error) {
        console.log('Error in core web vitals');
    }
};
module.exports= pageSpeedInsightsChecker;
