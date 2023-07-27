import { useEffect, useState } from "react";
import { Button } from "../components/Elements/Button";
import { getSellsDepartment, oneForAll } from "../Api";
import { Select } from "../components/Elements/Select";
import { Table } from "../components/Elements/Table";
import { PopUpRedactorManagers } from "../components/Staff/PopUpRedactorManagers";
import { PopUpRegManagers } from "../components/Staff/PopUpRegManagers";
import { InfoPopUp } from "../components/Service/InfoPopUp";
import { Link, useNavigate } from "react-router-dom";
import { CustomContext } from "../components/Service/Context";
import { useContext } from "react";

function Staff() {
    const [loader, setLoader] = useState([]);
    const [managers, setManagers] = useState([]);
    const [sd, setSd] = useState([]);
    const [currentPageStuff, setCurrentPageStuff] = useState();
    const [currentManagers, setCurrentManagers] = useState();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(false);
    const values =
        "last_name,first_name,middle_name,department__name,active_display,id";
    let prevScrollTop = 0;
    let managersHeaderArray = [
        "Фамилия",
        "Имя",
        "Отчество",
        "Отдел продаж",
        "Статус",
        "ID",
    ];
    const navigate = useNavigate();
    const { admin } = useContext(CustomContext);
    if (!admin) {
        navigate(-1);
    }
    useEffect(() => {
        filtrManagersSelects();
        getSellsDepartment().then((data) => {
            if (data.error) {
                InfoPopUp(data.error, "popup__Info_red");
            } else {
                setSd(data);
            }
        });
        let list = document.querySelectorAll(".navigation ul li");
        list.forEach((item) => {
            item.classList.remove("hovered");
        });
        list[9].classList.add("hovered");
    }, []);
    /*Функция отрисовки popUp редактирование менеджера*/
    function showRegManagers() {
        setUser(true);
    }
    /*Функция фильтра менеджеров*/
    function filtrManagersSelects() {
        setLoader(true);
        let stuffSdSelect = document.getElementById("stuffSdSelect");
        let link = "";
        if (stuffSdSelect && stuffSdSelect.value != "") {
            link = link + `&sales_department=${stuffSdSelect.value}`;
        }
        oneForAll(values, "user", undefined, link).then((data) => {
            if (data.error) {
                InfoPopUp(data.error, "popup__Info_red");
            } else {
                setManagers(data.results);
                if (data.next_page) {
                    setCurrentPageStuff(data.next_page);
                } else {
                    setCurrentPageStuff();
                }
                setLoader(false);
            }
        });
    }
    /*Фунуция скроллинга для таблицы менеджеров*/
    const scrollHandler = (
        e,
        currentPageStuff,
        setCurrentPageStuff,
        loading,
        setLoading,
        setManagers
    ) => {
        if (e.target.scrollTop === prevScrollTop) {
            return;
        }
        if (
            e.target.scrollHeight -
                (e.target.scrollTop + e.target.offsetHeight) <
                5 &&
            currentPageStuff &&
            !loading
        ) {
            setLoading(true);
            let next = currentPageStuff;
            oneForAll(undefined, undefined, next, undefined).then((data) => {
                if (data.error) {
                    InfoPopUp(data.error, "popup__Info_red");
                } else {
                    setManagers((prevState) => [...prevState, ...data.results]);
                    if (data.next_page) {
                        setCurrentPageStuff(data.next_page);
                    } else {
                        setCurrentPageStuff();
                    }
                    setLoading(false);
                }
            });
        }
    };
    /*Функция клика по строке таблицы и получения конкретного менеджера*/
    function showManager(item) {
        setCurrentManagers(item);
    }

    return (
        <div>
            {user === true ? (
                <PopUpRegManagers sd={sd} setUser={setUser} />
            ) : (
                <></>
            )}
            {currentManagers ? (
                <PopUpRedactorManagers
                    sd={sd}
                    setCurrentManagers={setCurrentManagers}
                    currentManagers={currentManagers}
                />
            ) : (
                <></>
            )}
            <div className="container__header">
                <Select
                    onChange={filtrManagersSelects}
                    setId="stuffSdSelect"
                    options={sd}
                    style="input__M"
                    name="Отдел продаж"
                />
                <Button
                    style="button_green"
                    onClick={showRegManagers}
                    name="Добавить менеджера"
                />
                {admin === true ? (
                    <Link to="/ReportCard">
                        <Button style="button_green" name="Табель" />
                    </Link>
                ) : (
                    <></>
                )}
            </div>
            <div className="container__table_widthAuto">
                <Table
                    header={managersHeaderArray}
                    loader={loader}
                    scrollHandler={scrollHandler}
                    setLoading={setLoading}
                    currentPage={currentPageStuff}
                    setCurrentPage={setCurrentPageStuff}
                    title="Менеджеры"
                    setData={setManagers}
                    style="container__table_basepolicy"
                    props={managers}
                    loading={loading}
                    onClick={showManager}
                />
            </div>
        </div>
    );
}
export { Staff };
