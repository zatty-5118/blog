import { BASE_URL } from '../../../scripts/modules/baseURL.js';
import styles from "./ArticleCard.module.scss";

export default function ArticleCard({ articles,cardType }) {
    const classCardType = cardType === "shadow" ? "type__shadow" : "type__border";
    return (
        <ul className={`${styles.article__list} ${styles[classCardType]}`}>
            {articles.map((article) => 
                <li className={styles.article__card}>
                    <a href={`${BASE_URL}/article/view/${article.slug}`}>
                        <div className={styles.image}>
                            <img src={article.thumbnail} alt={article.title} loading='lazy' decoding='async' />
                        </div>
                        <div className={styles.text}>
                            <div className={styles.title}>
                                <h3>{article.title}</h3>
                            </div>
                            <div className={styles.description}>
                                <p>{article.description}</p>
                            </div>
                            <div className={styles.date}>
                                <time dateTime={article.date}>{`${new Date(article.date).getFullYear()}.${('0'+(new Date(article.date).getMonth()+1)).slice(-2)}.${('0'+(new Date(article.date).getDate())).slice(-2)}`}</time>
                            </div>
                        </div>
                    </a>
                </li>
            )}
        </ul>
    );
}