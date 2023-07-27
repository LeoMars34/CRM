import { useEffect, useState, useContext } from "react";
import { getClientsBirthday, getManagers } from "../../Api";
import { PopUpClientsBirhday } from "./PopUpClientsBirhday";
import { CustomContext } from "../Service/Context";
import { InfoPopUp } from "../Service/InfoPopUp";

function HappyBirthdayClients({ setClientsBirhday, clientsBirhday }) {
    const [clientsBirhdayCount, setClientsBirhdayCount] = useState([]);
    const [managerss, setManagerss] = useState([]);
    const { admin } = useContext(CustomContext);
    useEffect(() => {
        getClientsBirthday().then((data) => {
            if (data.error) {
                InfoPopUp(data.error, "popup__Info_red");
            } else {
                setClientsBirhdayCount(data.clients);
            }
        });
        {
            admin ? (
                getManagers().then((data) => {
                    if (data.error) {
                        InfoPopUp(data.error, "popup__Info_red");
                    } else {
                        setManagerss(data);
                    }
                })
            ) : (
                <></>
            );
        }
    }, []);
    if (managerss.length > 0) {
        managerss.forEach((user, i) => {
            managerss[i]["name"] = `${user.first_name} ${user.last_name}`;
        });
    }

    return (
        <>
            <div id="HappyBirthdayClients" className="HappyBirthdayClients">
                <ul>
                    {clientsBirhdayCount.length > 0 ? (
                        clientsBirhdayCount.map((item) => (
                            <li
                                onClick={(e) => {
                                    setClientsBirhday(
                                        Object.values(item)[0].data
                                    );
                                }}
                            >
                                {Object.keys(item)[0]}{" "}
                                <div className="clientsBirhday">
                                    {Object.values(item)[0].count}
                                </div>
                            </li>
                        ))
                    ) : (
                        <></>
                    )}
                </ul>
            </div>
            {clientsBirhday ? (
                <PopUpClientsBirhday
                    clientsBirhday={clientsBirhday}
                    setClientsBirhday={setClientsBirhday}
                    managerss={managerss}
                />
            ) : (
                <> </>
            )}
        </>
    );
}

export { HappyBirthdayClients };
