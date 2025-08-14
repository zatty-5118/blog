import { Client } from '@notionhq/client';

const NOTION_API_KEY = import.meta.env.NOTION_BLOG_SECRET;
const DATABASE_ID = import.meta.env.NOTION_BLOG_DATABASE_ID;

const notionBlog = new Client({
	auth: NOTION_API_KEY,
});

const responseBlog = await notionBlog.databases.query({
	database_id: DATABASE_ID,
});

const array__allArticleData = [];

responseBlog.results.map((value) => {

    const obj = {};
    obj["id"] = value.id;
    obj["slug"] = value.properties.Slug.rich_text[0].text.content;
    obj["title"] = value.properties.Title.title[0].text.content;
    obj["thumbnail"] = value.properties.Thumbnail.files[0].file.url;
    obj["date"] = value.properties.Date.date.start;
    obj["category"] = value.properties.Category.multi_select[0].name;
    obj["published"] = value.properties.Published.checkbox;
    obj["description"] = value.properties.Description.rich_text[0].text.content;

    if(obj["published"]){
        array__allArticleData.push(obj);
    };

});

export {notionBlog, responseBlog, array__allArticleData}
