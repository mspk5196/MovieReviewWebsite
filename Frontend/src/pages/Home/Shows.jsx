import React, { useEffect, useState } from 'react'
import '../../styles/pages/Home.scss'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import IconButton from '@mui/material/IconButton';
import ShowPopup from '../../components/PopupDetails/ShowPopup';

export default function Shows() {

    const [showsDetail, setShows] = useState([]);

    const [isPopupOpen, setPopupOpen] = useState(false);
    const [selectedShowDetail, setSelectedShow] = useState([]);

    const fetchSelectedShow = async (itemId) => {
        try {
            const res = await fetch(`http://localhost:8000/api/get-selected-show/${itemId}`, {
                method: "GET",
            });
            const dataMovie = await res.json();
            // console.log(dataMovie.get_selected_movie);
            setSelectedShow(dataMovie.get_selected_show);
        } catch (error) {
            console.error("Error fetching movie details:", error);
        }
    };

    const fetchUploadedShows = async () => {
        try {
            const res = await fetch("http://localhost:8000/api/get-shows", {
                method: "GET",
            })
            const dataShows = await res.json();
            setShows(dataShows.get_shows);
        }
        catch (error) {

        }
    }
    useEffect(() => {
        fetchUploadedShows();
    }, [])
    return (


        <div className='shows'>
            <p id='tit'>Popular Shows</p>
            <div className='showsList'>
                {showsDetail.map((showsDiv, i) => (
                    <div key={i} className='show' onClick={() => {fetchSelectedShow(showsDiv.ID); setPopupOpen(true);}}>
                        <div className='showImg'>
                            <img src={`http://localhost:8000/uploads/${showsDiv.Image}`} alt="Uploaded" />
                        </div>
                        <div className='showTitle'>
                            <p>Show name: <span>{showsDiv.ShowName}</span></p>
                            <p>Presented by: <span>{showsDiv.ShowPresentedBy}</span></p>
                        </div>
                        <div className='showSDesc'>
                            <p>Seasons/Episode: <span id='es'>{showsDiv.ShowEpisodes}/{showsDiv.ShowSeasons}</span></p>
                            <p id='sDesc'>{showsDiv.ShowSDesc}</p>
                        </div>
                    </div>
                ))}
            </div>
            <ShowPopup
                open={isPopupOpen}
                onClose={() => setPopupOpen(false)}
                showData={selectedShowDetail}
            />
        </div>
    )
}
