'use client'; // ০১৮১৭৮০৭৫৯৪ -
import React from 'react';
import AddForm from './components/AddForm';
import { FunderLists } from './components/FunderList';

const conditions: ConditionItemProps[] = [
    {
        id: 6,
        title: 'বিকাশ <span class="text-primary text-sm font-li-ador-semibold px-2">(পার্সোনাল)</span>',
        icon: '',
        summary:
            'আমাদের বিকাশ নম্বরে পেমেন্ট করার জন্য <span class="text-primary font-bold text-lg px-1 tracking-wide">01817807594</span> এই নম্বরে সেনডমানি করুন! সেনডমানি সফল হলে ট্রান্সজেকশন নম্বর টি ফর্মে বসান।',
    },
    {
        id: 7,
        title: 'নগদ <span class="text-primary text-sm font-li-ador-semibold px-2">(পার্সোনাল)</span>',
        icon: '',
        summary:
            'আমাদের নগদ নম্বরে পেমেন্ট করার জন্য <span class="text-primary font-bold text-lg px-1 tracking-wide">01817807594</span> এই নম্বরে সেনডমানি করুন! সেনডমানি সফল হলে ট্রান্সজেকশন নম্বর টি ফর্মে বসান।',
    },
    {
        id: 8,
        title: 'রকেট <span class="text-primary text-sm font-li-ador-semibold px-2">(পার্সোনাল)</span>',
        icon: '',
        summary:
            'আমাদের রকেট নম্বরে পেমেন্ট করার জন্য <span class="text-primary font-bold text-lg px-1 tracking-wide">01817807594</span> এই নম্বরে সেনডমানি করুন! সেনডমানি সফল হলে ট্রান্সজেকশন নম্বর টি ফর্মে বসান।',
    },
    {
        id: 9,
        title: 'উপায় <span class="text-primary text-sm font-li-ador-semibold px-2">(পার্সোনাল)</span>',
        icon: '',
        summary:
            'আমাদের উপায় নম্বরে পেমেন্ট করার জন্য <span class="text-primary font-bold text-lg px-1 tracking-wide">01817807594</span> এই নম্বরে সেনডমানি করুন! সেনডমানি সফল হলে ট্রান্সজেকশন নম্বর টি ফর্মে বসান।',
    },
    {
        id: 10,
        title: 'ব্যাংক ট্রান্সফার <span class="text-primary text-sm font-li-ador-semibold px-2">(পার্সোনাল - DBBL - Nexus)</span>',
        icon: '',
        summary:
            'আমাদের ব্যাংক ট্রান্সফার নম্বরে পেমেন্ট করার জন্য <span class="text-primary font-bold text-lg px-1 tracking-wide">2956 - 1152 - 3400 - 2195</span> এই নম্বরে সেনডমানি করুন! সেনডমানি সফল হলে ট্রান্সজেকশন নম্বর টি ফর্মে বসান।',
    },
    {
        id: 1,
        title: 'যোজ্যতা',
        icon: '<i class="fa-solid fa-paperclip"></i>',
        summary:
            'এই ফান্ড সংগ্রহের কার্যক্রমে অংশগ্রহণ কেবলমাত্র বৈদ্যুতিক প্রকৌশল বিভাগের ৮ম সেমিস্টারের শিক্ষার্থীদের জন্য উন্মুক্ত। অংশগ্রহণের জন্য শিক্ষার্থীর ভর্তি প্রমাণপত্র প্রদর্শনের প্রয়োজন হতে পারে।',
    },
    {
        id: 2,
        title: 'দানের উদ্দেশ্য',
        icon: '<i class="fa-solid fa-truck-fast"></i>',
        summary:
            'এই কার্যক্রমের মাধ্যমে সংগৃহীত সমস্ত তহবিল কেবলমাত্র অংশগ্রহণকারী শিক্ষার্থীদের এসাইনমেন্ট প্রকল্পের জন্য ব্যবহৃত হবে। অব্যবহৃত তহবিল ভবিষ্যতে বৈদ্যুতিক প্রকৌশল বিভাগের শিক্ষামূলক প্রকল্পগুলির জন্য পুনঃনির্দেশিত হবে।',
    },
    {
        id: 3,
        title: 'দান স্বচ্ছতা',
        icon: '<i class="fa-solid fa-fire"></i>',
        summary:
            'দাতাদের তহবিল সংগ্রহের প্রচারের অগ্রগতি এবং তাদের দানের ব্যবহারের উপর নিয়মিত আপডেট দেওয়া হবে। সমস্ত দাতাদের জন্য তহবিলের বরাদ্দ সম্পর্কিত একটি চূড়ান্ত প্রতিবেদন শেয়ার করা হবে।',
    },
    {
        id: 4,
        title: 'ফিরিয়ে দেওয়ার নীতি',
        icon: '<i class="fa-solid fa-handshake"></i>',
        summary:
            'এই কার্যক্রমে দান করা তহবিল ফেরত দেওয়া যাবে না। দানে অংশগ্রহণ করে দাতারা স্বীকার করেন যে তাদের তহবিল নির্দিষ্ট উদ্দেশ্যে ব্যবহার করা হবে এবং তাদের অবদান সম্পর্কে তারা সচেতন।',
    },
    {
        id: 5,
        title: 'আচার-আচরণ বিধি',
        icon: '<i class="fa-brands fa-slack"></i>',
        summary:
            'অংশগ্রহণকারী এবং দাতাদের জন্য এই ফান্ড সংগ্রহের প্রক্রিয়ার মধ্যে সম্মানজনক এবং সহায়ক পরিবেশ বজায় রাখার প্রত্যাশা করা হয়। যে কোনো ধরনের অনৈতিক আচরণ, হয়রানি বা অসদাচরণ কার্যক্রম থেকে বাতিল করে দেবে।',
    },
    {
        id: 11,
        title: 'ফিডব্যাক',
        icon: '<i class="fa-brands fa-slack"></i>',
        summary:
            'অংশগ্রহণকারী এবং দাতাদের জন্য এই ফান্ড সংগ্রহের প্রক্রিয়ার মধ্যে সম্মানজনক এবং সহায়ক পরিবেশ বজায় রাখার প্রত্যাশা করা হয়। যে কোনো ধরনের অনৈতিক আচরণ, হয়রানি বা অসদাচরণ কার্যক্রম থেকে বাতিল করে দেবে।',
    },
];

