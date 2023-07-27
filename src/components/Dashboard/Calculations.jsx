import { Input } from "../Elements/Input";
import { Select } from "../Elements/Select";
import { Button } from "../Elements/Button";
import { addCalc, deleteCalc, getCalc } from "../../Api";
import { InfoPopUp } from "../Service/InfoPopUp";

function Calculations({
    companiesL,
    deal,
    currentDeal,
    setCalculations,
    setCurrentDeal,
}) {
    /*Функция создания рассчётов*/
    function createCalc() {
        if (document.getElementById("selectCompaniesL")) {
            let companies_option =
                document.getElementById("selectCompaniesL").value;
            let sum = document.getElementById("inputSum").value;
            addCalc(deal, companies_option, sum).then((response) => {
                if (response.error) {
                    InfoPopUp(response.error, "popup__Info_red");
                } else {
                    getCalc(`?deal=${deal}`).then((data) => {
                        if (data.error) {
                            InfoPopUp(data.error, "popup__Info_red");
                        } else {
                            setCurrentDeal({
                                ...currentDeal,
                                calcs: data.results,
                            });
                        }
                    });
                }
            });
        }
    }
    /*Функция удаления рассчётов*/
    function deleteCalcs(e, id) {
        deleteCalc(id).then((response) => {
            if (response.error) {
                InfoPopUp(response.error, "popup__Info_red");
            } else {
                getCalc(`?deal=${deal}`).then((data) => {
                    if (data.error) {
                        InfoPopUp(data.error, "popup__Info_red");
                    } else {
                        setCurrentDeal({ ...currentDeal, calcs: data.results });
                    }
                });
            }
        });
    }
    /*Функция закрытия рассчётов */
    function closeCalculation() {
        setCalculations(false);
    }

    return (
        <div className="container__Calculations">
            <div className="content__Calculations">
                <h3 style={{ borderBottom: "thick double var(--dark)" }}>
                    Рассчёты
                </h3>
                <div className="list__Calculations">
                    {currentDeal.calcs[0]
                        ? currentDeal.calcs.map((item) => (
                              <div className="list__Calculations_div">
                                  {item.company.name} {item.value}{" "}
                                  <div
                                      onClick={(e) => {
                                          deleteCalcs(e, item.id);
                                      }}
                                      className="trash-outline"
                                  >
                                      <ion-icon name="trash-outline"></ion-icon>
                                  </div>
                              </div>
                          ))
                        : ""}
                </div>
                <div className="container__PopUp_Tools">
                    <Select
                        setId="selectCompaniesL"
                        name="Компания"
                        options={companiesL}
                        style="input__S"
                    />
                    <Input
                        setId="inputSum"
                        step="0.1"
                        type="number"
                        style="input__XS"
                        name="Сумма"
                    />
                </div>
                <div className="container__PopUp_Tools">
                    <Button
                        onClick={createCalc}
                        name="Создать"
                        style="button_green"
                    />
                    <Button
                        onClick={closeCalculation}
                        name="Отмена"
                        style="button_red"
                    />
                </div>
            </div>
        </div>
    );
}
export { Calculations };
