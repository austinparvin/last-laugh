import React, { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';

const App = () => {

  const [listings, setListings] = useState([])
  const getTopTopics = async () => {
    const url = 'https://www.reddit.com/r/ProgrammerHumor/top/.json?&limit=20'
    const resp = await axios.get(url)
    console.log(resp.data.data.children)
    setListings(resp.data.data.children.sort((a,b)=>{return b.data.num_comments - a.data.num_comments}))
  }

  useEffect(()=> {
    getTopTopics();
  },[])
  
  return (
    <>
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Votes</th>
          <th>Comments</th>
        </tr>
      </thead>
      <tbody>
      {listings.map((listing) => {
      return(
        <tr key={listing.data.id} className={listing.data.ups % 2 === 0 ? 'even' : 'odd'}>
          <td><a href={'https://www.reddit.com' + listing.data.permalink}>{listing.data.title}</a></td>
          <td>{listing.data.author}</td>
          <td>{listing.data.ups}</td>
          <td>{listing.data.num_comments}</td>
        </tr>
      )
    })}
      </tbody>
    </table>
    </>
  );
}


export default App;
