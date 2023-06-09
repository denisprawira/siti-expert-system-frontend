"use client";
import { useEffect, useState } from "react";
import { Diagnose } from "./pages/Diagnose";
import { HomePage } from "./pages/HomePage";
import { render } from "react-dom";
import { LoginPage } from "./pages/Login";
import { DiseaseInfo } from "./pages/DiseaseInfo";

export default function Home() {
    const [selectedMenu, setSelectedMenu] = useState("home");
    const [navExpand, setNavExpand] = useState(false);

    const menuItems = [
        { id: "home", label: "Home" },
        { id: "diagnose", label: "Diagnosa" },
        { id: "diseaseinfo", label: "Info Kesehatan" },
        { id: "symptoms", label: "Daftar Gejala" },
        { id: "login", label: "Login Pakar/Nakes" },
    ];

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 640 && setNavExpand(false)
        );
    }, []);

    const renderContent = () => {
        switch (selectedMenu) {
            case "home":
                return <HomePage />;
            case "diagnose":
                return <Diagnose />;
            case "login":
                return <LoginPage />;
            case "diseaseinfo":
                return <DiseaseInfo />;
            default:
                return null;
        }
    };

    return (
        <main className="h-full">
            <div className="drawer  ">
                <input
                    id="my-drawer-3"
                    onChange={() => setNavExpand((navExpand) => !navExpand)}
                    checked={navExpand}
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="drawer-content   flex flex-col">
                    <div className="w-full navbar bg-base-300 border-b-2 border-solid border-b-stone-100 bg-transparent">
                        <div className="w-11/12 w-full max-w-screen-lg box-border m-auto">
                            <div className="flex-none lg:hidden ">
                                <label
                                    htmlFor="my-drawer-3"
                                    className="btn btn-square btn-ghost"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        className="inline-block w-6 h-6 stroke-current"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        ></path>
                                    </svg>
                                </label>
                            </div>
                            <div className="flex-1 px-2 mx-2">SITI</div>
                            <div className="flex-none hidden lg:block">
                                <ul className="menu menu-horizontal">
                                    {menuItems.map((menuItem) => (
                                        <li key={menuItem.id}>
                                            <a
                                                onClick={() =>
                                                    setSelectedMenu(menuItem.id)
                                                }
                                            >
                                                {menuItem.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="relative h-full w-11/12 mx-auto max-w-screen-lg box-border px-2">
                        {renderContent()}
                    </div>
                </div>
                <div className="drawer-side">
                    <label
                        htmlFor="my-drawer-3"
                        className="drawer-overlay"
                    ></label>
                    <ul className="menu p-4 w-80 bg-base-100">
                        {menuItems.map((menuItem) => (
                            <li key={menuItem.id}>
                                <a
                                    onClick={() => {
                                        setSelectedMenu(menuItem.id);
                                        setNavExpand((navExpand) => !navExpand);
                                    }}
                                >
                                    {menuItem.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </main>
    );
}
