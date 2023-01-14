/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useEffect, useState } from "react";
import { Button } from "../../Button";
import { InputComponent } from "../../InputComponent";
import { loadPosts } from "./../../Data/DataPosts";
import { Posts } from "./../../Posts";
import "./styles.css";

export const home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const noMorePost = posts + postsPerPage >= allPosts.length;

  const filterPost = !!search
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(search.toLowerCase());
      })
    : posts;

  const HandleloadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();
    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  useEffect(() => {
    HandleloadPosts(0, postsPerPage);
  }, [HandleloadPosts, postsPerPage]);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);
    setPosts(posts);
    setPage(nextPage);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  return (
    <section className="container">
      {!!search && (
        <>
          <h2> Search: {search}</h2>
        </>
      )}

      <div className="search">
        <label>Search</label>
        <InputComponent
          search={search}
          handleChange={handleChange}
          placeholder="Enter your text"
        />
      </div>

      {filterPost.length > 0 && <Posts posts={filterPost} />}

      {!search && (
        <Button
          text="Load posts"
          onClick={loadMorePosts}
          disabled={noMorePost}
        />
      )}
    </section>
  );
};

export default home;
