import { Component } from 'react';
import { Button } from '../../Button';
import { InputComponent } from '../../InputComponent';
import { loadPosts } from './../../Data/DataPosts';
import { Posts } from './../../Posts';
import './styles.css';


class Home extends Component {
state = {
  posts:[ ],
  allPosts:[ ],
  page:0,
  postsPerPage:2,
  searchText:''  
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

handleChange = (e) => {
const { value } = e.target;
this.setState({searchText: value});
}


render(){
  const { posts, postsPerPage, allPosts, searchText } = this.state;
  const noMorePost = posts + postsPerPage >= allPosts.length;
   
  const filterPost = !!searchText ? 
  allPosts.filter(post => {
    return post.title.toLowerCase().includes(
      searchText.toLowerCase()
    );
  }):
  posts;
  
  
return (
    <section className="container">
         {!!searchText && (
          <>
          <h2> Search: {searchText}</h2>
          </>
        )}
      
      <div className="search">
         <label>Search</label>
       <InputComponent 
       searchText={searchText} 
       handleChange={this.handleChange}
       placeholder="Enter your text"
      />
         
      </div>

      {filterPost.length > 0 && (
      <Posts posts={filterPost} /> 
      ) }

   
    {!searchText && (
      
     <Button
     text = "Load posts"
     onClick = {this.loadMorePosts}
     disabled = {noMorePost} />
      
    )}
        
    </section>
  );
}
}

export default Home;
