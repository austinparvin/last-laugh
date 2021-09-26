import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
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
  
  const Page = styled.div`
  min-width: 320px;
  margin: 24px;
  `

  const Title = styled.div`
    display: flex;
    justify-content: center;
    font-size: 24px;
    font-weight: bold;
    padding-bottom:24px;
  `

  const Table = styled.div`
  `

  const Header = styled.div`
    font-weight: bold;
    display:grid;
    grid-template-columns: 4fr 2fr 1fr 1fr;

    @media (max-width: 812px) {
      display:none;
    }
  `

  const Body = styled.div`
    display:grid;
    gap:2px;

    @media (max-width: 812px) {
      gap:5px;
    }
  `

  const Listing = styled.div`
    display:grid;
    grid-template-columns: 4fr 2fr 1fr 1fr;
    background-color:${props => props.listing.data.ups % 2 === 0 ? 'rgba(255, 165, 0, .1)' : 'rgba(0,0,255,.1)'};

    @media (max-width: 812px) {
      grid-template-columns: 1fr;
      grid-template-row: 1fr 1fr 1fr 1fr;
    }
  `

  const ListingDetail = styled.div`

    @media (max-width: 812px) {
      display:grid;
      grid-template-columns: 1fr 7fr;
    }
  `

  const ListingDetailTitle = styled.div`
    font-weight: bold;
    display:none;

    @media (max-width: 812px) {
      display:block;
      width: 100px;
    }
  `

  const ListingLink = styled.a`
    color: black;
    text-decoration: none;
  `

  return (
    <Page>
      <Title>Top 20 Topics of /r/ProgrammerHumor</Title>
      <Table>
        <Header>
          <div>Title</div>
          <div>Author</div>
          <div>Votes</div>
          <div>Coments</div>
        </Header>
        <Body>
        {listings.map((listing) => {
          return(
            <Listing key={listing.data.id} listing={listing}>
              <ListingDetail>
                <ListingDetailTitle>Title: </ListingDetailTitle>
                <ListingLink href={'https://www.reddit.com' + listing.data.permalink}>{listing.data.title}</ListingLink>
              </ListingDetail>
              <ListingDetail>
                <ListingDetailTitle>Author: </ListingDetailTitle>
                {listing.data.author}
              </ListingDetail>
              <ListingDetail>
                <ListingDetailTitle>Votes: </ListingDetailTitle>
                {listing.data.ups}
              </ListingDetail>
              <ListingDetail>
                <ListingDetailTitle>Comments: </ListingDetailTitle>
                {listing.data.num_comments}
              </ListingDetail>
            </Listing>
          )
        })}
        </Body>
      </Table>
    </Page>
  );
}


export default App;
