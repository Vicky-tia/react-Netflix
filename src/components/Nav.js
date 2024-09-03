import React, { useEffect, useState } from 'react';
import "./Nav.css"
import { useNavigate } from 'react-router-dom';
export default function Nav() {
    const [show, setShow] =useState(false);
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener("scroll", () =>{
            console.log('window.scrollY',window.scrollY);
            if (window.scrollY > 50) {
                setShow(true);
            } else {
                setShow(false);
            }
        });

        return () => {
            window.removeEventListener("scroll", () => {});
        };
    }, []);

    const handleChange = (e) => {
        setSearchValue(e.target.value);
        navigate(`/search?q=${e.target.value}`);
    };

  return (
  <nav className={`nav ${show && "nav_black"}`}>
    <img
    alt="Netflix logo"
    src="https://upload.wikimedia.org/wikipedia/commons/e/ea/Netflix_Logomark.png"
    className='nav_logo'
    onClick={() => window.location.reload()}
    />

    <input
    value={searchValue}
    onChange={handleChange}
    className='nav_input'
    type='text'
    placeholder="영화를 검색해주세요."
    />

    <img
    alt="User-logged"
    src="https://upload.wikimedia.org/wikipedia/commons/c/ce/%EB%82%98%EB%AC%B4_%EC%9C%84%EC%9D%98_%EA%B3%A0%EC%96%91%EC%9D%B4.jpg"
    className='nav_avatar'
    />
  </nav>
  );
}
