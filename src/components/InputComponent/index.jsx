import './styles.css';
export const InputComponent = ({searchText, handleChange}) => {
return (
    <input type="search"
     value={searchText}
     onChange={handleChange}
     placeholder="Enter your text"
     className="inputClass"  />
    )
}
   

