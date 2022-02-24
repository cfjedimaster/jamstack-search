const indexing = require('algolia-indexing');
require('dotenv').config();
const fs = require('fs');

const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID;
const ALGOLIA_API_KEY = process.env.ALGOLIA_API_KEY;

module.exports = function(eleventyConfig) {

	const english = new Intl.DateTimeFormat('en');

	eleventyConfig.addFilter("dtFormat", function(date) {
		return english.format(date);
	});

	eleventyConfig.addFilter("jsonsafe", function(s) {
		return JSON.stringify(s);
	});

	eleventyConfig.addPassthroughCopy("*.css");
	eleventyConfig.addWatchTarget("*.css");

	eleventyConfig.on('eleventy.after', async () => {

		const credentials = { appId: ALGOLIA_APP_ID, apiKey: ALGOLIA_API_KEY, indexName: 'jamstack_search' };
		const records = JSON.parse(fs.readFileSync('_site/algolia.json','utf8'));
		
		const settings = { searchableAttributes: ['title', 'content'] };
		await indexing.fullAtomic(credentials, records, settings);
		console.log('Done indexing');

    });

};