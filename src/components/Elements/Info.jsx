function Info() {
    function Info_PopUp_close() {
        const infoPopUp = document.querySelector(".popup__Info");
        infoPopUp.classList.remove("active");
    }
    return (
        <div className="container__flex">
            <div className="popup__Info">
                <div className="content__Info">
                    <ion-icon name="chatbox-ellipses-outline"></ion-icon>
                    <p></p>
                </div>
                <div onClick={Info_PopUp_close} className="closePopUpInfo">
                    <ion-icon name="close-outline"></ion-icon>
                </div>
            </div>
        </div>
    );
}
export { Info };
