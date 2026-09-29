import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    ArrowRightIcon,
    BoltIcon,
    SparklesIcon,
    ChatBubbleLeftRightIcon,
    CheckIcon,
    DocumentTextIcon,
    ClockIcon,
} from '@heroicons/react/24/outline';

const LandingPage = () => {
    const { user } = useAuth();

    const features = [
        {
            icon: SparklesIcon,
            title: 'AI-Powered Writing',
            description:
                'Turn a simple idea into a polished, professional email in seconds.',
        },
        {
            icon: BoltIcon,
            title: 'Generate in Seconds',
            description:
                'Stop wasting time staring at a blank email. Describe what you need and let AI handle the writing.',
        },
        {
            icon: ChatBubbleLeftRightIcon,
            title: 'Complete Outreach',
            description:
                'For outreach, generate the email, LinkedIn DM and follow-up together.',
        },
        {
            icon: DocumentTextIcon,
            title: 'Any Type of Email',
            description:
                'Leave requests, job applications, complaints, thank-you emails, outreach and more.',
        },
        {
            icon: ClockIcon,
            title: 'Save Your Time',
            description:
                'Get a strong first draft instantly instead of spending 20 minutes writing one email.',
        },
        {
            icon: CheckIcon,
            title: 'Natural & Professional',
            description:
                'Emails are written to sound clear, human and appropriate for the situation.',
        },
    ];

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">

            {/* ================= NAVBAR ================= */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-100/80 bg-white/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-5 sm:px-8">
                    <div className="h-20 flex items-center justify-between">

                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2.5">
                            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                                <SparklesIcon className="h-5 w-5 text-white" />
                            </div>

                            <span className="text-xl font-extrabold tracking-tight">
                                WriteMail
                                <span className="text-indigo-600"> AI</span>
                            </span>
                        </Link>

                        {/* Navigation */}
                        <div className="flex items-center gap-3">
                            {user ? (
                                <Link
                                    to="/dashboard"
                                    className="group inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/20"
                                >
                                    Dashboard
                                    <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="hidden sm:block px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                                    >
                                        Log in
                                    </Link>

                                    <Link
                                        to="/signup"
                                        className="group inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/20"
                                    >
                                        Get Started
                                        <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>


            {/* ================= HERO ================= */}
            <main>

                <section className="relative overflow-hidden pt-32 pb-8 sm:pt-40 sm:pb-10">

                    {/* Background glow */}
                    <div className="absolute inset-0 -z-10 overflow-hidden">
                        <div className="absolute left-1/2 top-[-180px] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-indigo-100/60 blur-3xl" />
                        <div className="absolute right-[-150px] top-[250px] h-[400px] w-[400px] rounded-full bg-violet-100/50 blur-3xl" />
                    </div>

                    <div className="max-w-7xl mx-auto px-5 sm:px-8">

                        <div className="max-w-4xl mx-auto text-center">

                            {/* Small badge */}
                            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 mb-7">
                                <SparklesIcon className="h-4 w-4" />
                                AI-powered email writing
                            </div>

                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]">
                                Write better emails.
                                <br />
                                <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                                    In seconds.
                                </span>
                            </h1>

                            <p className="mt-7 max-w-2xl mx-auto text-lg sm:text-xl leading-8 text-gray-600">
                                Tell WriteMail AI what you want to say.
                                Get a clear, professional email ready to send —
                                whether it&apos;s a simple request or a complete outreach sequence.
                            </p>

                            {/* CTA */}
                            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">

                                <Link
                                    to={user ? "/dashboard" : "/signup"}
                                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-gray-900 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-gray-900/10 transition-all hover:-translate-y-0.5 hover:bg-indigo-600 hover:shadow-indigo-500/20"
                                >
                                    Start Writing for Free
                                    <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </Link>

                                {!user && (
                                    <Link
                                        to="/login"
                                        className="rounded-full border border-gray-200 bg-white px-8 py-4 text-base font-semibold text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50"
                                    >
                                        Log in
                                    </Link>
                                )}
                            </div>

                            <p className="mt-4 text-sm text-gray-400">
                                No complicated setup. Just describe what you need.
                            </p>
                        </div>

                    </div>
                </section>


                {/* ================= FEATURES ================= */}
                <section className="pt-8 pb-24 sm:pt-10 sm:pb-32 bg-gray-50/70">
                    <div className="max-w-7xl mx-auto px-5 sm:px-8">

                        <div className="max-w-2xl mx-auto text-center mb-16">
                            <span className="text-sm font-semibold text-indigo-600">
                                SIMPLE. FAST. POWERFUL.
                            </span>

                            <h2 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight text-gray-900">
                                Everything you need to write better emails
                            </h2>

                            <p className="mt-5 text-lg text-gray-600 leading-8">
                                Whether you need a quick personal email or a complete
                                professional outreach sequence, WriteMail keeps the process simple.
                            </p>
                        </div>


                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

                            {features.map((feature) => {
                                const Icon = feature.icon;

                                return (
                                    <div
                                        key={feature.title}
                                        className="group rounded-2xl border border-gray-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/5"
                                    >
                                        <div className="h-11 w-11 rounded-xl bg-indigo-50 flex items-center justify-center transition-colors group-hover:bg-indigo-600">
                                            <Icon className="h-5 w-5 text-indigo-600 group-hover:text-white transition-colors" />
                                        </div>

                                        <h3 className="mt-6 text-lg font-bold text-gray-900">
                                            {feature.title}
                                        </h3>

                                        <p className="mt-3 text-sm leading-6 text-gray-600">
                                            {feature.description}
                                        </p>
                                    </div>
                                );
                            })}

                        </div>
                    </div>
                </section>


                {/* ================= HOW IT WORKS ================= */}
                <section className="py-24 sm:py-32 bg-white">
                    <div className="max-w-6xl mx-auto px-5 sm:px-8">

                        <div className="text-center mb-16">
                            <span className="text-sm font-semibold text-indigo-600">
                                HOW IT WORKS
                            </span>

                            <h2 className="mt-3 text-3xl sm:text-4xl font-black">
                                Three simple steps
                            </h2>
                        </div>


                        <div className="grid md:grid-cols-3 gap-10">

                            <div className="text-center">
                                <div className="mx-auto h-14 w-14 rounded-2xl bg-indigo-50 flex items-center justify-center">
                                    <span className="text-xl font-black text-indigo-600">
                                        01
                                    </span>
                                </div>

                                <h3 className="mt-6 text-lg font-bold">
                                    Tell us what you need
                                </h3>

                                <p className="mt-3 text-sm leading-6 text-gray-600">
                                    Describe the email in your own words.
                                    You don't need to write it perfectly.
                                </p>
                            </div>


                            <div className="text-center">
                                <div className="mx-auto h-14 w-14 rounded-2xl bg-violet-50 flex items-center justify-center">
                                    <span className="text-xl font-black text-violet-600">
                                        02
                                    </span>
                                </div>

                                <h3 className="mt-6 text-lg font-bold">
                                    Let AI write it
                                </h3>

                                <p className="mt-3 text-sm leading-6 text-gray-600">
                                    WriteMail understands the intent and creates
                                    an email suited to your request.
                                </p>
                            </div>


                            <div className="text-center">
                                <div className="mx-auto h-14 w-14 rounded-2xl bg-purple-50 flex items-center justify-center">
                                    <span className="text-xl font-black text-purple-600">
                                        03
                                    </span>
                                </div>

                                <h3 className="mt-6 text-lg font-bold">
                                    Copy & send
                                </h3>

                                <p className="mt-3 text-sm leading-6 text-gray-600">
                                    Review the result, copy it and send it.
                                    That's it.
                                </p>
                            </div>

                        </div>
                    </div>
                </section>


                {/* ================= CTA ================= */}
                <section className="relative overflow-hidden bg-gray-950 py-24 sm:py-32">

                    <div className="absolute inset-0">
                        <div className="absolute left-1/2 top-[-250px] h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-3xl" />
                    </div>

                    <div className="relative max-w-3xl mx-auto px-5 sm:px-8 text-center">

                        <div className="mx-auto h-14 w-14 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center">
                            <SparklesIcon className="h-7 w-7 text-indigo-300" />
                        </div>

                        <h2 className="mt-7 text-4xl sm:text-5xl font-black tracking-tight text-white">
                            Your next email can take
                            <span className="text-indigo-400"> seconds.</span>
                        </h2>

                        <p className="mt-6 text-lg leading-8 text-gray-400">
                            Stop overthinking what to write.
                            Tell WriteMail what you need and let AI create the first draft.
                        </p>

                        <div className="mt-10">
                            <Link
                                to={user ? "/dashboard" : "/signup"}
                                className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-gray-900 transition-all hover:bg-indigo-50 hover:scale-105"
                            >
                                Start Writing for Free
                                <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>

                    </div>
                </section>

            </main>


            {/* ================= FOOTER ================= */}
            <footer className="border-t border-gray-100 bg-white">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10">

                    <div className="flex flex-col md:flex-row items-center justify-between gap-5">

                        <Link to="/" className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                                <SparklesIcon className="h-4 w-4 text-white" />
                            </div>

                            <span className="font-extrabold">
                                WriteMail
                                <span className="text-indigo-600"> AI</span>
                            </span>
                        </Link>

                        <p className="text-sm text-gray-400">
                            ©️ {new Date().getFullYear()} WriteMail AI. All rights reserved.
                        </p>

                    </div>
                </div>
            </footer>

        </div>
    );
};

export default LandingPage;