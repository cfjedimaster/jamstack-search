module.exports = function(eleventyConfig) {

	const english = new Intl.DateTimeFormat('en');

	eleventyConfig.addFilter("dtFormat", function(date) {
		return english.format(date);
	});

	eleventyConfig.addFilter("jsonsafe", function(s) {
		return JSON.stringify(s);
	});

	eleventyConfig.addFilter("extract", function(s) {
		let firstP = s.indexOf('</p>');
		return s.substring(0,firstP).replace(/<.*?>/g, '');
	});

	eleventyConfig.addPassthroughCopy("*.css");
	eleventyConfig.addWatchTarget("*.css");

};