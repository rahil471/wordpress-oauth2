const axios = require('axios');
const config = require('./config');

const getStats =  function(params, callback){
	let count = 0;
    axios.get(`https://public-api.wordpress.com/rest/v1.1/sites/${config.SiteId}/stats?http_envelope=1`,
                {headers: {'Authorization': `Bearer ${TOKEN}`}},
            )
    .then((response)=>{
        console.log(response);
	if(params.StatType === 'Visitors'){
        if(params.Period === 'Today'){
            count = response.data.body.stats.visitors_today;
        } else {
            count = response.data.body.stats.visitors_yesterday;
        }
	} else {
        if(params.Period === 'Today'){
            count = response.data.body.stats.views_yesterday;
        } else {
            count = response.data.body.stats.views_yesterday;
        }
	}
	let reply = `Your website ciphertrick.com had ${count} ${params.StatType} ${params.Period}`
	let format = { fulfillmentText: reply }
        callback(null, format);
    });
};

module.exports.getStats = getStats;
