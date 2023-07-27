import { Input } from "../Elements/Input";
import { Button } from "../Elements/Button";
import { InputFile } from "../Elements/InputFile";
import { useEffect, useState } from "react";
import {
    addComments,
    addDiscription,
    getDeals,
    getManagersTelefony,
    redactorIpoteca,
    redactorPopUpDeal,
    redactorPopUpDealCars,
} from "../../Api";
import { ReasonForFailure } from "./ReasonForFailure";
import { Calculations } from "./Calculations";
import { Select } from "../Elements/Select";
import { PopUpNewDeal } from "./PopUpNewDeal";
import { PopUpMortgageApplication } from "./PopUpMortgageApplication";
import { InfoPopUp } from "../Service/InfoPopUp";

function PopUpDeal({
    currentDeal,
    setCurrentDeal,
    idFunnel,
    reasonForFailure,
    companiesL,
    setCalc,
    banks,
    insObjectRisk,
    sockets,
    setCalculations,
    calculations,
    setShowReasonForFailure,
    showReasonForFailure,
}) {
    const [showPopUp, setShowPopUp] = useState(false);
    const [mortage, setMortage] = useState(false);

    let deal = currentDeal.id;
    /*Редактирование сделок*/
    function redactorDeal(e, i) {
        let id = currentDeal.id;
        let value = e.target.value;
        let key = i;
        redactorPopUpDeal(key, value, id).then((data) => {
            if (data.error) {
                InfoPopUp(data.error, "popup__Info_red");
            }
        });
    }
    function redactorCars(e) {
        let carsId = currentDeal.policy.car.id;
        let key = e.target.id.split("-")[0];
        let value = e.target.value;
        redactorPopUpDealCars(carsId, key, value).then((response) => {
            if (response.error) {
                InfoPopUp(response.error, "popup__Info_red");
            }
        });
    }
    function redactorMortages(e) {
        let mortagesId = currentDeal.policy.ipoteka.id;
        let key = e.target.id.split("-")[0];
        let value = e.target.value;
        redactorIpoteca(mortagesId, key, value).then((response) => {
            if (response.error) {
                InfoPopUp(response.error, "popup__Info_red");
            }
        });
    }
    /*Функция отрисовки popUp новой сделки*/
    function showPopUpNewDeal() {
        setShowPopUp(true);
    }
    /*Функция отрисовки рассчётов*/
    function showPopUpCalculations() {
        setCalculations(true);
    }
    /*Функция отрисовки заявки на ипотеку*/
    function showPopUpMortage() {
        setMortage(true);
    }
    /*Функция отрисовки причин отказа*/
    function showPopUpReasonForFailure() {
        setShowReasonForFailure(true);
    }
    /*Склеиваем ФИО страхователя и задиваем в value input*/
    if (currentDeal.length > 0) {
        const current_deal = {
            fio: `${currentDeal[0].policy.policyholder.first_name} ${currentDeal[0].policy.policyholder.last_name} ${currentDeal[0].policy.policyholder.middle_name}`,
        };
        document.getElementById("popUpDealFioNew").value = current_deal.fio;
    }
    /*Добавление заметки*/
    function Discription() {
        let description = document.getElementById("textareaDiscription").value;
        let id = currentDeal.id;
        addDiscription(description, id).then((response) => {
            if (response.error) {
                InfoPopUp(response.error, "popup__Info_red");
            } else {
                sockets.send(
                    JSON.stringify({
                        type: "deals_upgrade",
                        deal_id: id,
                    })
                );
            }
            getDeals(idFunnel.id).then((data) => {
                if (data.error) {
                    InfoPopUp(data.error, "popup__Info_red");
                }
            });
        });
    }
    function addComment() {
        let comment_content = document.getElementById("inputAddComments").value;
        let deal_id = currentDeal.id;
        addComments(deal_id, comment_content).then((response) => {
            if (response.error) {
                InfoPopUp(response.error, "popup__Info_red");
            }
        });
    }
    function whatsUp() {
        let phone = currentDeal.policy.policyholder.phone;
        window.open(`https://web.whatsapp.com/send?phone=${phone}, "_blank"`);
    }
    function call() {
        getManagersTelefony(
            `call&user_id=SIP00NLIU00LIR@ip.beeline.ru&phone=89178452574`
        );
    }
    useEffect(() => {
        if (currentDeal.calcs[0]) {
            setCalculations(true);
        } else {
            setCalculations(false);
        }
        const fileInput = document.getElementById("popUp_InputFile");
        const fileList = document.getElementById("content__PopUp_files");
        if (fileInput) {
            fileInput.addEventListener("change", (event) => {
                fileList.innerHTML = "";
                const files = event.target.files;
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    const fileName = file.name;
                    const fileSizeBytes = file.size;
                    const fileSizeMB = fileSizeBytes / 1024 ** 2;
                    const fileSizeMBSlice = fileSizeMB.toFixed(2);
                    const listItem = document.createElement("div");
                    listItem.innerHTML = `${fileName} (${fileSizeMBSlice} mb)`;
                    fileList.appendChild(listItem);
                }
            });
        }
    }, []);
    /*Функция закрытия popUp*/
    function closePopUp(e) {
        {
            if (
                mortage !== true &&
                showPopUp !== true &&
                !e.target.closest(".main__flex, .content__Calculations")
            ) {
                setCurrentDeal();
            }
        }
    }
    return (
        <div onClick={closePopUp} className="main__container">
            {showPopUp == true ? (
                <PopUpNewDeal
                    setShowPopUp={setShowPopUp}
                    showPopUp={showPopUp}
                    currentDeal={currentDeal}
                />
            ) : (
                <></>
            )}
            {mortage == true ? (
                <PopUpMortgageApplication
                    banks={banks}
                    setMortage={setMortage}
                    currentDeal={currentDeal}
                />
            ) : (
                <></>
            )}
            <div className="main__flex">
                <div className="content__PopUp_Deal">
                    <div className="content__PopUp_header">
                        <p>{currentDeal.name}</p>
                        <p>{currentDeal.date_create}</p>
                    </div>
                    <div className="content__PopUp_comments"></div>
                    <div className="content__PopUp_AddComment">
                        <Input
                            setId="inputAddComments"
                            name="Добавить комментарий"
                        />
                        <Button
                            onClick={addComment}
                            style="button_green"
                            name={<ion-icon name="arrow-up-outline"></ion-icon>}
                        />
                    </div>
                    <div className="content__PopUp_discription">
                        <textarea
                            id="textareaDiscription"
                            className="textareaDiscription"
                            onBlur={Discription}
                        >
                            {currentDeal.description}
                        </textarea>
                    </div>
                    <div className="content__PopUp_DealInput right">
                        <Input
                            value={currentDeal.price}
                            name="Стоимость сделки"
                            onBlur={(e, i) => {
                                redactorDeal(e, "price");
                            }}
                        />
                        <Input
                            value={currentDeal.next_contact_date}
                            name="Дата выполнения"
                            onBlur={(e, i) => {
                                redactorDeal(e, "next_contact_date");
                            }}
                            Date="Date"
                        />
                        <Input
                            none="none"
                            value={currentDeal.policy.policyholder.full_name}
                            name="ФИО клиента"
                            Fio="Fio"
                        />
                        <Input
                            none="none"
                            setId="happyBithday"
                            divId="divHappyBirthdayClient"
                            name="Дата рождения клиента"
                            Birthday="Birthday"
                            value={currentDeal.policy.policyholder.birthday}
                        />
                        <Input
                            none="none"
                            divId="divPhoneClient"
                            setId="phoneClient"
                            name="Телефон клиента"
                            Phone="Phone"
                            whatsUp={whatsUp}
                            call={call}
                            ion_icon={
                                currentDeal.policy.policyholder.phone != ""
                                    ? "ion_icon"
                                    : undefined
                            }
                            value={
                                currentDeal.policy.policyholder.phone
                                    ? currentDeal.policy.policyholder.phone
                                    : ""
                            }
                        />
                        <Input
                            none="none"
                            divId="divEmailClient"
                            setId="emailClient"
                            name="Email Клиента"
                            Email="Email"
                            value={
                                currentDeal.policy.policyholder.email
                                    ? currentDeal.policy.policyholder.email
                                    : ""
                            }
                        />
                        <Input
                            none="none"
                            value={currentDeal.policy.policyholder.address}
                            name="Регион клиента"
                        />
                        <Input
                            none="none"
                            value={currentDeal.policy.type.name}
                            name="Тип полиса"
                        />
                        <Input
                            none="none"
                            value={currentDeal.policy.number}
                            name="Серия и номер полиса"
                        />
                        {currentDeal.policy.car ? (
                            <Input
                                setId="brand-Cars"
                                name="Объект страхования"
                                value={currentDeal.policy.car.brand}
                                onBlur={(e) => {
                                    redactorCars(e);
                                }}
                            />
                        ) : (
                            <></>
                        )}
                        {currentDeal.policy.ipoteka ? (
                            <Select
                                setId="obj-Ipoteka"
                                onChange={(e) => {
                                    redactorMortages(e);
                                }}
                                options={insObjectRisk}
                                style="input__XL"
                                first={
                                    currentDeal.policy.ipoteka ? (
                                        currentDeal.policy.ipoteka.obj
                                    ) : (
                                        <></>
                                    )
                                }
                            />
                        ) : (
                            <></>
                        )}
                        {currentDeal.policy.car ? (
                            <Input
                                setId="number-Cars"
                                onBlur={(e) => {
                                    redactorCars(e);
                                }}
                                name="Гос номер"
                                value={
                                    currentDeal.policy.car ? (
                                        currentDeal.policy.car.number
                                    ) : (
                                        <></>
                                    )
                                }
                            />
                        ) : (
                            <></>
                        )}
                        {currentDeal.policy.car ? (
                            <Input
                                setId="vin-Cars"
                                onBlur={(e) => {
                                    redactorCars(e);
                                }}
                                name="VIN"
                                value={
                                    currentDeal.policy.car ? (
                                        currentDeal.policy.car.vin
                                    ) : (
                                        <></>
                                    )
                                }
                            />
                        ) : (
                            <></>
                        )}
                        {currentDeal.policy.car ? (
                            <Input
                                setId="year-Cars"
                                onBlur={(e) => {
                                    redactorCars(e);
                                }}
                                name="Год выпуска"
                                value={
                                    currentDeal.policy.car ? (
                                        currentDeal.policy.car.year
                                    ) : (
                                        <></>
                                    )
                                }
                            />
                        ) : (
                            <></>
                        )}
                        {currentDeal.policy.ipoteka ? (
                            <Select
                                setId="bank-Ipoteka"
                                onChange={(e) => {
                                    redactorMortages(e);
                                }}
                                style="input__medium input__medium_xl"
                                options={banks}
                                name="БАНК"
                                first={
                                    currentDeal.policy.ipoteka ? (
                                        currentDeal.policy.ipoteka.bank.name
                                    ) : (
                                        <></>
                                    )
                                }
                            />
                        ) : (
                            <></>
                        )}
                        {currentDeal.policy.ipoteka ? (
                            <Input
                                setId="balance-Ipoteka"
                                onBlur={(e) => {
                                    redactorMortages(e);
                                }}
                                name="Остаток"
                                value={
                                    currentDeal.policy.ipoteka ? (
                                        currentDeal.policy.ipoteka.balance
                                    ) : (
                                        <></>
                                    )
                                }
                            />
                        ) : (
                            <></>
                        )}
                        <Input
                            none="none"
                            value={currentDeal.policy.date_end}
                            name="Дата окончания полиса"
                        />
                        <Input
                            none="none"
                            value={
                                currentDeal.policy.company
                                    ? currentDeal.policy.company.name
                                    : ""
                            }
                            name="Страховая компания"
                            Date="Date"
                        />
                        <Input
                            none="none"
                            setId="popUpDealFioNew"
                            name="ФИО страхователя"
                            value={
                                currentDeal.policy.policyholder_text
                                    ? currentDeal.policy.policyholder_text
                                    : ""
                            }
                        />
                        <Input none="none" name="Дополнительно" />
                    </div>
                    <div
                        id="content__PopUp_files"
                        className="content__PopUp_files"
                    ></div>
                    <div className="content__PopUp_InputFile">
                        <InputFile
                            setId="popUp_InputFile"
                            name="Загрузить файл"
                        />
                        <Button
                            onClick={showPopUpCalculations}
                            name="Расчёты"
                            style="button_green"
                        />
                        <Button
                            onClick={showPopUpNewDeal}
                            style="button_green"
                            name="Оплачено"
                        />
                        <Button
                            onClick={showPopUpMortage}
                            style="button_green"
                            name="Ипотека"
                        />
                        <Button
                            onClick={showPopUpReasonForFailure}
                            style="button_red"
                            name="В архив"
                        />
                    </div>
                </div>
                {showReasonForFailure === true ? (
                    <ReasonForFailure
                        setShowReasonForFailure={setShowReasonForFailure}
                        setCurrentDeal={setCurrentDeal}
                        reasonForFailure={reasonForFailure}
                        deal={deal}
                    />
                ) : (
                    <></>
                )}
            </div>
            {calculations == true ? (
                <Calculations
                    setCalculations={setCalculations}
                    setCalc={setCalc}
                    companiesL={companiesL}
                    deal={deal}
                    currentDeal={currentDeal}
                    setCurrentDeal={setCurrentDeal}
                />
            ) : (
                <></>
            )}
        </div>
    );
}
export { PopUpDeal };
