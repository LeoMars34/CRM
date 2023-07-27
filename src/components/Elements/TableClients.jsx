function TableClients({
    searchResponse,
    heading,
    scrollHandler,
    currentPageClients,
    setCurrentPageClients,
    loading,
    setLoading,
    setSearchResponses,
}) {
    const newClientsNameArr = searchResponse.map((item) => ({
        ...item,
        name: `${item.last_name} ${item.first_name} ${item.middle_name}`,
    }));

    return (
        <div
            onScroll={(e) => {
                scrollHandler(
                    e,
                    currentPageClients,
                    setCurrentPageClients,
                    loading,
                    setLoading
                );
            }}
            className="container__table"
        >
            <h2 className="heading">
                {heading}{" "}
                <span className="count">
                    {setSearchResponses.clients.count}
                </span>
            </h2>
            <table className="table">
                <thead className="table_thead">
                    <tr>
                        <th>ФИО</th>
                        <th>Дата Рождения</th>
                        <th>Телефон</th>
                        <th>Почта</th>
                        <th>Адресс</th>
                    </tr>
                </thead>
                <tbody>
                    {newClientsNameArr.length > 0
                        ? newClientsNameArr.map((item) => (
                              <tr>
                                  <td>{item.name}</td>
                                  <td>{item.birthday}</td>
                                  <td>{item.phone}</td>
                                  <td>{item.email}</td>
                                  <td>{item.address}</td>
                              </tr>
                          ))
                        : ""}
                </tbody>
            </table>
        </div>
    );
}
export { TableClients };
