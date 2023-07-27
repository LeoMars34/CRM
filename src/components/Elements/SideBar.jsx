import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { Input } from "./Input";
import { ToolsMenu } from "../Tools/ToolsMenu";
import { HappyBirthdayClients } from "../Tools/HappyBirthdayClients";
import { ProblemBook } from "../Tools/ProblemBook";
import { LiveTape } from "../Tools/LiveTape";
import { CustomContext } from "../Service/Context";
import { getBriefly } from "../../Api";
import { InfoPopUp } from "../Service/InfoPopUp";

function SideBar() {
    const navigate = useNavigate();
    const { admin } = useContext(CustomContext);
    const [briefly, setBriefly] = useState([]);
    let list = document.querySelectorAll(".navigation ul li");
    useEffect(() => {
        getBriefly().then((data) => {
            if (data.error) {
                InfoPopUp(data.error, "popup__Info_red");
            } else {
                setBriefly(data);
            }
        });
        if (document.querySelector(".toggle")) {
            document.querySelector(".toggle").onclick = function () {
                if (document.getElementById("main")) {
                    document.getElementById("main").classList.toggle("active");
                }
                document
                    .querySelector(".navigation")
                    .classList.toggle("active");
            };
        }
        if (
            document.querySelector(".navigation").classList.contains("active")
        ) {
            document.getElementById("main").classList.add("active");
        }
        /*Функция навигации по приложению*/
        function activeLink() {
            list.forEach((item) => {
                item.classList.remove("hovered");
                item.classList.add("hovered");
            });
        }
        list.forEach((item) => {
            item.addEventListener("onclick", activeLink);
        });
        document.getElementById("btnBack").onclick = (e) => {
            navigate(-1);
        };
    }, []);
    /*Функция поиска*/
    function Search(e) {
        if (document.getElementById("inputGlobalSearch").value.trim()) {
            navigate("/SearchResults");
        } else {
            document.getElementById("inputGlobalSearch").value = "";
        }
    }

    return (
        <div className="container">
            <div className="navigation">
                <ul>
                    <li>
                        <Link to="#">
                            <img
                                className="logo__sideBar"
                                src="logoContur.png"
                                alt=""
                            />
                            {/* <span className="titleIF">
                                InsFamily <br />
                                <span style={{ fontSize: "13px" }}>
                                    центр страхования
                                </span>
                            </span> */}
                            <div className="isAdmin">{admin}</div>
                        </Link>
                        <div className="brieflySideBar">
                            <div style={{ fontSize: "30px" }}>
                                <ion-icon name="rocket-outline"></ion-icon>
                            </div>
                            <p>{briefly.user}</p>
                            <p>{briefly.sum_sp} &#8381;</p>
                        </div>
                    </li>
                    <li>
                        <Link to="/Dashboard">
                            <span className="icon">
                                <ion-icon name="id-card-outline"></ion-icon>
                            </span>
                            <span className="title">Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/Clients">
                            <span className="icon">
                                <ion-icon name="person-circle-outline"></ion-icon>
                            </span>
                            <span className="title">Клиенты</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/Sales">
                            <span className="icon">
                                <ion-icon name="cash-outline"></ion-icon>
                            </span>
                            <span className="title">Продажи</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/Telefhony">
                            <span className="icon">
                                <ion-icon name="call-outline"></ion-icon>
                            </span>
                            <span className="title">Телефония</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/Analytics">
                            <span className="icon">
                                <ion-icon name="analytics-outline"></ion-icon>
                            </span>
                            <span className="title">Аналитика</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/Finance">
                            <span className="icon">
                                <ion-icon name="newspaper-outline"></ion-icon>
                            </span>
                            <span className="title">Финансы</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/FinancialPolicy">
                            <span className="icon">
                                <ion-icon name="stats-chart-outline"></ion-icon>
                            </span>
                            <span className="title">Фин.политика</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/Education">
                            <span className="icon">
                                <ion-icon name="library-outline"></ion-icon>
                            </span>
                            <span className="title">Обучение</span>
                        </Link>
                    </li>
                    <li>
                        {admin ? (
                            <Link to="/Staff">
                                <span className="icon">
                                    <ion-icon name="people-outline"></ion-icon>
                                </span>
                                <span className="title">Персонал</span>
                            </Link>
                        ) : (
                            <></>
                        )}
                    </li>
                    <li>
                        {admin ? (
                            <Link to="/Administration">
                                <span className="icon">
                                    <ion-icon name="logo-react"></ion-icon>
                                </span>
                                <span className="title">Администрирование</span>
                            </Link>
                        ) : (
                            <></>
                        )}
                    </li>
                    <li>
                        <Link to="/Authorization">
                            <span className="icon">
                                <ion-icon name="skull-outline"></ion-icon>
                            </span>
                            <span className="title">Авторизация</span>
                        </Link>
                    </li>
                    <div className="toggle"></div>
                </ul>
            </div>
            <div className="topbar">
                <Input
                    setId="inputGlobalSearch"
                    logo={<ion-icon name="search-outline"></ion-icon>}
                    name="Поиск"
                    onBlur={Search}
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            Search(e);
                        }
                    }}
                />
                <Button setId="btnBack" name="Назад" />
            </div>
            <ToolsMenu />
            <HappyBirthdayClients />
            <ProblemBook />
            <LiveTape />
        </div>
    );
}

export { SideBar };
