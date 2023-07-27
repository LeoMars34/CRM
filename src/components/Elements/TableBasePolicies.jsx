function TableBasePolicies({
    searchResponse,
    heading,
    scrollHandler,
    currentPageBaseSource,
    setCurrentPageBaseSource,
    loading,
    setLoading,
    setSearchResponses,
}) {
    return (
        <div
            onScroll={(e) => {
                scrollHandler(
                    e,
                    currentPageBaseSource,
                    setCurrentPageBaseSource,
                    loading,
                    setLoading
                );
            }}
            className="container__table"
        >
            <h2 className="heading">
                {heading}{" "}
                <span className="count">
                    {setSearchResponses.base_policies.count}
                </span>
            </h2>
            <table className="table">
                <thead className="table_thead">
                    <tr>
                        <th>Источник</th>
                        <th>Тип</th>
                        <th>Страхователь</th>
                        <th>Объект страхования</th>
                        <th>Дата окончания</th>
                    </tr>
                </thead>
                <tbody>
                    {searchResponse.length > 0
                        ? searchResponse.map((item) => (
                              <tr>
                                  <td>{item.base_source.name}</td>
                                  <td>{item.type.name}</td>
                                  <td>
                                      {item.policyholder.last_name}{" "}
                                      {item.policyholder.first_name}{" "}
                                      {item.policyholder.middle_name}
                                  </td>
                                  <td>
                                      {item.car
                                          ? `${item.car.brand} 
                                          ${item.car.year}
                                          ${item.car.vin}
                                          ${item.car.number}`
                                          : ""}
                                      {item.ipoteka
                                          ? `${item.ipoteka.bank_name} 
                                            ${item.ipoteka.obj}`
                                          : ""}
                                  </td>
                                  <td>{item.date_end}</td>
                              </tr>
                          ))
                        : ""}
                </tbody>
            </table>
        </div>
    );
}
export { TableBasePolicies };
