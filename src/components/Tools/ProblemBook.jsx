import { Button } from "../Elements/Button";
import { Input } from "../Elements/Input";

function ProblemBook() {
    return (
        <div id="ProblemBook" className="ProblemBook">
            <div className="content">
                <ul>
                    <li>
                        <ion-icon name="person-outline"></ion-icon> Обглоданный
                        Кролик
                    </li>
                    <li>
                        <ion-icon name="person-outline"></ion-icon> Обглоданный
                        Кролик
                    </li>
                    <li>
                        <ion-icon name="person-outline"></ion-icon> Обглоданный
                        Кролик
                    </li>
                    <li>
                        <ion-icon name="person-outline"></ion-icon> Обглоданный
                        Кролик
                    </li>
                    <li>
                        <ion-icon name="person-outline"></ion-icon> Обглоданный
                        Кролик
                    </li>
                    <li>
                        <ion-icon name="person-outline"></ion-icon> Обглоданный
                        Кролик
                    </li>
                </ul>
                <div className="PropblemBookArea"></div>
                <Input style="input__M" name="Поставить задачу" />
                <Button name="Отправить" style="button_green" />
            </div>
        </div>
    );
}
export { ProblemBook };
