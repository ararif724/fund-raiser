import { NextResponse } from 'next/server';
import path from 'path';
import { writeFile } from 'fs/promises';
import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid';
const prisma = new PrismaClient();

export const GET = async () => {
    try {
        const funders = await prisma.funder.findMany();

        return NextResponse.json(funders, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: 'Server Error!', error },
            { status: 500 }
        );
    }
};

export const PATCH = async (req: Request) => {
    // Parse the URL to get query parameters
    const url = new URL(req.url);
    const getPassKey = url.searchParams.get('pass-key');
    const getType = url.searchParams.get('type');
    const id = url.searchParams.get('id');

    const passKey = 'syed0amir1ali'; // process.env.NEXT_PASS_KEY;

    if (passKey !== getPassKey) {
        return NextResponse.json(
            { message: 'Wrong Credentials' },
            { status: 401 }
        );
    }

    if (getType === 'delete') {
        const funder = await prisma.funder.delete({
            where: { id: Number(id) },
        });
        return NextResponse.json(
            { funder, message: 'Funder Delete Successfully!' },
            { status: 200 }
        );
    }

    const funder = await prisma.funder.findFirst({
        select: { id: true, isVerified: true },
        where: { id: Number(id) },
    });

    const updatedFunder = await prisma.funder.update({
        where: { id: funder?.id }, // Ensure the id is a number
        data: {
            isVerified: !funder?.isVerified,
        },
    });
    return NextResponse.json({ updatedFunder }, { status: 200 });
};

export const POST = async (req: Request) => {
    const formData = await req.formData();

    const profileImage = formData.get('profileImage') as File;
    const paymentRefImage = formData.get('paymentRefImage') as File;

    const amount = formData.get('amount') as string;
    // const sameAccount = formData.get('sameAccount') === 'true'; // Adjust based on your input method
    const phone = formData.get('phone') as string;
    const account = formData.get('account') as string;
    const transactionId = formData.get('transactionId') as string;
    const name = formData.get('name') as string;
    const roll = formData.get('roll') as string;
    const registration = formData.get('registration') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const comment = formData.get('comment') as string;
    const accountType = formData.get('accountType') as string;

    const filePath: string = 'public/uploads/';

    try {
        const checkExistingFunder = await prisma.funder.findFirst({
            select: { roll: true },
            where: { roll: Number(roll) },
        });

        if (checkExistingFunder) {
            return NextResponse.json(
                {
                    status: 'warning',
                    message:
                        'ফান্ডারের রোল ইতিমধ্যে গ্রহণ করা হয়েছে! অনুগ্রহপূর্বক নতুন রোল নাম্বার দিয়ে এন্ট্রি করুন।',
                },
                { status: 409 }
            );
        }
    } catch (error) {
        return NextResponse.json(
            {
                message:
                    'সার্ভারে সমস্যা হয়েছে! অনুগ্রহপূর্বক কিছুক্ষন পর আবার চেষ্টা করুন।',
                error,
            },
            { status: 500 }
        );
    }

    try {
        // Process profile image
        let profileImageFilename: string | null = null;
        let paymentRefImageFilename: string | null = null;

        if (profileImage) {
            const profileImageBuffer = Buffer.from(
                await profileImage.arrayBuffer()
            );
            profileImageFilename = `${uuid()}___${profileImage.name.replaceAll(
                ' ',
                '_'
            )}`;

            await writeFile(
                path.join(process.cwd(), filePath, profileImageFilename),
                profileImageBuffer
            );
        }

        // Process payment reference image
        if (paymentRefImage) {
            const paymentRefImageBuffer = Buffer.from(
                await paymentRefImage.arrayBuffer()
            );

            paymentRefImageFilename = `${uuid()}___${paymentRefImage.name.replaceAll(
                ' ',
                '_'
            )}`;

            await writeFile(
                path.join(process.cwd(), filePath, paymentRefImageFilename),
                paymentRefImageBuffer
            );
        }

        const getProfileImage = profileImageFilename
            ? 'uploads/' + profileImageFilename
            : null;
        const getPaymentRefImage = paymentRefImageFilename
            ? 'uploads/' + paymentRefImageFilename
            : null;

        // Create user data in the database
        const newFunder = await prisma.funder.create({
            data: {
                name,
                roll: parseInt(roll, 10), // Ensure it's an integer
                registration: parseInt(registration, 10) || null,
                transactionId,
                account,
                amount: parseFloat(amount), // Ensure it's a decimal
                comment,
                email,
                phone,
                profileImage: getProfileImage,
                paymentRefImage: getPaymentRefImage,
                accountType,
                password, // Store the hashed password in production
                // sameAccount,
                createdAt: new Date(), // Optional if you have a default in your schema
            },
        });

        return NextResponse.json(
            {
                message: 'আপনার ফান্ড সফলভাবে জমা হয়েছে! ধন্যবাদ।',
                data: newFunder,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error occurred:', error);
        return NextResponse.json(
            {
                message:
                    'সার্ভারে সমস্যা হয়েছে! অনুগ্রহপূর্বক কিছুক্ষন পর আবার চেষ্টা করুন।',
            },
            { status: 500 }
        );
    }
};
