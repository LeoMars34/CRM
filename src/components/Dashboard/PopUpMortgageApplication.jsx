import { mortgageApplication } from "../../Api";
import { Button } from "../Elements/Button";
import { Input } from "../Elements/Input";
import { Select } from "../Elements/Select";
import { InfoPopUp } from "../Service/InfoPopUp";

function PopUpMortgageApplication({ setMortage, banks, currentDeal }) {
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
        const popUp = e.target.closest(".main__container");
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
            let mortageBanks_id =
                document.getElementById("mortageBanks_id").value;
            let mortageRisk_id =
                document.getElementById("mortageRisk_id").value;
            let mortageMounth_id =
                document.getElementById("mortageMounth_id").value;
            let mortageYear_id =
                document.getElementById("mortageYear_id").value;
            let mortageFio_id = document.getElementById("mortageFio_id").value;
            let mortageBirthday_id =
                document.getElementById("mortageBirthday_id").value;
            let mortagePhone_id =
                document.getElementById("mortagePhone_id").value;
            let mortageEmail_id =
                document.getElementById("mortageEmail_id").value;
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
    /*Функция закрытия popUp заявки на ипотеку*/
    function closePopUp(e) {
        {
            if (!e.target.closest(".content__PopUp_CreateDeal")) {
                setMortage(false);
            }
        }
    }
    return (
        <div onClick={closePopUp} className="main__container">
            <div className="content__PopUp_CreateDeal">
                <h3 style={{ borderBottom: "thick double var(--dark)" }}>
                    Заявка на ипотеку
                </h3>
                <Select
                    options={banks}
                    setId="mortageBanks_id"
                    style="input__L requared"
                    name="Банк"
                />
                <Select
                    options={risk}
                    setId="mortageRisk_id"
                    style="input__L requared"
                    name="Риски"
                />
                <Select
                    options={mounth}
                    setId="mortageMounth_id"
                    style="input__L requared"
                    name="Месяц окончания"
                />

                <Select
                    options={year}
                    setId="mortageYear_id"
                    style="input__L requared"
                    name="Год окончания"
                />
                <Input
                    setId="mortageFio_id"
                    style="input__L requared"
                    name="ФИО"
                    Fio="Fio"
                    value={currentDeal.policy.policyholder.full_name}
                />
                <Input
                    setId="mortageBirthday_id"
                    style="input__L requared"
                    name="Дата Рождения"
                    Birthday="Birthday"
                    value={currentDeal.policy.policyholder.birthday}
                />
                <Input
                    setId="mortagePhone_id"
                    style="input__L requared"
                    name="Телефон"
                    Phone="Phone"
                    value={currentDeal.policy.policyholder.phone}
                />
                <Input
                    setId="mortageEmail_id"
                    style="input__L"
                    name="Почта"
                    Email="Email"
                    value={currentDeal.policy.policyholder.email}
                />
                <div>
                    <Button
                        onClick={addMortgageApplication}
                        style="button_green"
                        name="Создать"
                    />
                </div>
            </div>
        </div>
    );
}
export { PopUpMortgageApplication };
