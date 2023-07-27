function PopUpTelefony({ url, setUrl }) {
    console.log(url);
    /*Функция закрытия popUp прослушивания звонка*/
    function closePopUp(e) {
        {
            if (!e.target.closest(".content__PopUp_CreateDeal")) {
                setUrl();
            }
        }
    }
    return (
        <div onClick={closePopUp} className="main__container">
            <div className="content__PopUp_CreateDeal">
                <audio controls>
                    <source src={url} />
                </audio>
            </div>
        </div>
    );
}
export { PopUpTelefony };
