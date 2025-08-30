import { createClient } from 'microcms-js-sdk';

const MICROCMS_SERVICE_DOMAIN = import.meta.env.MICROCMS_SERVICE_DOMAIN
const MICROCMS_API_KEY = import.meta.env.MICROCMS_API_KEY

const client = createClient({
  serviceDomain: MICROCMS_SERVICE_DOMAIN,
  apiKey: MICROCMS_API_KEY,
});

const getBlogs = async (queries) => {
  return await client.get({
    endpoint: 'blog',
    queries,
  });
};

const data = await getBlogs({ limit: 100 });

const array__allArticleData = [];
const array__allArticleData2 = [];


data.contents.map((value) => {

    const obj = {};
    obj["id"] = value.id;
    obj["title"] = value.title;
    obj["thumbnail"] = value.thumbnail;
    obj["date"] = new Date(value.date).toISOString().split('T')[0];
    obj["category"] = value.category[0];
    obj["description"] = value.description
    obj["content"] = value.content

    array__allArticleData.push(obj);
    array__allArticleData2.push(obj);
});


export { array__allArticleData,array__allArticleData2 }