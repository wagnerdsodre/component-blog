import { Component } from 'react';
import { Button } from '../../Button';
import { loadPosts } from './../../Data/DataPosts';
import { Posts } from './../../Posts';
import './styles.css';


class Home extends Component {
state = {
  posts:[ ],
  allPosts:[ ],
  page:0,
  postsPerPage:2  
}

async componentDidMount(){
  await this.loadPosts()
}

loadPosts = async () => {
  const { page, postsPerPage } = this.state;
  const postsAndPhotos = await loadPosts();
  this.setState({ 
    posts : postsAndPhotos.slice(page, postsPerPage),
    allPosts : postsAndPhotos
   })
}

loadMorePosts = () => {
 const { posts, allPosts, page, postsPerPage} = this.state;
 const nextPage = page + postsPerPage;
 const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
 posts.push(...nextPosts);
 this.setState({posts, page: nextPage })
}


render(){
  const { posts, postsPerPage, allPosts } = this.state;
  const noMorePost = posts + postsPerPage >= allPosts.length;
  
  return (
    <section className="container">
    <Posts posts={posts} />
    <Button
     text = "Load posts"
     onClick = {this.loadMorePosts}
     disabled = {noMorePost}
    
    />

    
    </section>
  );
}
}

export default Home;
