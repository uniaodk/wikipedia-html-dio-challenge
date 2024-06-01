const article = document.getElementById("article-content");
const anchors = document.getElementById("anchors");

async function getTextPage(pageName) {
	const response = await fetch(pageName);
	return response.text();
}

function buildTemplateAnchors(textPage) {
	let template = '';
	const matchesIds = textPage.matchAll(/<section\s+id="([^"]+)"/g).toArray();
	const matchesH2s = textPage.matchAll(/<h2>([^"]+)<\/h2>/g).toArray();
	for (let index = 0; index < matchesIds.length; index++) {
		template += `<li><a href="#${matchesIds[index][1]}">${matchesH2s[index][1]}</a></li>`;
	}
	console.log(template);
	return template;
}

(async function () {
	const params = new URLSearchParams(window.location.search);
	const serie = params.get("serie") || 'arrow';
	const textPage = await getTextPage(`./pages/${serie}.html`);
	anchors.innerHTML = buildTemplateAnchors(textPage);
	article.innerHTML = textPage;
})();