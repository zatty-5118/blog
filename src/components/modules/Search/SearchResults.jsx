import { useEffect, useState } from 'react';
import ArticleCard from '../Card/ArticleCard';
import { array__allCategory } from '../../../scripts/array__allCategory.js';

export default function SearchResults({ data }) {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    const rawKeyword = params.get('keyword') || '';
    const rawCategory = params.get('category') || '';
    const rawPubYear = params.get('pubYear') || '';

    const keyword = rawKeyword.toLowerCase();
    const category = rawCategory.toLowerCase();
    const pubYear = rawPubYear.toLowerCase();

    setQuery({ keyword: rawKeyword, category: rawCategory, pubYear: rawPubYear });

    if (data?.length) {
      const filtered = data.filter((post) => {
        const matchkeyword = !keyword || post.title?.toLowerCase().includes(keyword) || post.description?.toLowerCase().includes(keyword);
        const matchCategory = !category || post.category?.toLowerCase() === category;
        const matchPubYear = !pubYear || post.date?.toLowerCase().includes(pubYear);
        return matchkeyword && matchCategory && matchPubYear;
      });

      setResults(filtered);
    }

  }, [data]);

  const matchedCategory = array__allCategory.find(item => item.category === query.category);
  const categoryJa = matchedCategory ? matchedCategory.category : '';

  const [firstLoading, setFirstLoading] = useState(true);
   
  const removeLoading = (() => {
    setTimeout(() => {
      setFirstLoading(false);
      if (typeof document !== 'undefined') {
          document.querySelector('body').style.overflow = 'auto';
      }
    }, 500);
  })();

  return (
    <>
      {firstLoading ? (
          <>
            <section className="firstLoadnig">
              <div className="spinner">
                  <svg witdh="120" height="120" viewBox="-60 -60 120 120">
                    <circle r="50" fill="none" stroke="red" strokeWidth="10" />
                  </svg>
                  <p>Loading・・・</p>
              </div>
            </section>
          </>
        ) : (
          <>
            {Object.values(query).some((v) => v) && (
              <div className="title">
                <h1>「
                  <span className="searchWord">
                    {query.keyword && <span>{query.keyword}</span>}
                    {query.category && <span>{categoryJa}</span>}
                    {query.pubYear && <span>{query.pubYear}年</span>}
                  </span>
                  」の検索結果
                </h1>
              </div>
            )}
            <p className='resultLength'>検索結果：{results.length}件</p>
            {results.length === 0 ? (
              <div className="resultText">
                <p>該当する記事はありませんでした。</p>
                <p>恐れ入りますが、検索するキーワードを変えるか、<br />記事一覧またはカテゴリーからお探しください。</p>
              </div>
            ) : (
              <ArticleCard articles={results} cardType="border"/>
            )
            }
          </>
        )
      }
    </>
  );
}
