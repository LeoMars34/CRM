import { useEffect, useState } from "react";
import { Input } from "../components/Elements/Input";
import {
    addBanks,
    addChannels,
    addCompanies,
    addSd,
    addtypePolicys,
    getBanks,
    getChannels,
    getCompaniesL,
    getSellsDepartment,
    getTypiesPolicies,
    redactorBanks,
    redactorChannels,
    redactorCompanies,
    redactorSd,
    redactortypePolicys,
} from "../Api";
import { InfoPopUp } from "../components/Service/InfoPopUp";

function Administration() {
    const [type, setType] = useState([]);
    const [channels, setChannels] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [bank, setBank] = useState([]);
    const [sd, setSd] = useState([]);
    useEffect(() => {
        getTypiesPolicies().then((data) => {
            if (data.error) {
                InfoPopUp(data.error, "popup__Info_red");
            } else {
                setType(data);
            }
        });
        getChannels().then((data) => {
            if (data.error) {
                InfoPopUp(data.error, "popup__Info_red");
            } else {
                setChannels(data);
            }
        });
        getCompaniesL().then((data) => {
            if (data.error) {
                InfoPopUp(data.error, "popup__Info_red");
            } else {
                setCompanies(data);
            }
        });
        getBanks().then((data) => {
            if (data.error) {
                InfoPopUp(data.error, "popup__Info_red");
            } else {
                setBank(data);
            }
        });
        getSellsDepartment().then((data) => {
            if (data.error) {
                InfoPopUp(data.error, "popup__Info_red");
            } else {
                setSd(data);
            }
        });

        let list = document.querySelectorAll(".navigation li");
        list.forEach((item) => {
            item.classList.remove("hovered");
        });
        list[10].classList.add("hovered");
    }, []);
    /*Добавление нового типа полиса*/
    function addType() {
        let name = document.getElementById("addTypeAdministration").value;
        addtypePolicys(name).then((response) => {
            if (response.error) {
                InfoPopUp(response.error, "popup__Info_red");
            }
        });
    }
    /*Добавление нового канала продаж*/
    function addChannel() {
        let name = document.getElementById("addChannelsAdministration").value;
        addChannels(name).then((response) => {
            if (response.error) {
                InfoPopUp(response.error, "popup__Info_red");
            }
        });
    }
    /*Добавление новой компании*/
    function addCompanie() {
        let name = document.getElementById("addCompanieAdministration").value;
        addCompanies(name).then((response) => {
            if (response.error) {
                InfoPopUp(response.error, "popup__Info_red");
            }
        });
    }
    /*Добавление нового банка*/
    function addBank() {
        let name = document.getElementById("addBankAdministration").value;
        addBanks(name).then((response) => {
            if (response.error) {
                InfoPopUp(response.error, "popup__Info_red");
            }
        });
    }
    /*Добавление нового отдела продаж*/
    function addSD() {
        let name = document.getElementById("addSdAdministration").value;
        addSd(name).then((response) => {
            if (response.error) {
                InfoPopUp(response.error, "popup__Info_red");
            }
        });
    }
    /*Редактирование типа полиса*/
    function editType(e) {
        let name = e.target.value;
        redactortypePolicys(name).then((response) => {
            if (response.error) {
                InfoPopUp(response.error, "popup__Info_red");
            }
        });
    }
    /*Редактирование канала продаж*/
    function editChannel(e) {
        let name = e.target.value;
        redactorChannels(name).then((response) => {
            if (response.error) {
                InfoPopUp(response.error, "popup__Info_red");
            }
        });
    }
    /*Редактирование компании*/
    function editCompanie(e) {
        let name = e.target.value;
        redactorCompanies(name).then((response) => {
            if (response.error) {
                InfoPopUp(response.error, "popup__Info_red");
            }
        });
    }
    /*Редактирование банка*/
    function editBank(e) {
        let name = e.target.value;
        redactorBanks(name).then((response) => {
            if (response.error) {
                InfoPopUp(response.error, "popup__Info_red");
            }
        });
    }
    /*Редактирование отдела продаж*/
    function editSD(e) {
        let name = e.target.value;
        redactorSd(name).then((response) => {
            if (response.error) {
                InfoPopUp(response.error, "popup__Info_red");
            }
        });
    }

    return (
        <div className="main">
            <>
                <div className="administration__container">
                    <div className="administration__content">
                        <h3>Тип полиса</h3>
                        {type ? (
                            type.map((t) => (
                                <Input
                                    onBlur={editType}
                                    onKeyDown={(e) => {
                                        if (e.keyCode === 13) {
                                            editType(e);
                                        }
                                    }}
                                    value={t.name}
                                    name="Тип полиса"
                                    style="input__M "
                                />
                            ))
                        ) : (
                            <></>
                        )}
                        <Input
                            setId="addTypeAdministration"
                            style="input__M"
                            name="Добавить"
                            onKeyDown={(e) => {
                                if (e.keyCode === 13) {
                                    addType();
                                }
                            }}
                        />
                    </div>
                    <div className="administration__content">
                        {" "}
                        <h3>Канал продаж</h3>
                        {channels ? (
                            channels.map((c) => (
                                <Input
                                    onBlur={editChannel}
                                    onKeyDown={(e) => {
                                        if (e.keyCode === 13) {
                                            editChannel(e);
                                        }
                                    }}
                                    value={c.name}
                                    name="Канал продаж"
                                    style="input__M"
                                />
                            ))
                        ) : (
                            <></>
                        )}
                        <Input
                            setId="addChannelsAdministration"
                            style="input__M"
                            name="Добавить"
                            onKeyDown={(e) => {
                                if (e.keyCode === 13) {
                                    addChannel();
                                }
                            }}
                        />
                    </div>
                    <div className="administration__content">
                        {" "}
                        <h3>Компания</h3>
                        {companies ? (
                            companies.map((k) => (
                                <Input
                                    onBlur={editCompanie}
                                    onKeyDown={(e) => {
                                        if (e.keyCode === 13) {
                                            editCompanie(e);
                                        }
                                    }}
                                    value={k.name}
                                    name="Компания"
                                    style="input__M"
                                />
                            ))
                        ) : (
                            <></>
                        )}
                        <Input
                            setId="addCompanieAdministration"
                            style="input__M"
                            name="Добавить"
                            onKeyDown={(e) => {
                                if (e.keyCode === 13) {
                                    addCompanie();
                                }
                            }}
                        />
                    </div>
                    <div className="administration__content">
                        <h3>Банк</h3>
                        {bank ? (
                            bank.map((b) => (
                                <Input
                                    onBlur={editBank}
                                    onKeyDown={(e) => {
                                        if (e.keyCode === 13) {
                                            editBank(e);
                                        }
                                    }}
                                    value={b.name}
                                    name="Банк"
                                    style="input__M"
                                />
                            ))
                        ) : (
                            <></>
                        )}
                        <Input
                            setId="addBankAdministration"
                            style="input__M"
                            name="Добавить"
                            onKeyDown={(e) => {
                                if (e.keyCode === 13) {
                                    addBank();
                                }
                            }}
                        />
                    </div>
                    <div className="administration__content">
                        <h3>Отдел продаж</h3>

                        {sd ? (
                            sd.map((s) => (
                                <Input
                                    onBlur={editSD}
                                    onKeyDown={(e) => {
                                        if (e.keyCode === 13) {
                                            editSD(e);
                                        }
                                    }}
                                    value={s.name}
                                    name="Отдел продаж"
                                    style="input__M "
                                />
                            ))
                        ) : (
                            <></>
                        )}
                        <Input
                            setId="addSdAdministration"
                            style="input__M"
                            name="Добавить"
                            onKeyDown={(e) => {
                                if (e.keyCode === 13) {
                                    addSD();
                                }
                            }}
                        />
                    </div>
                </div>
            </>
        </div>
    );
}
export { Administration };
