'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import logo from "../../assets/logo.png"
import "./header.css"
import { useNavigate } from 'react-router-dom'

/**
 * @module Header
 * @returns {JSX}
 */
export const HeaderSection = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const navigate = useNavigate();
    return (
        <header className="absolute inset-x-0 top-0 z-50">
            <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <a onClick={() => (navigate('/'))} className="-m-1.5 p-1.5">
                        <span className="sr-only">Vlogy</span>
                        <img
                            alt="Vlogy"
                            src={logo}
                            className="header-logo"
                        />
                    </a>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                    </button>
                </div>

                <div className="hidden lg:flex lg:flex-1 lg:justify-end">

                    <a onClick={() => (navigate('/posts'))}
                        className=" cursor-pointer text-sm p-6 font-semibold leading-6 text-gray-900">
                        Posts
                    </a>
                    <a  onClick={() => (navigate('/myFavorite'))} className="text-sm p-6 font-semibold leading-6 text-gray-900">
                        Favorite
                    </a>
                </div>
            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-50" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a onClick={() => (navigate('/'))} className="-m-1.5 p-1.5">
                            <span className="sr-only">Vlogy</span>
                            <img
                                alt="Vlogy"
                                src={logo}
                                className="header-logo"
                            />
                        </a>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">

                            <div className="py-6">
                                <a
                                    onClick={() => (navigate('/posts'))}
                                    className="cursor-pointer -mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Posts
                                </a>

                                <a
                                   onClick={() => (navigate('/myFavorite'))}
                                    className="-mx-3 block  rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Favorite
                                </a>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    )
}