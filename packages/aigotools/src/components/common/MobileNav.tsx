"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import Link from "./Link";

import headerNavLinks from "@/data/headerNavLinks";
import LoadingModal from "@/components/common/LoadingModal";
const MobileNav = () => {
  const [navShow, setNavShow] = useState(false);

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        setIsTransitioning(true);
        setTimeout(() => {
          //router.push(path);
          setIsTransitioning(false);
        }, 300); // 动画持续时间
        document.body.style.overflow = "auto";
      } else {
        // Prevent scrolling
        document.body.style.overflow = "hidden";
      }

      return !status;
    });
  };
  // const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  // const checkPageAndLoading = (path: string) => {
  //   setIsTransitioning(true);
  //   setTimeout(() => {
  //     //router.push(path);
  //     setIsTransitioning(false);
  //   }, 300); // 动画持续时间
  // };
  return (
    <>
      <button
        aria-label="Toggle Menu"
        className="sm:hidden"
        onClick={onToggleNav}
      >
        <svg
          className="h-8 w-8 text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            fillRule="evenodd"
          />
        </svg>
      </button>
      <Transition appear as={Fragment} show={navShow}>
        <Dialog as="div" className="relative z-10" onClose={onToggleNav}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full opacity-0"
                enterTo="translate-x-0 opacity-95"
                leave="transition ease-in duration-200 transform"
                leaveFrom="translate-x-0 opacity-95"
                leaveTo="translate-x-full opacity-0"
              >
                <Dialog.Panel className="fixed left-0 top-0 z-10 h-full w-full bg-white opacity-95 duration-300 dark:bg-gray-950 dark:opacity-[0.98]">
                  <nav className="fixed mt-8 h-full text-left">
                    {headerNavLinks.map((link) => {
                      return (
                        <div key={link.title} className="px-12 py-4">
                          <Link
                            className="text-2xl font-bold tracking-widest text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400"
                            href={`${link.href}`}
                            onClick={onToggleNav}
                          >
                            {/* 根据mainNav是否找到匹配的元素来显示标题 */}
                            {link.title}
                          </Link>
                        </div>
                      );
                    })}
                  </nav>

                  <div className="flex justify-end">
                    <button
                      aria-label="Toggle Menu"
                      className="mr-8 mt-11 h-8 w-8"
                      onClick={onToggleNav}
                    >
                      <svg
                        className="text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          clipRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          fillRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <LoadingModal showLoadingModal={isTransitioning} />
    </>
  );
};

export default MobileNav;
