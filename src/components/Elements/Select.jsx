import { useEffect } from "react";

function Select({
    divId,
    onClick,
    style,
    disabled,
    setId,
    options,
    name,
    onChange,
    first,
    firstValue,
    none,
    valueName,
    valueId,
}) {
    useEffect(() => {
        let inputBox__select = document.querySelectorAll(".inputBox__select");
        inputBox__select.forEach((select) => {
            select.onclick = function () {
                select.classList.toggle("active");
            };
        });
    }, []);

    return (
        <div
            id={divId}
            onClick={onClick}
            className={
                style
                    ? `inputBox inputBox__select ${style}`
                    : "inputBox inputBox__select"
            }
        >
            <select
                style={{ pointerEvents: none }}
                onChange={onChange}
                disabled={disabled}
                id={setId}
                required="required"
            >
                {" "}
                {valueName ? (
                    <></>
                ) : valueId ? (
                    <></>
                ) : first ? (
                    <option value={firstValue ? firstValue : null}>
                        {first}
                    </option>
                ) : (
                    <option></option>
                )}
                {options
                    ? options.map((i) => (
                          <option
                              selected={
                                  valueId && valueId == i.id
                                      ? true
                                      : valueName && valueName == i.name
                                      ? true
                                      : false
                              }
                              value={i.id}
                          >
                              {i.name}
                          </option>
                      ))
                    : ""}
            </select>
            <span>{name}</span>
        </div>
    );
}
export { Select };
