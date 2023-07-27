import { Loader } from "./Loader";

function Table({
    props,
    check,
    title,
    style,
    header,
    scrollHandler,
    loading,
    setLoading,
    currentPage,
    setCurrentPage,
    setData,
    loader,
    heading__new,
    onClick,
}) {
    let propsTd = "";
    if (props && props.length != 0) {
        propsTd = Object.keys(props[0]);
    }
    /*Функция сортировки таблиц*/
    const getSort = ({ target }) => {
        const order = (target.dataset.order = -(target.dataset.order || -1));
        const index = [...target.parentNode.cells].indexOf(target);
        const collator = new Intl.Collator(["en", "ru"], { numeric: true });
        const comparator = (index, order) => (a, b) =>
            order *
            collator.compare(
                a.children[index].innerHTML,
                b.children[index].innerHTML
            );
        for (const tBody of target.closest("table").tBodies)
            tBody.append(...[...tBody.rows].sort(comparator(index, order)));
        for (const cell of target.parentNode.cells)
            cell.classList.toggle("sorted", cell === target);
    };

    return (
        <div
            onScroll={
                scrollHandler
                    ? (e) => {
                          scrollHandler(
                              e,
                              currentPage,
                              setCurrentPage,
                              loading,
                              setLoading,
                              setData
                          );
                      }
                    : undefined
            }
            className={style ? `container__table ${style}` : "container__table"}
        >
            <h2 className={heading__new ? heading__new : "heading"}>{title}</h2>
            {loader ? (
                <Loader />
            ) : (
                <table className="table">
                    <thead className="table_thead">
                        <tr>
                            {check ? <th>{check}</th> : <></>}
                            {header ? (
                                header.map((item) => (
                                    <th onClick={getSort}>{item}</th>
                                ))
                            ) : (
                                <></>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {props.map((item) => (
                            <tr
                                onClick={() =>
                                    onClick ? onClick(item) : <></>
                                }
                                id={item ? item.id : ""}
                            >
                                {check ? (
                                    <td data-label="+">{check}</td>
                                ) : (
                                    <></>
                                )}
                                {propsTd.map((i) => (
                                    <td data-label="Наименоваие"> {item[i]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
export { Table };
