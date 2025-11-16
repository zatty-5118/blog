import { Client } from '@notionhq/client';

const NOTION_API_KEY = import.meta.env.NOTION_SECRET;
const DATABASE_ID = import.meta.env.NOTION_DATABASE_ID;

const notionNews = new Client({
	auth: NOTION_API_KEY,
});

const responseNews = await notionNews.databases.query({
	database_id: DATABASE_ID,
});

const array__allNewsData = [];
responseNews.results.map((news) => {
	const obj = {};
	obj.title = news.properties.Title.title[0].text.content;
	obj.category = news.properties.Category.select.name;
	obj.date = news.properties.Date.date.start;
	array__allNewsData.push(obj);
});
array__allNewsData.sort((a, b) => new Date(b.date) - new Date(a.date));

export { array__allNewsData }