import { useEffect } from "react";
import Dialer from "../components/Service/CallJsSip";

function FinancialPolicy() {
    useEffect(() => {
        let list = document.querySelectorAll(".navigation li");
        list.forEach((item) => {
            item.classList.remove("hovered");
        });
        list[7].classList.add("hovered");
    }, []);

    return (
        <div>
            <Dialer />
        </div>
    );
}
export { FinancialPolicy };
