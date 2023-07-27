import { useEffect, useState, useContext } from "react";
import { Button } from "../components/Elements/Button";
import { Input } from "../components/Elements/Input";
import { Select } from "../components/Elements/Select";
import {
    getBanks,
    getMortageStatistic,
    getMortageWeekStatistic,
    mortgageApplication,
    unloadMortage,
} from "../Api";
import { CustomContext } from "../components/Service/Context";
import { StackedBarYear } from "../components/Elements/StackedBarYear";
import { InfoPopUp } from "../components/Service/InfoPopUp";
import { StackedBarManagers } from "../components/Elements/StackedBarManagers";

function Mortage() {
    const [banks, setBanks] = useState([]);
    const [mortageStatistic, setMortageStatistic] = useState();
    const [mortageWeekStatistic, setMortageWeekStatistic] = useState();
    const { admin } = useContext(CustomContext);

    /*Статичные селекты*/
    const risk = [
        { id: "all", name: "Все риски" },
        { id: "property", name: "Имущество" },
        { id: "life", name: "Жизнь" },
    ];
    const year = [
        { id: "2023", name: "2023" },
        { id: "2024", name: "2024" },
    ];
    const mounth = [
        { id: "01", name: "Январь" },
        { id: "02", name: "Февраль" },
        { id: "03", name: "Март" },
        { id: "04", name: "Апрель" },
        { id: "05", name: "Май" },
        { id: "06", name: "Июнь" },
        { id: "07", name: "Июль" },
        { id: "08", name: "Август" },
        { id: "09", name: "Сентябрь" },
        { id: "10", name: "Октябрь" },
        { id: "11", name: "Ноябрь" },
        { id: "12", name: "Декабрь" },
    ];
    /*Функция созддания заявки на ипотеку*/
    function addMortgageApplication(e) {
        const popUp = e.target.closest(".mortage__content");
        popUp
            .querySelectorAll(".requared select, .requared input")
            .forEach((item) => {
                if (item.value == "") {
                    item.classList.add("red_border");
                } else {
                    item.classList.remove("red_border");
                }
            });
        if (popUp.querySelectorAll(".red_border").length > 0) {
            InfoPopUp("ПОЛЯ ОБЯЗАТЕЛЬНЫЕ ДЛЯ ЗАПОЛНЕНИЯ", "popup__Info_red");
            return;
        } else {
            let formData = new FormData();
            let mortageBanks_id = document.getElementById(
                "pageMortageBanks_id"
            ).value;
            let mortageRisk_id =
                document.getElementById("pageMortageRisk_id").value;
            let mortageMounth_id = document.getElementById(
                "pageMortageMounth_id"
            ).value;
            let mortageYear_id =
                document.getElementById("pageMortageYear_id").value;
            let mortageFio_id =
                document.getElementById("pageMortageFio_id").value;
            let mortageBirthday_id = document.getElementById(
                "pageMortageBirthday_id"
            ).value;
            let mortagePhone_id = document.getElementById(
                "pageMortagePhone_id"
            ).value;
            let mortageEmail_id = document.getElementById(
                "pageMortageEmail_id"
            ).value;
            formData.append("bank", mortageBanks_id);
            formData.append("type_policy_mortgage", mortageRisk_id);
            formData.append("month", mortageMounth_id);
            formData.append("year", mortageYear_id);
            formData.append("full_name", mortageFio_id);
            formData.append("birthday", mortageBirthday_id);
            formData.append("phone", mortagePhone_id);
            formData.append("email", mortageEmail_id);
            mortgageApplication(formData).then((response) => {
                if (response.error) {
                    InfoPopUp(response.error, "popup__Info_red");
                }
            });
        }
    }
    useEffect(() => {
        getMortageStatistic().then((data) => {
            if (data.error) {
                InfoPopUp(data.error, "popup__Info_red");
            } else {
                setMortageStatistic(data);
            }
        });
        getMortageWeekStatistic().then((data) => {
            if (data.error) {
                InfoPopUp(data.error, "popup__Info_red");
            } else {
                setMortageWeekStatistic(data);
            }
        });
        getBanks().then((data) => {
            if (data.error) {
                InfoPopUp(data.error, "popup__Info_red");
            } else {
                setBanks(data);
            }
        });
    }, []);

    /*Выгрузка заявок*/
    function unloadMortages(e) {
        const popUp = e.target.closest(".mortage__content");
        popUp
            .querySelectorAll(".requared select, .requared input")
            .forEach((item) => {
                if (item.value == "") {
                    item.classList.add("red_border");
                } else {
                    item.classList.remove("red_border");
                }
            });
        if (popUp.querySelectorAll(".red_border").length > 0) {
            InfoPopUp("ПОЛЯ ОБЯЗАТЕЛЬНЫЕ ДЛЯ ЗАПОЛНЕНИЯ", "popup__Info_red");
            return;
        } else {
            let formData = new FormData();
            let uploadMortageBanks =
                document.getElementById("uploadMortageBanks").value;
            let uploadMortageMonthEnds = document.getElementById(
                "uploadMortageMonthEnds"
            ).value;
            let uploadMortageYearEnds = document.getElementById(
                "uploadMortageYearEnds"
            ).value;
            let uploadMortageAddAfter = document.getElementById(
                "uploadMortageAddAfter"
            ).value;
            if (uploadMortageBanks && uploadMortageBanks !== "") {
                formData.append("bank", uploadMortageBanks);
            }
            if (uploadMortageMonthEnds && uploadMortageMonthEnds !== "") {
                formData.append("month", uploadMortageMonthEnds);
            }
            if (uploadMortageYearEnds && uploadMortageYearEnds !== "") {
                formData.append("year", uploadMortageYearEnds);
            }
            if (uploadMortageAddAfter && uploadMortageAddAfter !== "") {
                formData.append("date_at", uploadMortageAddAfter);
            }
            unloadMortage(formData).then((response) => {
                if (response.error) {
                    InfoPopUp(response.error, "popup__Info_red");
                } else {
                    const url = window.URL.createObjectURL(response);
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute("download", "policy.xlsx");
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            });
        }
    }
    return (
        <div>
            <div className="mortage__contener">
                <div className="mortage__content">
                    <h3 style={{ borderBottom: "thick double var(--dark)" }}>
                        Заявка на ипотеку
                    </h3>
                    <Select
                        options={banks}
                        setId="pageMortageBanks_id"
                        style="input__L requared"
                        name="Банк"
                    />
                    <Select
                        options={risk}
                        setId="pageMortageRisk_id"
                        style="input__L requared"
                        name="Риски"
                    />
                    <Select
                        options={mounth}
                        setId="pageMortageMounth_id"
                        style="input__L requared"
                        name="Месяц окончания"
                    />

                    <Select
                        options={year}
                        setId="pageMortageYear_id"
                        style="input__L requared"
                        name="Год окончания"
                    />
                    <Input
                        setId="pageMortageFio_id"
                        style="input__L requared"
                        name="ФИО"
                        Fio="Fio"
                    />
                    <Input
                        setId="pageMortageBirthday_id"
                        style="input__L requared"
                        name="Дата Рождения"
                        Birthday="Birthday"
                    />
                    <Input
                        setId="pageMortagePhone_id"
                        style="input__L requared"
                        name="Телефон"
                        Phone="Phone"
                    />
                    <Input
                        setId="pageMortageEmail_id"
                        style="input__L"
                        name="Почта"
                        Email="Email"
                    />
                    <div>
                        <Button
                            onClick={addMortgageApplication}
                            style="button_green"
                            name="Создать"
                        />
                    </div>
                </div>
                <div className="mortageDiagramm">
                    {mortageStatistic ? (
                        <StackedBarYear statistics={mortageStatistic} />
                    ) : (
                        <></>
                    )}
                    {mortageWeekStatistic && admin === true ? (
                        <StackedBarManagers statistics={mortageWeekStatistic} />
                    ) : (
                        <></>
                    )}
                </div>
                {admin === true ? (
                    <div className="mortage__content">
                        <h3
                            style={{ borderBottom: "thick double var(--dark)" }}
                        >
                            Выгрузка заявок
                        </h3>
                        <Select
                            setId="uploadMortageBanks"
                            style="input__L requared"
                            options={banks}
                            name="Банк"
                        />
                        <Select
                            setId="uploadMortageMonthEnds"
                            style="input__L requared"
                            options={mounth}
                            name="Месяц окончания"
                        />
                        <Select
                            setId="uploadMortageYearEnds"
                            style="input__L requared"
                            options={year}
                            name="Год окончания"
                        />
                        <Input
                            setId="uploadMortageAddAfter"
                            style="input__L requared"
                            Date={Date}
                            name="Добавлены после"
                        />
                        <div>
                            <Button
                                onClick={unloadMortages}
                                style="button_green"
                                name="Выгрузить"
                            />
                        </div>
                    </div>
                ) : (
                    <></>
                )}
                {admin === true ? (
                    <div className="mortage__content">
                        <h3
                            style={{ borderBottom: "thick double var(--dark)" }}
                        >
                            Администрирование
                        </h3>
                        <div>
                            <Button style="button_green" name="Пересчитать" />
                            <Button style="button_green" name="Дубликаты" />
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}
export { Mortage };
