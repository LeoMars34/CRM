import { useContext } from "react";
import { Select } from "../Elements/Select";
import { CustomContext } from "../Service/Context";

function PopUpClientsBirhday({ clientsBirhday, managerss, setClientsBirhday }) {
    const { admin } = useContext(CustomContext);
    function whatsUpHB(full_name, phone, managers) {
        let name = full_name.split(" ").slice(1).join(" ");
        let manager = managers.split(" ")[2];
        window.open(
            `https://web.whatsapp.com/send?phone=7${phone}&text=${name}, Добрый день! Поздравляю Вас с Днём Рождения! Пусть сбудется всё, что входит в Ваши планы. Жизнь открывает новые горизонты, а каждый день приносит положительные эмоции и яркие впечатления. Крепкого здоровья Вам и Вашим близким. С уважением, ${manager}, страховой центр InsFamily.,
                "_blank"`
        );
    }
    /*Функция закрытия popUp*/
    function closePopUp(e) {
        if (!e.target.closest(".content__PopUp_CreateDeal")) {
            setClientsBirhday();
        }
    }
    console.log(clientsBirhday);
    return (
        <div onClick={closePopUp} className="main__container">
            <div>
                <table className="table">
                    <thead className="table__thead">
                        <tr>
                            <th>ФИО клиента</th>
                            <th>Дата рождения</th>
                            <th>Телефон</th>
                            <th>Менеджер</th>
                            {admin ? <th>Ответственный</th> : <></>}
                        </tr>
                    </thead>
                    <tbody>
                        {clientsBirhday ? (
                            clientsBirhday.map((client) => (
                                <tr className="trTableSales">
                                    <td>{client.full_name}</td>
                                    <td>{client.birthday}</td>
                                    <td
                                        className="green__hover"
                                        onClick={() => {
                                            whatsUpHB(
                                                client.full_name,
                                                client.phone,
                                                client.manager
                                            );
                                        }}
                                    >
                                        {client.phone}
                                    </td>
                                    <td>{client.manager}</td>
                                    {admin ? (
                                        <td>
                                            <Select options={managerss} />
                                        </td>
                                    ) : (
                                        <></>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <></>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export { PopUpClientsBirhday };
