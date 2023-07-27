import { deleteUserReportCard } from "../../Api";
import { Button } from "../Elements/Button";
import { InfoPopUp } from "../Service/InfoPopUp";

function PopUpDeleteUser({ deleteUserId, setDeleteUserId }) {
    function closePopUp(e) {
        {
            if (!e.target.closest(".content__PopUp_CreateDeal")) {
                setDeleteUserId(false);
            }
        }
    }
    function deleteUser() {
        deleteUserReportCard(deleteUserId).then((response) => {
            setDeleteUserId(false);
            if (response.error) {
                InfoPopUp(response.error, "popup__Info_red");
            } else {
                InfoPopUp(
                    "Менеджер успешно удалён из табеля",
                    "popup__Info_green"
                );
            }
        });
    }

    return (
        <div onClick={closePopUp} className="main__container">
            <div className="content__PopUp_CreateDeal">
                <h3>
                    Менеджер будет удалён из <br /> всех табелей, вы уверены?
                </h3>
                <div className="content__Acts">
                    <Button
                        onClick={deleteUser}
                        style="button_red"
                        name="Удалить"
                    />
                </div>
            </div>
        </div>
    );
}
export { PopUpDeleteUser };
