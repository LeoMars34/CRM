import { Loader } from "../Elements/Loader";
import { Table } from "../Elements/Table";

function AnalyticsDepartament({ department, loader, setLoader }) {
    let usersHeaderArray = ["Менеджер", "Продажи", "Сумма", "Средний чек"];
    let typiesHeaderArray = ["Тип", "Колл-во", "Сумма", "Средний чек"];
    let companiesHeaderArray = ["Компания", "Колл-во", "Сумма", "Средний чек"];

    return (
        <>
            {loader ? (
                <Loader />
            ) : (
                <div className="container__table_widthAuto">
                    <Table
                        header={usersHeaderArray}
                        title="Менеджеры"
                        props={department.users}
                    />
                    <Table
                        header={companiesHeaderArray}
                        title="Компании"
                        props={department.companies}
                    />
                    <Table
                        header={typiesHeaderArray}
                        title="Тип полиса"
                        props={department.typies}
                    />
                </div>
            )}
        </>
    );
}
export { AnalyticsDepartament };
