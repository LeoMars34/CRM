import { useContext, useEffect } from "react";
import { addFunnels, getStages } from "../../Api";
import { CustomContext } from "../Service/Context";
import { InfoPopUp } from "../Service/InfoPopUp";

function Select_2({ options, setStage, setIdFunnel, idFunnel }) {
    const { admin } = useContext(CustomContext);
    useEffect(() => {
        if (document.getElementById("Select_2__text")) {
            document.getElementById("Select_2__text").onclick = () => {
                document.querySelector(".Select_2").classList.toggle("active");
                document.addEventListener("click", function eventClose(e) {
                    if (!e.target.closest(".Select_2")) {
                        document
                            .querySelector(".Select_2")
                            .classList.remove("active");
                        document.removeEventListener("click", eventClose);
                    }
                });
            };
        }
        if (localStorage.getItem("funnelId")) {
            document
                .querySelectorAll(".Select_2__Option_all")
                .forEach((item) => {
                    if (
                        item.attributes[0].value ==
                        localStorage.getItem("funnelId")
                    ) {
                        document.getElementById("Select_2__text").textContent =
                            item.textContent;
                    }
                });
        } else {
            document.getElementById("Select_2__text").textContent =
                document.querySelectorAll(".Select_2__Option")[0].textContent;
        }
    }, []);
    /*Функция закрыитя select_2 по клику вне его*/
    function R(e) {
        {
            if (!e.target.closest(".Select_2")) {
                document.querySelector(".Select_2").classList.remove("active");
            }
        }
    }
    function show(i, e) {
        if (document.querySelector(".Select_2__text")) {
            document.querySelector(".Select_2__text").textContent = i.name;
            localStorage.setItem("funnelId", e.target.attributes[1].value);
            document.querySelector(".Select_2").classList.toggle("active");
            setIdFunnel(i);
        }
    }
    function addSalesFunnel() {
        let funnelName = document.getElementById("addFunnelInput").value;
        addFunnels(funnelName).then((response) => {
            if (response.error) {
                InfoPopUp(response.error, "popup__Info_red");
            } else {
                getStages(idFunnel.id).then((data) => {
                    setStage(data);
                });
            }
        });
    }

    return (
        <div className="Select_2">
            <div id="Select_2__text" className="Select_2__text">
                {idFunnel ? idFunnel.name : ""}
            </div>
            <div className="Select_2__Option">
                {options
                    ? options.map((i) => (
                          <div
                              className="Select_2__Option_all"
                              onClick={(e) => {
                                  show(i, e);
                              }}
                              value={i.id}
                          >
                              {i.name}
                          </div>
                      ))
                    : ""}
                {admin === true ? (
                    <div className="input__select2">
                        <input
                            id="addFunnelInput"
                            style={{ outline: "none" }}
                            type="text"
                            placeholder="Добавить воронку"
                        />
                        <span onClick={addSalesFunnel} className="addVoronka">
                            <ion-icon name="checkmark-circle-outline"></ion-icon>
                        </span>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}
export { Select_2 };
