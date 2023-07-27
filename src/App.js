import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Administration } from "./pages/Administration";
import { Analytics } from "./pages/Analytics";
import { Clients } from "./pages/Clients";
import { Dashboard } from "./pages/Dashboard";
import { Education } from "./pages/Education";
import { Finance } from "./pages/Finance";
import { FinancialPolicy } from "./pages/FinancialPolicy";
import { Sales } from "./pages/Sales";
import { Staff } from "./pages/Staff";
import { Telefhony } from "./pages/Telefhony";
import { SideBar } from "./components/Elements/SideBar";
import { ClientsBases } from "./pages/ClientsBases";
import { Info } from "./components/Elements/Info";
import { Authorization } from "./pages/Authorization";
import { useEffect, useState } from "react";
import { getAccessToken, loging } from "./Api";
import { Context } from "./components/Service/Context";
import { SearchResults } from "./pages/SearchResults";
import { Mortage } from "./pages/Mortage";
import { ReportCard } from "./pages/ReportCard";
import { TelefonyStatistic } from "./pages/TelefonyStatistic";

function App() {
    const [admin, setAdmin] = useState();
    const [access, setAccess] = useState("");

    useEffect(() => {
        loging().then((data) => {
            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);
            setAdmin(data.a);
            const accessInterval = setInterval(() => {
                getAccessToken().then((token) => {
                    localStorage.removeItem("access");
                    localStorage.setItem("access", token.access);
                    setAccess(token.access);
                });
            }, 1000 * 60 * 4);
        });
        // getCookie("a");
        // console.log(getCookie("a"));

        // периодичное обновление access
        // const accessInterval = setInterval(() => {
        //     getAccessToken().then((token) =>
        //         localStorage.setItem("access", token.access)
        //     );
        // }, 1000 * 60 * 4);
    }, [access]);

    // function getCookie(name) {
    //     const cookies = document.cookie.split(";");
    //     for (let i = 0; i < cookies.length; i++) {
    //         const cookie = cookies[i].trim();
    //         if (cookie.split("=")[0] == name) {
    //             return cookie.split("=")[1];
    //         }
    //     }
    //     return null;
    // }

    return (
        <div>
            <Context admin={admin}>
                <Router>
                    <SideBar />
                    <div className="main" id="main">
                        <Info />
                        <Routes>
                            <Route
                                path="/Administration"
                                element={<Administration />}
                            />
                            <Route
                                path="/Authorization"
                                element={<Authorization />}
                            />
                            <Route path="/Analytics" element={<Analytics />} />
                            <Route
                                path="/SearchResults"
                                element={<SearchResults />}
                            />
                            <Route path="/Clients" element={<Clients />} />
                            <Route
                                path="/ClientsBases"
                                element={<ClientsBases />}
                            />
                            <Route path="/Mortage" element={<Mortage />} />
                            <Route
                                path="/TelefonyStatistic"
                                element={<TelefonyStatistic />}
                            />
                            <Route
                                path="/ReportCard"
                                element={<ReportCard />}
                            />
                            <Route path="/Dashboard" element={<Dashboard />} />
                            <Route path="/Education" element={<Education />} />
                            <Route path="/Finance" element={<Finance />} />
                            <Route
                                path="/FinancialPolicy"
                                element={<FinancialPolicy />}
                            />
                            <Route path="/Sales" element={<Sales />} />
                            <Route path="/Staff" element={<Staff />} />
                            <Route path="/Telefhony" element={<Telefhony />} />
                        </Routes>
                    </div>
                </Router>
            </Context>
        </div>
    );
}

export default App;
