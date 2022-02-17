/*
My purpose is to read from my personal blog a set of files and copy them to our demo blog.
I need to manipulate the FM a bit too.
*/

const glob = require('glob-promise');
const fs = require('fs/promises');

const INPUT = '/home/ray/projects/raymondcamden2020/_posts/202*/**/*.md';
const OUTPUT = './seedblog/posts/';

function fixContent(s) {
	s = s.replace(/permalink: .*\n/, '');
	s = s.replace(/banner_image: .*\n/, '');
	s = s.replace(/tags: \[.*?\]/, 'tags: "post"');
	s = s.replace(/data-src=/g, "src=");
	
	return s;
}

(async () => {

	let files = await glob(INPUT);
	console.log(`Seeding with ${files.length} files.`);
	files.forEach(async f => {
		console.log(f);
		let contents = await fs.readFile(f, 'utf8');
		contents = fixContent(contents);
		let filename = f.split('/').pop();
		let dest = OUTPUT + filename;
		await fs.writeFile(dest, contents, 'utf8');
	});

})()