function TableDeals({
    searchResponse,
    heading,
    scrollHandler,
    currentPageDeals,
    setCurrentPageDeals,
    loading,
    setLoading,
    setSearchResponses,
}) {
    let object = {
        in_work: "В работе",
        archived: "В архиве",
        paid: "Оплачено",
    };

    return (
        <div
            onScroll={(e) => {
                scrollHandler(
                    e,
                    currentPageDeals,
                    setCurrentPageDeals,
                    loading,
                    setLoading
                );
            }}
            className="container__table"
        >
            <h2 className="heading">
                {heading}{" "}
                <span className="count">{setSearchResponses.deals.count}</span>
            </h2>
            <table className="table">
                <thead className="table_thead">
                    <tr>
                        <th>Дата создания</th>
                        <th>Название</th>
                        <th>ФИО клиента</th>
                        <th>Статус</th>
                        <th>Причина отказа</th>
                        <th>Дата выполнения</th>
                        <th>Менеджер</th>
                    </tr>
                </thead>
                <tbody>
                    {searchResponse.length > 0
                        ? searchResponse.map((item) => (
                              <tr>
                                  <td>{item.date_create}</td>
                                  <td>{item.name}</td>
                                  <td>
                                      {item.policy.policyholder.last_name}{" "}
                                      {item.policy.policyholder.first_name}{" "}
                                      {item.policy.policyholder.middle_name}
                                  </td>

                                  <td>{object[item.status]}</td>
                                  <td>{item.reason_for_failure}</td>
                                  <td>{item.date_update}</td>
                                  <td>
                                      {item.user.last_name}{" "}
                                      {item.user.first_name}
                                  </td>
                              </tr>
                          ))
                        : ""}
                </tbody>
            </table>
        </div>
    );
}
export { TableDeals };
