import React, { useEffect, useState } from "react";
import "./Blog.css";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          "https://blog.primedesign.com/wp-json/wp/v2/posts?_embed&per_page=6"
        );
        const data = await res.json();
        setPosts(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="blog-section" id="blog">
      <h2 className="blog-heading">Latest Blog Posts</h2>
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        <div className="blog-posts">
          {posts.map((post) => {
            const featuredImage =
              post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

            const categories = post._embedded?.["wp:term"]?.[0]?.map(
              (cat) => cat.name
            );

            return (
              <div className="blog-post" key={post.id}>
                {featuredImage && (
                  <img
                    className="post-image"
                    src={featuredImage}
                    alt={post.title.rendered}
                  />
                )}
                <div className="post-content">
                  <h3
                    className="post-title"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                  <div
                    className="post-excerpt"
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  />
                  {categories && (
                    <div className="post-categories">
                      {categories.map((cat, i) => (
                        <span className="category" key={i}>
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="read-more"
                  >
                    Read More →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Blog;





// // src/components/Blog.js
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Blog = () => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     axios
//       .get("https://yourwordpresssite.com/wp-json/wp/v2/posts")
//       .then((res) => setPosts(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   return (
//     <div>
//       <h2>Blog Posts</h2>
//       {posts.map((post) => (
//         <div key={post.id}>
//           <h3 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
//           <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Blog;
