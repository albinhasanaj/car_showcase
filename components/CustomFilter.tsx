"use client";
import { useState, Fragment } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Listbox, ListboxButton, ListboxOptions, Transition, ListboxOption } from "@headlessui/react";
import { CustomFilterProps } from "@/types";
import { updateSearchParams } from "@/utils";

const CustomFilter = ({ title, options }: CustomFilterProps) => {
    const router = useRouter();
    const [selected, setSelected] = useState(options[0]);

    const handleUpdateParams = (e: { title: string, value: string }) => {

        const newPathname = updateSearchParams(title, e.value.toLowerCase());

        router.push(newPathname);
    }

    return (
        <div className="w-fit">
            <Listbox
                value={selected}
                onChange={
                    (e) => {
                        setSelected(e);
                        handleUpdateParams(e);
                    }
                }
            >
                <div className="relative w-fit z-9">
                    <ListboxButton className="custom-filter__btn">
                        <span className="block truncate">{selected.title}</span>
                        <Image
                            src="/chevron-up-down.svg"
                            alt="chevron"
                            width={20}
                            height={20}
                            className="ml-4 object-contain"
                        />
                    </ListboxButton>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <ListboxOptions className="custom-filter__options">
                            {options.map((option) => (
                                <ListboxOption
                                    key={option.title}
                                    value={option}
                                    className={({ focus }) => `relative cursor-default select-none py-2 px-4 ${focus ? "bg-primary-blue text-white" : "text-gray-900"}`}
                                >
                                    {({ selected }) => (
                                        <span className={`block truncate ${selected ? "font-bold" : "font-normal"}`}>
                                            {option.title}
                                        </span>
                                    )}
                                </ListboxOption>
                            ))}
                        </ListboxOptions>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}

export default CustomFilter