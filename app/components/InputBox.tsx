'use client';
import React from 'react';

interface InputFieldProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    name: string;
    placeholder: string;
    value: string;
    type?: string;
    required?: true | false | 'freeze' | string;
    width?: string;
}

const requires: (string | boolean)[] = ['freeze'];

const InputBox: React.FC<InputFieldProps> = ({
    onChange,
    label,
    name,
    value,
    placeholder,
    type = 'text',
    required = false,
    width = '100%',
}) => {
    return (
        <div className="flex flex-col gap-px mt-2" style={{ width }}>
            <label
                htmlFor={name}
                className="font-li-ador-bold text-slate-500 text-md flex items-center gap-1.5"
            >
                <span>{label}</span>
                {required && !requires.includes(required) && (
                    <span
                        className="text-primary text-sm font-li-ador-light"
                        dangerouslySetInnerHTML={{
                            __html:
                                required === true ? '(বাধ্যতামূলক)' : required,
                        }}
                    ></span>
                )}
            </label>
            <input
                type={type}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
                name={name}
                readOnly={required === 'freeze'}
                required={required === true}
                className={`w-full bg-slate-50/50 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.04)] text-lg px-4 py-2 border border-slate-200 outline-none focus:ring-0 focus:border-secondary focus:bg-slate-50 focus:text-secondary rounded-md font-li-ador-semibold mt-0.5 ${
                    required === 'freeze' &&
                    'pointer-events-none bg-slate-100 text-primary'
                }`}
            />
        </div>
    );
};

export default InputBox;
