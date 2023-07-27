import { useEffect, useState } from "react";
import { TableBasePolicies } from "../components/Elements/TableBasePolicies";
import { getScrollSearch, globalSearch } from "../Api";
import { TableClients } from "../components/Elements/TableClients";
import { TableDeals } from "../components/Elements/TableDeals";
import { TablePolicies } from "../components/Elements/TablePolicies";
import { Loader } from "../components/Elements/Loader";
import { PopUpRedactorSales } from "../components/Sales/PopUpRedactorSales";
import { InfoPopUp } from "../components/Service/InfoPopUp";

function SearchResults() {
    const [searchResponse, setSearchResponse] = useState();
    const [currentPageBaseSource, setCurrentPageBaseSource] = useState();
    const [currentPageClients, setCurrentPageClients] = useState();
    const [currentPageDeals, setCurrentPageDeals] = useState();
    const [currentPagePolicies, setCurrentPagePolicies] = useState();
    const [loading, setLoading] = useState(false);
    const [base_policies, setBasePolicies] = useState();
    const [clients, setClients] = useState();
    const [deals, setDeals] = useState();
    const [policies, setPolicies] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [currentSales, setCurrentSales] = useState();
    useEffect(() => {
        document.getElementById("inputGlobalSearch").onblur = () => {
            updateSearch();
        };
        updateSearch();
    }, []);
    if (isLoading) {
        return <Loader />;
    }
    if (!searchResponse) {
        return;
    }
    /*Функция глобального поиска*/
    function updateSearch() {
        let search = document.getElementById("inputGlobalSearch").value.trim();
        if (search) {
            setIsLoading(true);
            globalSearch(search).then((response) => {
                if (response.error) {
                    InfoPopUp(response.error, "popup__Info_red");
                } else {
                    setSearchResponse(response);
                    setCurrentPageBaseSource(response.base_policies.next_page);
                    setCurrentPageClients(response.clients.next_page);
                    setCurrentPageDeals(response.deals.next_page);
                    setCurrentPagePolicies(response.policies.next_page);
                    setBasePolicies(response.base_policies.results);
                    setClients(response.clients.results);
                    setDeals(response.deals.results);
                    setPolicies(response.policies.results);
                    document.getElementById("inputGlobalSearch").value = "";
                    setIsLoading(false);
                }
            });
        }
    }
    /*Функция скролла для результатов поиска*/
    const scrollHandler = (
        e,
        currentPage,
        setCurrentPage,
        loading,
        setLoading
    ) => {
        if (
            e.target.scrollHeight -
                (e.target.scrollTop + e.target.offsetHeight) <
                5 &&
            currentPage &&
            !loading
        ) {
            setLoading(false);
            getScrollSearch(`${currentPage}`).then((data) => {
                if (data.error) {
                    InfoPopUp(data.error, "popup__Info_red");
                } else {
                    if (Object.keys(data)[0] == "clients") {
                        setClients((prevState) => [
                            ...prevState,
                            ...data.clients.results,
                        ]);
                        setCurrentPage(data.clients.next_page);
                    }
                    if (Object.keys(data)[0] == "base_policies") {
                        setBasePolicies((prevState) => [
                            ...prevState,
                            ...data.base_policies.results,
                        ]);
                        setCurrentPage(data.base_policies.next_page);
                    }
                    if (Object.keys(data)[0] == "deals") {
                        setDeals((prevState) => [
                            ...prevState,
                            ...data.deals.results,
                        ]);
                        setCurrentPage(data.deals.next_page);
                    }
                    if (Object.keys(data)[0] == "policies") {
                        setPolicies((prevState) => [
                            ...prevState,
                            ...data.policies.results,
                        ]);
                        setCurrentPage(data.policies.next_page);
                    }
                    setLoading(false);
                }
            });
        }
    };
    return (
        <div>
            {currentSales ? (
                <PopUpRedactorSales
                    currentSales={currentSales}
                    setCurrentSales={setCurrentSales}
                />
            ) : (
                <></>
            )}
            {searchResponse.base_policies.count == 0 ? (
                <></>
            ) : (
                <TableBasePolicies
                    heading="База полисов"
                    searchResponse={base_policies}
                    scrollHandler={scrollHandler}
                    currentPageBaseSource={currentPageBaseSource}
                    setCurrentPageBaseSource={setCurrentPageBaseSource}
                    loading={loading}
                    setLoading={setLoading}
                    setSearchResponses={searchResponse}
                />
            )}
            {searchResponse.clients.count == 0 ? (
                <></>
            ) : (
                <TableClients
                    heading="Клиенты"
                    searchResponse={clients}
                    scrollHandler={scrollHandler}
                    currentPageClients={currentPageClients}
                    setCurrentPageClients={setCurrentPageClients}
                    loading={loading}
                    setLoading={setLoading}
                    setSearchResponses={searchResponse}
                />
            )}
            {searchResponse.deals.count == 0 ? (
                <></>
            ) : (
                <TableDeals
                    heading="Сделки"
                    searchResponse={deals}
                    scrollHandler={scrollHandler}
                    currentPageDeals={currentPageDeals}
                    setCurrentPageDeals={setCurrentPageDeals}
                    loading={loading}
                    setLoading={setLoading}
                    setSearchResponses={searchResponse}
                />
            )}
            {searchResponse.deals.policies == 0 ? (
                <></>
            ) : (
                <TablePolicies
                    heading="Полисы"
                    searchResponse={policies}
                    scrollHandler={scrollHandler}
                    currentPagePolicies={currentPagePolicies}
                    setCurrentPagePolicies={setCurrentPagePolicies}
                    loading={loading}
                    setLoading={setLoading}
                    setSearchResponses={searchResponse}
                    currentSales={currentSales}
                    setCurrentSales={setCurrentSales}
                />
            )}
        </div>
    );
}
export { SearchResults };
