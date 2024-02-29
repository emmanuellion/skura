const {readdirSync, writeFileSync} = require("fs");

const base = readdirSync("./build");
const css = readdirSync("./build/static/css");
const js = readdirSync("./build/static/js");

let files = [];
files = files.concat(base.filter(file => !file.includes("asset-manifest") && !(file === "static")).map(el => "/"+el));
files = files.concat(css.filter(file => !file.includes("map")).map(el => "/static/css/"+el));
files = files.concat(js.filter(file => !file.includes("map") && !file.includes(".txt")).map(el => "/static/js/"+el));
console.log(files)

let data = `const urlsToCache = ["/", "${files.join('", "')}"]` +
	"\n" +
	"self.addEventListener(\"install\", (event) => {\n" +
	"	event.waitUntil(\n" +
	"		caches.open('japan-v1').then(cache => cache.addAll(urlsToCache))\n" +
	"	);\n" +
	"});" +
	"\n" +
	"self.addEventListener('fetch', event => {\n" +
	"  event.respondWith(\n" +
	"    caches.match(event.request)\n" +
	"      .then(response => {\n" +
	"        // Cache hit - return response\n" +
	"        if (response) {\n" +
	"          return response;\n" +
	"        }\n" +
	"\n" +
	"        // Clone the request to make a network request\n" +
	"        const fetchRequest = event.request.clone();\n" +
	"\n" +
	"        return fetch(fetchRequest)\n" +
	"          .then(response => {\n" +
	"            // Check if we received a valid response\n" +
	"            if (!response || response.status !== 200 || response.type !== 'basic') {\n" +
	"              return response;\n" +
	"            }\n" +
	"\n" +
	"            // Clone the response to cache it\n" +
	"            const responseToCache = response.clone();\n" +
	"\n" +
	"            caches.open('japan-v1')\n" +
	"              .then(cache => {\n" +
	"                cache.put(event.request, responseToCache);\n" +
	"              });\n" +
	"\n" +
	"            return response;\n" +
	"          });\n" +
	"      })\n" +
	"  );\n" +
	"});"

writeFileSync("./public/service-worker.js", data);
writeFileSync("./build/service-worker.js", data);