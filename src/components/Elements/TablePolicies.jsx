import { oneForAll } from "../../Api";

function TablePolicies({
    searchResponse,
    heading,
    scrollHandler,
    currentPagePolicies,
    setCurrentPagePolicies,
    loading,
    setLoading,
    setSearchResponses,
    setCurrentSales,
}) {
    const values =
        "accept,status,type__name,number,company__name,channel__name,commission,commission_discont,commission_rur,client__full_name,user__full_name,date_registration,date_start,date_end,id";

    return (
        <div
            onScroll={(e) => {
                scrollHandler(
                    e,
                    currentPagePolicies,
                    setCurrentPagePolicies,
                    loading,
                    setLoading
                );
            }}
            className="container__table"
        >
            <h2 className="heading">
                {heading}{" "}
                <span className="count">
                    {setSearchResponses.policies.count}
                </span>
            </h2>
            <table className="table">
                <thead className="table_thead">
                    <tr>
                        <th>Тип продажи</th>
                        <th>Тип полиса</th>
                        <th>Серия и номер</th>
                        <th>Компания</th>
                        <th>Канал продаж</th>
                        <th>Премия</th>
                        <th>Вход. КВ %</th>
                        <th>Вход. КВ &#8381;</th>
                        <th>Клиент</th>
                        <th>Менеджер</th>
                        <th>Оформлен</th>
                        <th>Начало действия</th>
                        <th>Окончание действия</th>
                    </tr>
                </thead>
                <tbody>
                    {searchResponse.length > 0
                        ? searchResponse.map((item) => (
                              <tr
                                  onClick={() => {
                                      oneForAll(
                                          values,
                                          "policy",
                                          undefined,
                                          `id=${item.id}`
                                      ).then((response) => {
                                          console.log(response);

                                          setCurrentSales(response.results[0]);
                                      });
                                  }}
                              >
                                  <td>{item.status}</td>
                                  <td>{item.type.name}</td>
                                  <td>
                                      {item.series} {item.number}
                                  </td>
                                  <td>{item.company.name}</td>
                                  <td>{item.channel.name}</td>
                                  <td>{item.commission}</td>
                                  <td>{item.commission_discont}</td>
                                  <td>{item.commission_rur}</td>
                                  <td>
                                      {item.client.last_name}{" "}
                                      {item.client.first_name}{" "}
                                      {item.client.middle_name}
                                  </td>

                                  <td>
                                      {item.user.last_name}
                                      {item.user.first_name}
                                  </td>
                                  <td>{item.date_registration}</td>
                                  <td>{item.date_start}</td>
                                  <td>{item.date_end}</td>
                              </tr>
                          ))
                        : ""}
                </tbody>
            </table>
        </div>
    );
}
export { TablePolicies };
