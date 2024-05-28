import React, {useState, useEffect} from 'react';
import { useMediaQuery  } from 'react-responsive'
import axios from 'axios';
import SearchFunc from './searchfunc';
import Cards from './cards';
import './displayCards.css';

const DATA_URI = 'https://api.sampleapis.com/beers/ale'

const DisplayCards = () => {
    const [beers, setBeers] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    let numPerPage = 20;
    const [currentPage, setCurrentPage] = useState(0);
    const [canPrevPage, setCanPrevPage] = useState(false);
    const [canNextPage, setCanNextPage] = useState(true);
    const isMobile = useMediaQuery({query : '(max-width: 477px)'});
    const isMedium = useMediaQuery({query : '(max-width: 799px)'});

    if(isMobile) {
        numPerPage = 10;
    } else if (isMedium) {
        numPerPage = 15;
    }

    useEffect(() => {
        const fetchBeers = async () => {
            try{
            const response = await axios.get(DATA_URI)
            setBeers(response.data)
            } catch (error) {
                console.log(error.message)
            }
        }

        fetchBeers()
    }, []);


    const filteredBeers = searchInput
    ? beers.filter(beer => beer.name.toLowerCase().includes(searchInput.toLowerCase()))
    : beers;

    const BeersLen = filteredBeers.length;

    useEffect(() => {
      setCanPrevPage(currentPage > 0);
      setCanNextPage(currentPage + numPerPage < BeersLen)
  }, [currentPage, BeersLen,numPerPage])

  const handleCurrentPage = () => {
      if(currentPage + numPerPage < BeersLen){
          setCurrentPage(currentPage + numPerPage)
      }
  }

  const handlePrevPage = () => {
      if(currentPage - numPerPage >= 0){
          setCurrentPage(currentPage - numPerPage)
      }
  }

  return (
    <div className="display">
        <h2>Beers</h2>
        <SearchFunc searchInput={searchInput} setSearchInput={setSearchInput}/>
        <div className="cards">
            {filteredBeers.length > 0 ? 
        (filteredBeers.slice(currentPage, currentPage + numPerPage).map((beer, index) => (
            <Cards
            key={beer.id}
            name={beer.name}
            image={beer.image}
            price={beer.price}
            rating={beer.rating}
            id={beer.id}
          />
        )))
        : (
            <p>No Item found</p>
        )
        }
        </div>
        < div className="pagination">
          <button className="btn1" disabled={!canPrevPage ? true : false} onClick={handlePrevPage} >Prev</button>
          <span className="btn3">{currentPage / numPerPage + 1}</span>
          <button className="btn2" disabled={canNextPage ? false : true} onClick={handleCurrentPage}>Next</button>
        </div>
    </div>
  )
}

export default DisplayCards