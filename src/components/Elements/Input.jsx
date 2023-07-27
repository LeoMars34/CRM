function Input({
    logo,
    name,
    style,
    value,
    setId,
    divId,
    type,
    step,
    onBlur,
    onKeyDown,
    none,
    ion_icon,
    whatsUp,
    call,
    Birthday,
    Email,
    Phone,
    Fio,
    Date,
}) {
    /*Валидация ФИО*/
    function ValidateFio(e) {
        let fio = e.target;
        let regex = /[^a-zA-Zа-яА-Я\s]/g;
        fio.value = fio.value.replace(regex, "");
        fio.value = fio.value.replace(/\s+/g, " ");
    }
    /*Валидация даты рождения*/
    function ValidateBirthday(e) {
        let form = e.target.parentNode;
        let happyB = e.target;
        if (happyB.value == "") {
            form.classList.remove("red_border");
        }
        e.target.value = e.target.value.replace(/[^0-9]/g, "");
        if (2 < e.target.value.length && e.target.value.length < 5) {
            e.target.value =
                e.target.value.slice(0, 2) + "." + e.target.value.slice(2, 4);
        } else if (e.target.value.length > 4) {
            e.target.value =
                e.target.value.slice(0, 2) +
                "." +
                e.target.value.slice(2, 4) +
                "." +
                e.target.value.slice(4, 8);
            // if (e.target.value.length == 10) {
            //     let newDate = new Date(
            //         e.target.value.slice(6, 10),
            //         Number(e.target.value.slice(3, 5) - 1),
            //         e.target.value.slice(0, 2)
            //     );
            //     let inputDate = newDate.toLocaleDateString("ru-RU");
            //     let dateNow = new Date();
            //     let now = dateNow.toLocaleDateString("ru-RU");
            //     const date1 = new Date(now.split(".").reverse().join("-"));
            //     const date2 = new Date(
            //         inputDate.split(".").reverse().join("-")
            //     );
            //     const delta_days = Math.abs(
            //         date2.getFullYear() - date1.getFullYear()
            //     );
            //     if (delta_days > 100 || delta_days < 14) {
            //         form.classList.add("red_border");
            //         InfoPopUp("НЕКОРЕКТНАЯ ДАТА", "popup__Info_red");
            //     } else {
            //         form.classList.remove("red_border");
            //     }
            // }
        }
    }
    /*Валидация даты*/
    function ValidateDate(e) {
        let form = e.target.parentNode;
        let date = e.target;
        if (date.value == "") {
            form.classList.remove("red_border");
        }
        e.target.value = e.target.value.replace(/[^0-9]/g, "");
        if (2 < e.target.value.length && e.target.value.length < 5) {
            e.target.value =
                e.target.value.slice(0, 2) + "." + e.target.value.slice(2, 4);
        } else if (e.target.value.length > 4) {
            e.target.value =
                e.target.value.slice(0, 2) +
                "." +
                e.target.value.slice(2, 4) +
                "." +
                e.target.value.slice(4, 8);
        }
    }
    /*Валидация email*/
    function ValidateEmail(e) {
        let form = e.target.parentNode;
        let email = e.target;
        let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (email.value.match(pattern)) {
            form.classList.remove("red_border");
        } else {
            form.classList.remove("green_border");
            form.classList.add("red_border");
        }
        if (email.value == "") {
            form.classList.remove("green_border");
            form.classList.remove("red_border");
        }
    }
    /*Валидация телефона*/
    function ValidatePhone(e) {
        let form = e.target.parentNode;
        let phone = e.target;
        let pattern = /^((\9)+([0-9]){9})$/;
        let regex = /[^\d]/g;
        let index = phone.value.indexOf("9");
        if (index != -1) {
            phone.value = phone.value.slice(index);
        } else {
            phone.value = "";
        }
        phone.value = phone.value.replace(regex, "");
        if (phone.value.length > 10) {
            phone.value = phone.value.slice(0, 10);
        }
        if (phone.value.match(pattern)) {
            form.classList.remove("red_border");
        } else {
            form.classList.remove("green_border");
            form.classList.add("red_border");
        }
        if (phone.value == "") {
            form.classList.remove("green_border");
            form.classList.remove("red_border");
        }
    }
    /*Удаление пробелов в начале и конце строки*/
    document.querySelectorAll(".inputBox__standart").forEach((item) => {
        item.onchange = (e) => {
            e.target.value = e.target.value.trim();
        };
    });
    /*Удаление двойных пробелов*/
    document.querySelectorAll(".inputBox__standart").forEach((item) => {
        item.oninput = (e) => {
            e.target.value = e.target.value.replace(/\s+/g, " ");
        };
    });
    function validate(e) {
        if (Birthday) {
            ValidateBirthday(e);
        }
        if (Email) {
            ValidateEmail(e);
        }
        if (Phone) {
            ValidatePhone(e);
        }
        if (Fio) {
            ValidateFio(e);
        }
        if (Date) {
            ValidateDate(e);
        }
    }

    return (
        <div
            id={divId}
            className={
                style
                    ? `inputBox inputBox__standart ${style}`
                    : "inputBox inputBox__standart"
            }
        >
            <input
                style={{ pointerEvents: none }}
                defaultValue={value}
                onInput={(e) => {
                    validate(e);
                }}
                onBlur={onBlur}
                id={setId}
                type={type ? type : "text"}
                required
                step={step ? step : ""}
                onKeyDown={onKeyDown}
            />
            <span>
                {logo}
                {name}
            </span>
            <div onClick={whatsUp ? whatsUp : null} className="watsUp">
                {ion_icon ? <ion-icon name="logo-whatsapp"></ion-icon> : ""}
            </div>
            <div onClick={call ? call : null} className="watsUpI">
                {ion_icon ? <ion-icon name="call-outline"></ion-icon> : ""}
            </div>
        </div>
    );
}

export { Input };
