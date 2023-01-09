import './styles.css';
export const PostCard = ({photo,title,id,body}) => {
  return (
    <div className="post" key={id}>
    <img src={photo} alt={title} />
    <div className="content">
      <h1>{title}</h1>
      <p>{body}</p>
    </div>
  </div> 
  )
}