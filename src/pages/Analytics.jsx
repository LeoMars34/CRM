import { useEffect, useState } from "react";
import { getAnalytics, getFilterAnalytics } from "../Api";
import { AnalyticsDepartament } from "../components/Analytics/AnalyticsDepartament";
import { Input } from "../components/Elements/Input";
import { Loader } from "../components/Elements/Loader";
import { InfoPopUp } from "../components/Service/InfoPopUp";

function Analytics() {
    const [analytics, setAnalytics] = useState([]);
    const [loader, setLoader] = useState(false);
    const [dateValid, setDateValid] = useState(true);
    useEffect(() => {
        getAnalytics().then((data) => {
            if (data.error) {
                InfoPopUp(data.error, "popup__Info_red");
            } else {
                setAnalytics(data);
            }
        });
        let list = document.querySelectorAll(".navigation li");
        list.forEach((item) => {
            item.classList.remove("hovered");
        });
        list[5].classList.add("hovered");
    }, []);
    /*1 число текущего месяца */
    let today = new Date();
    today.setDate(1);
    let now = today.toLocaleDateString("ru-RU");
    /*Фильтрация аналиттики по селектам*/
    function filtrClientsSelects() {
        setLoader(true);
        if (!dateValid) {
            return;
        }
        let input__DepartmentWith = document.getElementById(
            "input__DepartmentWith"
        );
        let input__DepartmentBefore = document.getElementById(
            "input__DepartmentBefore"
        );
        let link = "";
        if (input__DepartmentWith && input__DepartmentWith.value != "") {
            link = link + `&date_start=${input__DepartmentWith.value}`;
        }
        if (input__DepartmentBefore && input__DepartmentBefore.value != "") {
            link = link + `&date_end=${input__DepartmentBefore.value}`;
        }
        if (link != "") {
            link = link.slice(1);
        }
        getFilterAnalytics(link).then((data) => {
            if (data.error) {
                InfoPopUp(data.error, "popup__Info_red");
            } else {
                setAnalytics(data);
                setLoader(false);
            }
        });
    }

    return (
        <div className="main">
            <div className="container__header">
                <Input
                    value={now}
                    Date="Date"
                    setId="input__DepartmentWith"
                    style="input__S"
                    name="Дата с"
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            filtrClientsSelects();
                        }
                    }}
                />
                <Input
                    Date="Date"
                    setId="input__DepartmentBefore"
                    style="input__S"
                    name="Дата по"
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            filtrClientsSelects();
                        }
                    }}
                />
            </div>
            {analytics.length > 0 ? (
                <div className="container__analytics">
                    {analytics.map((data) => (
                        <div>
                            <h2 className="depatmentsH2">
                                {data.sales_departments}
                            </h2>
                            <h3 className="depatmentsH2">{data.sum} &#8381;</h3>
                            <AnalyticsDepartament
                                setLoader={setLoader}
                                department={data}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <Loader />
            )}
            {loader == true ? <Loader /> : <></>}
        </div>
    );
}
export { Analytics };
