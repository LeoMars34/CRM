import { useEffect, useState } from "react";
import { Select } from "../components/Elements/Select";
import {
    addUserReportCard,
    changesSalaryTable,
    getClearUsers,
    getReportCard,
    getReportCardTableSalary,
} from "../Api";
import { Input } from "../components/Elements/Input";
import { Loader } from "../components/Elements/Loader";
import { Button } from "../components/Elements/Button";
import { InfoPopUp } from "../components/Service/InfoPopUp";
import { PopUpDeleteUser } from "../components/ReportCard/PopUpDeleteUser";

function ReportCard() {
    const [clearUsers, setClearUsers] = useState([]);
    const [reportCard, setReportCard] = useState();
    const [salary, setSalary] = useState([]);
    const [salary_2, setSalary_2] = useState([]);
    const [salary_3, setSalary_3] = useState([]);
    const [sum, setSum] = useState();
    const [deleteUserId, setDeleteUserId] = useState();

    useEffect(() => {
        getClearUsers().then((data) => {
            setClearUsers(data);
        });
        getReportCard().then((data) => {
            setReportCard(data.results);
            let id = data.results[0].id;
            getReportCardTableSalary(id).then((data) => {
                setSalary(data.response);
                setSalary_2(data.response_2);
                setSalary_3(data.response_3);
                data.sum_margin ? setSum(data) : <></>;
            });
        });
    }, []);
    if (clearUsers.length > 0) {
        clearUsers.forEach((user, i) => {
            clearUsers[i]["name"] = `${user.first_name} ${user.last_name}`;
        });
    }
    let arrTh = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
    ];
    function changeDateReportCard(e) {
        let id = e.target.value;
        getReportCardTableSalary(id).then((data) => {
            if (data.error) {
                InfoPopUp(data.error, "popup__Info_red");
            } else {
                setSalary(data.response);
                setSalary_2(data.response_2);
                setSalary_3(data.response_3);
            }
        });
    }
    function addUser() {
        let formData = new FormData();
        let tableId = document.getElementById("reportCardSelect").value;
        let managers = document.getElementById(
            "reportCardSelectManagers"
        ).value;
        formData.append("salary_table", tableId);
        formData.append("user", managers);
        addUserReportCard(formData).then((response) => {
            if (response.error) {
                InfoPopUp(response.error, "popup__Info_red");
            } else {
                InfoPopUp(response.message, "popup__Info_green");
            }
        });
    }
    function unisstallUser(e) {
        setDeleteUserId(e.currentTarget.parentNode.id);
    }
    function editSalary(e) {
        let id = e.currentTarget.parentNode.parentNode.id;
        console.log(id);
        let forData = new FormData();
        // changesSalaryTable(forData, id).then((response) => {});
    }
    return (
        <div>
            {deleteUserId ? (
                <PopUpDeleteUser
                    deleteUserId={deleteUserId ? deleteUserId : null}
                    setDeleteUserId={setDeleteUserId ? setDeleteUserId : null}
                />
            ) : (
                <></>
            )}
            <div className="content__SelsDocuments_inputs ">
                <Select
                    onChange={changeDateReportCard}
                    setId="reportCardSelect"
                    style="input__S"
                    options={reportCard}
                    name="Дата"
                    valueId={reportCard ? reportCard[0].id : <></>}
                />
            </div>
            <div className="content__SelsDocuments_inputs ">
                <Select
                    setId="reportCardSelectManagers"
                    style="input__S"
                    options={clearUsers}
                    name="Менеджеры"
                />
                <Button
                    onClick={addUser}
                    style="button_green"
                    name="Добавить"
                />
            </div>
            <div className="reportCardTable">
                <h2 className="heading">Менеджеры</h2>
                {salary_3.length < 0 ? (
                    <Loader />
                ) : (
                    <table className="table">
                        <thead className="table__thead">
                            <tr>
                                <th>Менеджер</th>
                                <th>Всего дней</th>
                                <th>Всего часов</th>
                                <th>Оклад</th>
                                <th>Рабочих дней</th>
                                <th>Часов в смене</th>
                                <th>Бонус</th>
                                <th>Всего оклад</th>
                                {sum ? <th>Маржа</th> : <></>}
                            </tr>
                        </thead>
                        <tbody>
                            {salary_3.length > 0 ? (
                                salary_3.map((spec) => (
                                    <tr
                                        id={spec.data.id}
                                        className="trTableSales"
                                    >
                                        <td style={{ pointerEvents: "none" }}>
                                            <Input
                                                style="input__M"
                                                value={spec.data.user.full_name}
                                            />
                                        </td>
                                        <td style={{ pointerEvents: "none" }}>
                                            <Input
                                                style="input__XS"
                                                value={spec.all_days}
                                            />
                                        </td>
                                        <td style={{ pointerEvents: "none" }}>
                                            <Input
                                                style="input__XS"
                                                value={spec.all_hours}
                                            />
                                        </td>
                                        <td>
                                            <Input
                                                onBlur={(e) => {
                                                    editSalary(e);
                                                }}
                                                style="input__XS"
                                                value={spec.data.salary}
                                            />
                                        </td>
                                        <td>
                                            <Input
                                                onBlur={(e) => {
                                                    editSalary(e);
                                                }}
                                                style="input__XS"
                                                value={spec.data.days}
                                            />
                                        </td>
                                        <td>
                                            <Input
                                                onBlur={(e) => {
                                                    editSalary(e);
                                                }}
                                                style="input__XS"
                                                value={spec.data.hours}
                                            />
                                        </td>
                                        <td>
                                            <Input
                                                onBlur={(e) => {
                                                    editSalary(e);
                                                }}
                                                style="input__XS"
                                                value={spec.data.bonus}
                                            />
                                        </td>
                                        <td style={{ pointerEvents: "none" }}>
                                            <Input
                                                style="input__XS"
                                                value={spec.all_salary}
                                            />
                                        </td>
                                        {sum ? (
                                            <td
                                                style={{
                                                    pointerEvents: "none",
                                                }}
                                            >
                                                <Input
                                                    style="input__XS"
                                                    value={spec.policies_sum}
                                                />
                                            </td>
                                        ) : (
                                            <></>
                                        )}
                                        <div
                                            onClick={(e) => {
                                                unisstallUser(e);
                                            }}
                                            className="deleteUserReportCard"
                                        >
                                            <ion-icon name="close-outline"></ion-icon>
                                        </div>
                                    </tr>
                                ))
                            ) : (
                                <></>
                            )}
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {sum ? sum.sum_bonus_3 : <></>}
                                </td>
                                <td
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {sum ? sum.sum_salary_3 : <></>}
                                </td>
                                <td
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {sum ? sum.sum_margin_3 : <></>}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </div>
            <div className="reportCardTable">
                <h2 className="heading">Back</h2>
                <table className="table">
                    <thead className="table__thead">
                        <tr>
                            <th>Менеджер</th>
                            <th>Всего дней</th>
                            <th>Всего часов</th>
                            <th>Оклад</th>
                            <th>Рабочих дней</th>
                            <th>Часов в смене</th>
                            <th>Всего оклад</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salary_2.length > 0 ? (
                            salary_2.map((spec) => (
                                <tr id={spec.data.id} className="trTableSales">
                                    <td style={{ pointerEvents: "none" }}>
                                        <Input
                                            style="input__M"
                                            value={spec.data.user.full_name}
                                        />
                                    </td>
                                    <td style={{ pointerEvents: "none" }}>
                                        <Input
                                            style="input__XS"
                                            value={spec.all_days}
                                        />
                                    </td>
                                    <td style={{ pointerEvents: "none" }}>
                                        <Input
                                            style="input__XS"
                                            value={spec.all_hours}
                                        />
                                    </td>
                                    <td>
                                        <Input
                                            onBlur={(e) => {
                                                editSalary(e);
                                            }}
                                            style="input__XS"
                                            value={spec.data.salary}
                                        />
                                    </td>
                                    <td>
                                        <Input
                                            onBlur={(e) => {
                                                editSalary(e);
                                            }}
                                            style="input__XS"
                                            value={spec.data.days}
                                        />
                                    </td>
                                    <td>
                                        <Input
                                            onBlur={(e) => {
                                                editSalary(e);
                                            }}
                                            style="input__XS"
                                            value={spec.data.hours}
                                        />
                                    </td>
                                    <td style={{ pointerEvents: "none" }}>
                                        <Input
                                            style="input__XS"
                                            value={spec.all_salary}
                                        />
                                    </td>
                                    <div
                                        onClick={(e) => {
                                            unisstallUser(e);
                                        }}
                                        className="deleteUserReportCard"
                                    >
                                        <ion-icon name="close-outline"></ion-icon>
                                    </div>
                                </tr>
                            ))
                        ) : (
                            <></>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="reportCardTable reportCardTable__scale">
                <h2 className="heading">Все сотрудники</h2>
                <table className="table">
                    <thead className="table__thead">
                        <tr>
                            <th>Сотрудник</th>
                            {arrTh.map((i) => (
                                <th>{i}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {salary.length > 0 ? (
                            salary.map((spec) => (
                                <tr className="trTableSales">
                                    <td>
                                        <Input
                                            style="input__M"
                                            value={spec.data.user.full_name}
                                        />
                                    </td>
                                    {arrTh.map((j) => (
                                        <td>
                                            {spec.hourse_data.some(
                                                (k) => k.day === j
                                            ) ? (
                                                spec.hourse_data.map((k) =>
                                                    k.day === j ? (
                                                        <Input
                                                            style="input__XSS"
                                                            value={k.hours}
                                                        />
                                                    ) : null
                                                )
                                            ) : (
                                                <Input style="input__XSS" /> // Возвращение пустого Input
                                            )}
                                        </td>
                                    ))}
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
export { ReportCard };
