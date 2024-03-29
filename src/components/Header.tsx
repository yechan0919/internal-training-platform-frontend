import React, {useEffect, useState} from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import poscoIcon from '../assets/icon/POSCO.png'
import {NavLink} from "react-router-dom";
import { fetchUser } from '../api/UserAPI';
import { BsPersonVideo } from "react-icons/bs";
import {useAuthStore} from "../store/auth";

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Lecture', href: '/lecture' },
    { name: 'Chat', href: '/voice-chat' },
    { name: 'Quiz', href: '/quiz' },
]

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, setUser, logout } = useAuthStore();
    const ACCESS_TOKEN = localStorage.getItem('accessToken');

    const handleMyLecture = () => {
        window.location.href = '/my-page';
    }

    useEffect(() => {
        if (ACCESS_TOKEN) {
            fetchUser()
                .then((response) => {
                    setUser(response)
                }).catch((error) => {
                console.log(error);
            });
        }
    }, [ACCESS_TOKEN]);

    return (
        <header className="sticky inset-x-0 top-0 z-50 bg-white">
            <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href="/" className="-m-1.5 p-1.5">
                        <img
                            className="h-8 w-auto"
                            src={poscoIcon}
                            alt="icon"
                        />
                    </a>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <NavLink key={item.name} to={item.href} className={({isActive}) =>
                            isActive ? "border-b-2 border-blue-900" : undefined
                        }>
                            {item.name}
                        </NavLink>
                    ))}
                </div>

                <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center">
                    {ACCESS_TOKEN ? (
                        <>
                            <div className={"pr-2 flex gap-2 items-end"}>
                                <div className={"cursor-pointer"} onClick={handleMyLecture} >
                                    <span className="hover:text-indigo-500"><BsPersonVideo  size={24}/></span>
                                </div>

                                <p className="text-sm ml-3 mr-3 font-semibold leading-6 text-gray-900 mr-2" >{user?.username} | Lv.{user?.quiz_lv}</p>
                            </div>

                            <a href="/" onClick={logout}
                               className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-500">
                                Log out <span aria-hidden="true">&rarr;</span>
                            </a>
                        </>
                    ) : (
                        <a href="/login" className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-500">
                            Log in <span aria-hidden="true">&rarr;</span>
                        </a>
                    )}
                </div>

            </nav>
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-50"/>
                <Dialog.Panel
                    className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <img
                                className="h-8 w-auto"
                                src={poscoIcon}
                                alt=""
                            />
                        </a>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                            <div className="py-6">
                                {ACCESS_TOKEN ?
                                    <>
                                        <p>{user?.username} {user?.quiz_lv}.Lv</p>
                                        <a href="/" onClick={logout} className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                            Log out
                                        </a>
                                    </>
                                    :
                                    <a href="/login" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                        Log in
                                    </a>
                                }
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    )
}
