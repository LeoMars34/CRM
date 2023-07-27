import { useEffect } from "react";
import { PieChart } from "recharts";

function Education() {
    useEffect(() => {
        let list = document.querySelectorAll(".navigation li");

        list.forEach((item) => {
            item.classList.remove("hovered");
        });
        list[8].classList.add("hovered");
    }, []);

    return;
}
export { Education };
