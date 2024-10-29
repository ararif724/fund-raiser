import { CSSProperties, useState } from 'react';
import InputBox from './InputBox';
import Image from 'next/image';
import { useStoreFunderMutation } from '@/redux/api/apiSlice';
import info from '@/hooks/info';
import Loading from './Loading';

export interface FunderProps {
    id: number;
    amount: string;
    sameAccount: boolean;
    phone: string;
    account: string;
    transactionId: string;
    name: string;
    roll: string;
    registration: string;
    email: string;
    password: string;
    comment: string;
    accountType: string;
    profileImage: File | null | string;
    paymentRefImage: File | null | string;
    createdAt: null | string;
    updatedAt: null | string;
}

const AddForm: React.FC = () => {
    const [form, setForm] = useState<FunderProps>({
        id: 0,
        amount: '210',
        sameAccount: false,
        phone: '',
        account: '',
        transactionId: '',
        name: '',
        roll: '',
        registration: '',
        email: '',
        password: '',
        comment: '',
        accountType: '',
        profileImage: null,
        paymentRefImage: null,
        createdAt: null,
        updatedAt: null,
    });

    function inputTextChangeHandler(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    }

    const [storeFunder, { isError, isLoading, isSuccess, data, error }] =
        useStoreFunderMutation();
    info(true, 'useStoreFunderMutation', {
        isError,
        isLoading,
        isSuccess,
        data,
        error,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('amount', form.amount);
        formData.append('phone', form.phone);
        formData.append('account', form.account);
        formData.append('transactionId', form.transactionId);
        formData.append('name', form.name);
        formData.append('roll', form.roll);
        formData.append('registration', form.registration);
        formData.append('email', form.email);
        formData.append('password', form.password);
        formData.append('comment', form.comment);
        formData.append('accountType', form.accountType);
        formData.append('sameAccount', form.sameAccount ? 'true' : 'false');
        // Append files
        if (form.profileImage) {
            formData.append('profileImage', form.profileImage);
        }

        if (form.paymentRefImage) {
            formData.append('paymentRefImage', form.paymentRefImage);
        }

        storeFunder(formData);
        window.scrollTo({ behavior: 'smooth', top: 0 });
    };

    return (
        <>
            {isLoading && <Loading />}
            <form
                onSubmit={handleSubmit}
                action="#"
                className="w-full bg-white p-3 sm:p-6 lg:p-10 rounded-2xl"
            >
                <h1 className="font-bold text-3xl font-li-ador-bold text-secondary text-center">
                    ফান্ডকারীর বিবরণী
                </h1>
                <p className="border-b-2 border-dashed border-secondary/30 pb-2 mb-4 text-md font-li-ador leading-[1.3] pt-3">
                    পেমেন্ট করার পূর্বে সকল নিয়ম কানুন এবং
                    <a
                        href="#terms-and-conditions"
                        className="pl-1 pr-2 font-li-ador-bold italic tracking-wide duration-300 hover:tracking-wider text-secondary underline"
                    >
                        শর্তাবলী
                    </a>
                    সঠিক ভাবে পরে নিন এবং যাবতীয় বিস্তারিত সম্পর্কে জানতে
                    কল/হোসটসএপ করুন -
                    <span className="text-primary font-bold text-lg px-1 tracking-wide">
                        ০১৮১৭৮০৭৫৯১.
                    </span>
                </p>
                {error &&
                    'data' in error &&
                    (error.data as { message: string }).message && (
                        <p className="font-li-ador text-lg leading-[1.3] text-center text-red-500 pb-4">
                            {(error.data as { message: string }).message}
                        </p>
                    )}

                <InputBox
                    label="আপনার নাম:"
                    value={form.name}
                    onChange={inputTextChangeHandler}
                    placeholder="যেমন: এলবার্ট আইনস্টাইন..."
                    name="name"
                    required
                />
                <div className="w-full flex 2xl:grid grid-cols-[2fr,1fr] gap-3 sm:items-center items-start justify-between flex-col 2xl:flex-row">
                    <InputBox
                        label="রোল নম্বর:"
                        value={form.roll}
                        onChange={inputTextChangeHandler}
                        placeholder="যেমন: 573***"
                        name="roll"
                        // width="60%"
                        required
                    />
                    <InputBox
                        label="রেজিস্ট্রেশন নম্বর:"
                        value={form.registration}
                        onChange={inputTextChangeHandler}
                        placeholder="যেমন: 1502142***"
                        name="registration"
                    />
                </div>
                <InputBox
                    label="ইমেইল আইডি:"
                    value={form.email}
                    onChange={inputTextChangeHandler}
                    placeholder="যেমন: example@gmail.com"
                    name="email"
                />

                <div className="flex flex-col gap-px mt-2 w-full">
                    <div className="font-li-ador-bold justify-between w-full text-slate-500 text-md flex items-center gap-1.5">
                        <span>
                            <span className="pr-2">ফোন নম্বর:</span>

                            <span className="text-primary text-sm font-li-ador-light">
                                (বাধ্যতামূলক)
                            </span>
                        </span>
                        <div
                            className="form-check"
                            style={
                                {
                                    '--color': 'var(--secondary)',
                                } as CSSProperties
                            }
                        >
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="sameAccount"
                                onChange={(e) => {
                                    const checked = e.target.checked;
                                    if (checked) {
                                        setForm({
                                            ...form,
                                            account: form.phone,
                                            sameAccount: checked,
                                        });
                                    } else {
                                        setForm({
                                            ...form,
                                            sameAccount: checked,
                                            account: '',
                                        });
                                    }
                                }}
                            />
                            <label
                                className={`form-check-label ${
                                    form.sameAccount
                                        ? 'text-secondary'
                                        : 'text-primary'
                                }`}
                                htmlFor="sameAccount"
                            >
                                একাউন্ট নম্বর একই
                            </label>
                        </div>
                    </div>
                    <input
                        type="text"
                        onChange={(e) => {
                            if (form.sameAccount) {
                                setForm({
                                    ...form,
                                    account: e.target.value,
                                    phone: e.target.value,
                                });
                            } else {
                                setForm({
                                    ...form,
                                    phone: e.target.value,
                                });
                            }
                        }}
                        value={form.phone}
                        placeholder="যেমন: 0152142***"
                        name="phone"
                        className="w-full bg-slate-50/50 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.04)] text-lg px-4 py-2 border border-slate-200 outline-none focus:ring-0 focus:border-secondary focus:bg-slate-50 focus:text-secondary rounded-md font-li-ador-semibold mt-0.5"
                    />
                </div>

                <div className="w-full flex 2xl:grid grid-cols-[2fr,1fr] gap-3 sm:items-center items-start justify-between flex-col 2xl:flex-row">
                    <InputBox
                        label="একাউন্ট নম্বর:"
                        value={form.account}
                        onChange={inputTextChangeHandler}
                        placeholder="যেমন: 0152142***"
                        name="account"
                        required={form.sameAccount ? 'freeze' : true}
                    />

                    <div className="w-full flex flex-col gap-px sm:mt-2">
                        <label
                            htmlFor="accountType"
                            className="font-li-ador-bold text-slate-500 text-md flex items-center gap-1.5"
                        >
                            <span>একাউন্ট টাইপ:</span>

                            <span className="text-primary text-sm font-li-ador-light">
                                (বাধ্যতামূলক)
                            </span>
                        </label>
                        <select
                            name="accountType"
                            id="accountType"
                            className="w-full bg-slate-50/50 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.04)] text-lg px-4 py-2 border border-slate-200 outline-none focus:ring-0 focus:border-secondary focus:bg-slate-50 focus:text-secondary rounded-md font-li-ador-semibold mt-0.5 text-primary"
                            value={form.accountType}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    accountType: e.target.value,
                                })
                            }
                            style={{
                                color: !form.accountType ? '#64748b' : '',
                            }}
                            required
                        >
                            <option hidden>সিলেক্ট করুন</option>
                            <option value="bkash">বিকাশ </option>
                            <option value="nagad">নগদ </option>
                            <option value="rocket">রকেট </option>
                            <option value="upay">উপায় </option>
                            <option value="bank">ব্যাংক ট্রান্সফার</option>
                        </select>
                    </div>
                </div>

                <div className="w-full flex 2xl:grid grid-cols-[1fr,2fr] gap-3 items-center justify-between flex-col 2xl:flex-row">
                    <InputBox
                        label="ফান্ডের পরিমান:"
                        value={form.amount}
                        onChange={inputTextChangeHandler}
                        placeholder="যেমন: 200"
                        name="amount"
                        required
                    />

                    <div className="w-full flex 2xl:flex-wrap gap-2 justify-evenly items-center 2xl:pt-9 2xl:pb-0 pt-0 pb-1">
                        {[
                            {
                                id: 1,
                                title: '১০০',
                                value: '100',
                            },
                            {
                                id: 2,
                                title: '২১০',
                                value: '210',
                            },
                            {
                                id: 3,
                                title: '৩০০',
                                value: '300',
                            },
                            {
                                id: 4,
                                title: '৫০০',
                                value: '500',
                            },
                        ].map((amount) => (
                            <button
                                key={amount.id}
                                className={
                                    form.amount === amount.value
                                        ? 'bg-secondary px-4 2xl:w-auto w-full py-2 block border border-solid border-secondary rounded-full text-white font-li-ador-bold text-sm sm:text-xl shadow-md'
                                        : 'bg-slate-50 px-4 2xl:w-auto w-full py-2 block border border-solid border-slate-300 rounded-full text-primary font-li-ador-bold text-sm sm:text-xl hover:bg-secondary hover:border-secondary hover:tracking-wide duration-500 hover:text-white cursor-pointer'
                                }
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();

                                    setForm({
                                        ...form,
                                        amount: amount.value,
                                    });

                                    console.log('change');
                                }}
                            >
                                <input
                                    type="checkbox"
                                    className="appearance-none"
                                    name="amount"
                                    value={amount.value}
                                />
                                <span>
                                    <i className="fa-solid fa-bangladeshi-taka-sign pr-1.5"></i>
                                    {amount.title}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                <InputBox
                    label="ট্রানজেকশন আইডি:"
                    value={form.transactionId}
                    onChange={inputTextChangeHandler}
                    placeholder="যেমন: X9QC33B0"
                    name="transactionId"
                    required
                />

                <InputBox
                    label="পাসওয়ার্ড:"
                    value={form.password}
                    onChange={inputTextChangeHandler}
                    placeholder="যেমন: X9QC33B0"
                    name="password"
                    required={'ডিফল্ট পাসওয়ার্ড ট্রানজেকশন আইডি'}
                    type="password"
                />

                <div className="w-full mt-2">
                    <label className="font-li-ador-bold w-full text-slate-500 text-md">
                        <span className="pr-2">ব্যক্তিগত মতামত:</span>
                    </label>
                    <textarea
                        onChange={(e) => {
                            setForm({
                                ...form,
                                comment: e.target.value,
                            });
                        }}
                        value={form.comment}
                        placeholder="এখানে লিখুন..."
                        name="comment"
                        className="w-full bg-slate-50/50 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.04)] text-lg px-4 py-2 border border-slate-200 outline-none focus:ring-0 focus:border-secondary focus:bg-slate-50 focus:text-secondary rounded-md font-li-ador-semibold mt-0.5"
                    ></textarea>
                </div>

                <div className="w-full flex gap-3 mt-1">
                    <div className="w-full">
                        <label
                            htmlFor="image"
                            className="block mb-1 font-li-ador-bold font-bold text-lg text-slate-500"
                        >
                            আপনার প্রোফাইল ছবি
                            {/* <span className="px-2 text-xs text-rose-500 font-medium tracking-wide">
                            (400x400)
                        </span> */}
                        </label>
                        <label
                            htmlFor="profileImage"
                            className="w-full h-36 flex items-center bg-slate-50/50 justify-center gap-3 p-2 border border-dashed border-primary rounded-md text-common cursor-pointer relative"
                        >
                            <input
                                type="file"
                                id="profileImage"
                                className="hidden"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        profileImage: e.target.files
                                            ? e.target.files[0]
                                            : null,
                                    })
                                }
                            />
                            {form.profileImage instanceof File ? (
                                <Image
                                    alt="Image"
                                    src={URL.createObjectURL(form.profileImage)}
                                    fill
                                    unoptimized
                                    className="w-full h-full absolute rounded-md"
                                />
                            ) : (
                                <p className="text-center text-lg w-full p-5 font-li-ador-semibold text-primary">
                                    (৪০০x৪০০) px
                                    <br />
                                    এখানে আপলোড করুন...
                                </p>
                            )}
                        </label>
                    </div>
                    <div className="w-full">
                        <label
                            htmlFor="image"
                            className="block mb-1 font-li-ador-bold font-bold text-lg text-slate-500"
                        >
                            পেমেন্ট রেফারেন্স ছবি
                            {/* <span className="px-2 text-xs text-rose-500 font-medium tracking-wide">
                            (400x800)
                        </span> */}
                        </label>
                        <label
                            htmlFor="paymentRefImage"
                            className="w-full h-36 flex items-center bg-slate-50/50 justify-center gap-3 p-2 border border-dashed border-secondary rounded-md text-common cursor-pointer relative"
                        >
                            <input
                                type="file"
                                id="paymentRefImage"
                                className="appearance-none hidden"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        paymentRefImage: e.target.files
                                            ? e.target.files[0]
                                            : null,
                                    })
                                }
                            />
                            {form.paymentRefImage instanceof File ? (
                                <Image
                                    alt="Image"
                                    src={URL.createObjectURL(
                                        form.paymentRefImage
                                    )}
                                    fill
                                    unoptimized
                                    className="w-full h-full absolute rounded-md"
                                />
                            ) : (
                                <p className="text-center text-lg w-full p-5 font-li-ador-semibold text-secondary">
                                    (৪০০x৮০০) px
                                    <br />
                                    এখানে আপলোড করুন...
                                </p>
                            )}
                        </label>
                    </div>
                </div>

                <div className="w-full pt-4">
                    <button
                        type="submit"
                        className="text-xl font-li-ador-bold py-2 text-center w-full bg-secondary text-white rounded-md duration-500 hover:bg-primary hover:tracking-wide"
                    >
                        ফান্ড জমা দিন
                    </button>
                </div>
            </form>
        </>
    );
};

export default AddForm;
