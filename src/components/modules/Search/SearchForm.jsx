import { useState,useEffect } from 'react';
import { BASE_URL } from '../../../scripts/modules/baseURL.js';
import { array__allCategory } from '../../../scripts/array__allCategory.js';
import styles from "./SearchForm.module.scss";

export default function SearchForm({years}) {
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState('');
    const [pubYear, setPubYear] = useState('');

    useEffect(() => {
        const handlePageShow = (event) => {
            if (event.persisted) {
                setKeyword('');
                setCategory('');
                setBrand('');
                setPubYear('');
            }
        };

        window.addEventListener('pageshow', handlePageShow);
        return () => {
            window.removeEventListener('pageshow', handlePageShow);
        };
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();

        const params = new URLSearchParams();

        if (keyword) params.set('keyword', keyword);
        if (category) params.set('category', category);
        if (pubYear) params.set('pubYear', pubYear);

        window.location.href = `${BASE_URL}/search?${params.toString()}`;
    };

    return (
        <form className={styles.searchForm} onSubmit={handleSubmit} autoComplete="off">
            <div className={styles.searchForm__field}>
                <input
                    type="text"
                    placeholder="キーワード"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
            </div>
            <div className={styles.searchForm__field}>
                <div className={styles.searchForm__select}>
                    <select 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)}
                        className={category === '' ? "" : `${styles.selected}`}
                    >
                        <option value="">カテゴリーを選択</option>
                        {array__allCategory.map((option, idx) => (
                            <option key={idx} value={option.category}>
                                {option.category}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.searchForm__select}>
                    <select 
                        value={pubYear} 
                        onChange={(e) => setPubYear(e.target.value)}
                        className={pubYear === '' ? "" : `${styles.selected}`}
                    >
                        <option value="">投稿年を選択</option>
                        {years.map((year, idx) => (
                            <option value={year}>{year}年</option>
                        ))}
                    </select>                
                </div>
            </div>
            <div className={styles.searchForm__button}>
                <button type="submit" disabled={!keyword && !category && !pubYear}>検索</button>
            </div>
        </form>
    );
}
