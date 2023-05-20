"use client";
import { useState, useEffect } from "react";
import parse from "html-react-parser";
import Trending from "./Trending";

const Feed = () => {
  const [feedItems, setFeedItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          "https://api.rss2json.com/v1/api.json?rss_url=https://www.essentiallysports.com/feed/"
        );
        const data = await res.json();
        const items = data.items;
        console.log(items);
        setFeedItems(items);
      } catch {
        // setError(true);
      }
    }

    fetchData();
  }, []);
  return (
    <div className="container">
      <Trending />
      <h3 className="trending-title"><span class="iconify" data-icon="fluent:news-20-regular"></span>All News</h3>
      {feedItems.map((item) => {
        return (
          <>
            <div className="article row">
              <div className="article-info col-md-6">
                <h2 className="article-title">{item.title}</h2>
                <p className="article-desc">{parse(item.description)}</p>
              </div>
              <div className="article-img-div col-md-6">
                <img
                  className="article-image"
                  src={item.enclosure.link}
                  alt="article image"
                />
                <p className="author-name">{item.author}</p>
              </div>
              <hr />
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Feed;