export default function Home() {
    return (
        <div className="w-full min-h-screen overflow-x-hidden flex flex-col items-center justify-center bg-white bg-gradient-to-tr from-blue-300/10 to-pink-300/10 via-purple-300/10">
            <div className="container p-2">
                <div className="w-full p-0 sm:p-6 lg:p-10 sm:shadow-[0px_1px_2px_0px_rgba(0,0,0,0.08)] sm:border border-solid border-slate-200 sm:rounded-3xl">
                    <div className="">
                        <h1 className="text-center font-li-ador-bold text-5xl text-secondary">
                            ফান্ড সংগ্রহকরণ
                        </h1>
                        <h2 className="text-3xl font-li-ador-semibold text-slate-700 text-center pt-3">
                            ইলেকট্রিক্যাল
                            <span className="px-2 font-li-ador-bold text-4xl text-primary">
                                ৮ম
                            </span>
                            সেমিস্টারের শিক্ষার্থীদের এসাইনমেন্ট প্রজেক্টের
                            জন্য!
                        </h2>

                        <hr className="w-full h-px bg-slate-300 my-6" />

                        <div
                            className="w-full flex-col lg:flex-row flex gap-4"
                            id="fund-add-form"
                        >
                            <AddForm />

                            {/* Terms & Conditions */}
                            <div
                                className="w-full h-full bg-white rounded-2xl p-5"
                                id="terms-and-conditions"
                            >
                                <h1 className="font-li-ador-bold text-2xl text-primary border-b-2 border-dashed border-primary/50 mb-3">
                                    শর্তাবলী
                                </h1>
                                <div className="w-full">
                                    {conditions.map((condition) => (
                                        <ConditionItem
                                            {...condition}
                                            key={condition.id}
                                        />
                                    ))}
                                </div>
                                <p className="w-full text-end text-slate-400 font-medium italic">
                                    Developed by SYED AMIR ALI
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Show All Items */}
                <FunderLists />
            </div>
        </div>
    );
}

interface ConditionItemProps {
    id: number;
    title: string;
    summary: string;
    icon: string | JSX.Element;
}

const ConditionItem: React.FC<ConditionItemProps> = ({ title, summary }) => {
    return (
        <div className="w-full pt-4">
            <h3 className="font-li-ador-semibold text-xl text-secondary flex gap-2 items-center pb-0.5">
                <span
                    className="text-slate-500 block text-sm"
                    dangerouslySetInnerHTML={{
                        __html: '<i class="fa-solid fa-angles-right"></i>',
                    }}
                ></span>
                <span dangerouslySetInnerHTML={{ __html: title }}></span>
            </h3>
            <p
                className="text-lg font-li-ador text-slate-600 leading-[1.3]"
                dangerouslySetInnerHTML={{ __html: summary }}
            ></p>
        </div>
    );
};
