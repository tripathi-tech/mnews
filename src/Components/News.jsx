import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Helmet} from "react-helmet";

const News = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('https://news-api-ten-omega.vercel.app/news', {
                    withCredentials: true  // If credentials are needed
                });
                setArticles(response.data);
            } catch (err) {
                console.error("Error fetching news:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    // Loading state
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="relative">
                    <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
                    <img src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg" className="rounded-full h-28 w-28" alt="Loading avatar" />
                </div>
            </div>
        );
    }

    // Error state
    if (error) return <p>Error fetching news: {error.message}</p>;

    // No articles found
    if (articles.length === 0) return <p>No news articles found.</p>;

    return (
        <div className="m-5">
            <Helmet>
                <meta charSet="utf-8" />
                <title>News Bharat - News India</title>
                <link rel="canonical" href="https://newsbharat.vercel.app/" />
            </Helmet>
            {articles.map((article, index) => (
                <div key={index} className="group mx-2 mt-10 grid max-w-screen-lg grid-cols-1 space-x-8 overflow-hidden rounded-lg border text-gray-700 shadow transition hover:shadow-lg sm:mx-auto sm:grid-cols-5">
                    <a href={article.link} className="col-span-2 text-left text-gray-600 hover:text-gray-700" target="_blank" rel="noopener noreferrer">
                        <div className="group relative h-full w-full overflow-hidden">
                            {article.img_url && (
                                <img src={article.img_url} alt={article.title} className="h-full w-full border-none object-cover text-gray-700 transition group-hover:scale-125" />
                            )}
                            <span className="absolute top-2 left-2 rounded-full bg-yellow-200 px-2 text-xs font-semibold text-yellow-600">
                                {new Date().toLocaleDateString()}
                            </span>
                        </div>
                    </a>
                    <div className="col-span-3 flex flex-col space-y-3 pr-8 text-left">
                        <a href={article.link} target="_blank" rel="noopener noreferrer" className="mt-3 overflow-hidden text-2xl font-semibold">
                            {article.title}
                        </a>
                        <p className="overflow-hidden text-sm">{article.description}</p>
                        <div className="flex flex-col text-gray-700 sm:flex-row">
                            <a href={article.link} target="_blank" rel="noopener noreferrer" className="my-5 rounded-md px-5 py-2 text-center transition hover:scale-105 bg-orange-600 text-white sm:ml-auto">
                                Read more
                            </a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default News;