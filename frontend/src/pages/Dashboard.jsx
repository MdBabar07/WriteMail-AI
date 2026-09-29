import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import api from '../utils/api';

import {
    ClipboardDocumentIcon,
    CheckIcon,
    SparklesIcon,
    ArrowUpRightIcon,
    EnvelopeIcon,
    ChatBubbleLeftRightIcon,
    ClockIcon,
    PaperAirplaneIcon,
} from '@heroicons/react/24/outline';

const Dashboard = () => {
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [copied, setCopied] = useState('');

    const handleGenerate = async (e) => {
        e.preventDefault();

        if (!prompt.trim()) {
            toast.error('Please describe the email you need.');
            return;
        }

        setLoading(true);

        try {
            const { data } = await api.post('/ai/generate-email', {
                prompt,
            });

            setResult(data);
            toast.success('Email generated successfully!');
        } catch (error) {
            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                'Failed to generate. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = async (text, type) => {
        try {
            await navigator.clipboard.writeText(text);

            setCopied(type);
            toast.success('Copied to clipboard!');

            setTimeout(() => {
                setCopied('');
            }, 2000);
        } catch (error) {
            toast.error('Could not copy text.');
        }
    };

    const usePrompt = (text) => {
        setPrompt(text);
    };

    const ResultCard = ({
        title,
        content,
        type,
        icon: Icon,
        large = false,
    }) => {
        if (!content || !content.trim()) return null;

        return (
            <div
                className={`group bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_18px_50px_rgba(79,70,229,0.08)] ${
                    large ? 'mb-5' : ''
                }`}
            >
                {/* Card Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-indigo-600" />
                        </div>

                        <div>
                            <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-gray-400">
                                {type === 'subject' ? 'Subject' : 'Generated'}
                            </p>

                            <h3 className="text-sm font-semibold text-gray-900 mt-0.5">
                                {title}
                            </h3>
                        </div>
                    </div>

                    <button
                        onClick={() => copyToClipboard(content, type)}
                        className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                        title="Copy"
                    >
                        {copied === type ? (
                            <CheckIcon className="w-5 h-5 text-emerald-600" />
                        ) : (
                            <ClipboardDocumentIcon className="w-5 h-5" />
                        )}
                    </button>
                </div>

                {/* Card Body */}
                <div className={`px-6 py-6 ${large ? 'min-h-[260px]' : ''}`}>
                    <p
                        className={`whitespace-pre-wrap text-gray-600 leading-7 ${
                            large ? 'text-[15px]' : 'text-sm'
                        }`}
                    >
                        {content}
                    </p>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-[calc(100vh-64px)] bg-white text-gray-900">

            {/* ================= COMPACT HEADER ================= */}
            <header className="relative overflow-hidden border-b border-gray-100 bg-white">

                {/* Soft background glow */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute left-1/2 -top-48 w-[700px] h-[400px] -translate-x-1/2 rounded-full bg-indigo-100/50 blur-3xl" />
                    <div className="absolute right-[-120px] top-20 w-[280px] h-[280px] rounded-full bg-violet-100/40 blur-3xl" />
                </div>

                <div className="relative max-w-[1450px] mx-auto px-5 sm:px-8 py-5">

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                        {/* Heading */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">

                                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-500/20">
                                    <SparklesIcon className="w-4 h-4 text-white" />
                                </div>

                                <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-indigo-600">
                                    WriteMail AI
                                </span>
                            </div>

                            <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                                Write better emails.
                                <span className="ml-2 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                                    In seconds.
                                </span>
                            </h1>

                            <p className="mt-2 text-sm text-gray-500 max-w-2xl leading-6">
                                Tell WriteMail AI what you want to say and get a
                                clear, professional email ready to send.
                            </p>
                        </div>

                        {/* Status */}
                        <div className="flex items-center gap-2">

                            <div className="flex items-center gap-2 px-3.5 py-2 bg-white border border-gray-200 rounded-full shadow-sm text-xs text-gray-500">
                                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                AI ready
                            </div>

                            <div className="hidden md:flex items-center gap-2 px-3.5 py-2 bg-white border border-gray-200 rounded-full shadow-sm text-xs text-gray-500">
                                <ClockIcon className="w-4 h-4 text-indigo-500" />
                                Instant generation
                            </div>

                        </div>
                    </div>
                </div>
            </header>


            {/* ================= MAIN WORKSPACE ================= */}
            <main className="max-w-[1450px] mx-auto px-5 sm:px-8 py-6">

                <div className="grid grid-cols-1 xl:grid-cols-[390px_minmax(0,1fr)] gap-6 items-start">

                    {/* ================= LEFT COMPOSER ================= */}
                    <aside className="xl:sticky xl:top-6">

                        <div className="relative overflow-hidden bg-gray-950 text-white rounded-[24px] p-6 shadow-[0_25px_70px_rgba(30,27,75,0.15)]">

                            {/* Background glow */}
                            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-indigo-600/20 blur-3xl" />

                            <div className="relative">

                                {/* Composer Header */}
                                <div className="flex items-start justify-between mb-6">

                                    <div>
                                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold">
                                            New message
                                        </p>

                                        <h2 className="text-2xl font-bold tracking-tight mt-1.5">
                                            What do you need?
                                        </h2>
                                    </div>

                                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-white/10 flex items-center justify-center">
                                        <EnvelopeIcon className="w-5 h-5 text-indigo-300" />
                                    </div>

                                </div>


                                {/* Form */}
                                <form onSubmit={handleGenerate}>

                                    <label className="block text-xs font-medium text-white/60 mb-2">
                                        Describe your email
                                    </label>

                                    <textarea
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                        maxLength={2000}
                                        className="w-full min-h-[240px] resize-none rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-5 text-sm text-white placeholder:text-white/30 outline-none transition-all focus:border-indigo-400 focus:bg-white/[0.09] focus:ring-1 focus:ring-indigo-400"
                                        placeholder={`Tell me what you want to say...

Example:
I need two days leave from office because of a family function.`}
                                    />

                                    <div className="flex justify-between items-center mt-2 px-1">

                                        <span className="text-[11px] text-white/30">
                                            {prompt.length} / 2000
                                        </span>

                                        {prompt && (
                                            <button
                                                type="button"
                                                onClick={() => setPrompt('')}
                                                className="text-[11px] text-white/40 hover:text-white transition-colors"
                                            >
                                                Clear
                                            </button>
                                        )}

                                    </div>


                                    {/* Generate */}
                                    <button
                                        type="submit"
                                        disabled={loading || !prompt.trim()}
                                        className="mt-4 w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3.5 px-5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-indigo-600/20"
                                    >

                                        {loading ? (
                                            <>
                                                <svg
                                                    className="animate-spin w-5 h-5"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="3"
                                                    />

                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                                    />
                                                </svg>

                                                Writing your email...
                                            </>
                                        ) : (
                                            <>
                                                Generate Email
                                                <ArrowUpRightIcon className="w-4 h-4" />
                                            </>
                                        )}

                                    </button>

                                </form>


                                {/* Quick Prompts */}
                                <div className="mt-6 pt-5 border-t border-white/10">

                                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/35 font-semibold mb-3">
                                        Try an example
                                    </p>

                                    <div className="space-y-2">

                                        <button
                                            type="button"
                                            onClick={() =>
                                                usePrompt(
                                                    'Write a professional email requesting leave from my manager.'
                                                )
                                            }
                                            className="w-full text-left px-4 py-3 rounded-xl bg-white/[0.05] hover:bg-indigo-500/10 border border-white/[0.06] hover:border-indigo-400/20 text-xs text-white/60 hover:text-white transition-all"
                                        >
                                            Request for leave
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                usePrompt(
                                                    'Write a professional email applying for a software developer job.'
                                                )
                                            }
                                            className="w-full text-left px-4 py-3 rounded-xl bg-white/[0.05] hover:bg-indigo-500/10 border border-white/[0.06] hover:border-indigo-400/20 text-xs text-white/60 hover:text-white transition-all"
                                        >
                                            Apply for a job
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                usePrompt(
                                                    'Write a polite follow-up email after a job application.'
                                                )
                                            }
                                            className="w-full text-left px-4 py-3 rounded-xl bg-white/[0.05] hover:bg-indigo-500/10 border border-white/[0.06] hover:border-indigo-400/20 text-xs text-white/60 hover:text-white transition-all"
                                        >
                                            Follow up on an application
                                        </button>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </aside>


                    {/* ================= RIGHT OUTPUT ================= */}
                    <section className="min-w-0">

                        {!result ? (

                            <div className="min-h-[620px] bg-gradient-to-br from-indigo-50/70 via-white to-violet-50/60 border border-indigo-100 rounded-[24px] flex items-center justify-center relative overflow-hidden">

                                {/* Decorative circles */}
                                <div className="absolute -top-28 -right-28 w-72 h-72 rounded-full border border-indigo-100" />

                                <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full border border-violet-100" />

                                <div className="relative text-center max-w-md px-6">

                                    <div className="mx-auto w-18 h-18 w-[72px] rounded-2xl bg-white border border-indigo-100 shadow-lg shadow-indigo-500/5 flex items-center justify-center mb-6">

                                        <SparklesIcon className="w-8 h-8 text-indigo-600" />

                                    </div>

                                    <p className="text-[10px] uppercase tracking-[0.22em] text-indigo-500 font-semibold mb-3">
                                        Your workspace
                                    </p>

                                    <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">

                                        Your next email
                                        <br />

                                        <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                                            starts here.
                                        </span>

                                    </h2>

                                    <p className="mt-4 text-sm leading-6 text-gray-500">
                                        Describe what you need on the left.
                                        We'll turn your rough idea into a
                                        polished email ready to send.
                                    </p>

                                    <div className="mt-7 flex flex-wrap justify-center gap-2">

                                        <span className="px-4 py-2 bg-white border border-gray-200 rounded-full text-[11px] text-gray-500">
                                            Leave requests
                                        </span>

                                        <span className="px-4 py-2 bg-white border border-gray-200 rounded-full text-[11px] text-gray-500">
                                            Job applications
                                        </span>

                                        <span className="px-4 py-2 bg-white border border-gray-200 rounded-full text-[11px] text-gray-500">
                                            Cold outreach
                                        </span>

                                    </div>

                                </div>
                            </div>

                        ) : (

                            <div>

                                {/* Result heading */}
                                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5">

                                    <div>

                                        <div className="flex items-center gap-2 mb-2">

                                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>

                                            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-semibold">
                                                Generated
                                            </span>

                                        </div>

                                        <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                                            Your email is ready.
                                        </h2>

                                    </div>

                                    <button
                                        onClick={() => setResult(null)}
                                        className="self-start sm:self-auto px-4 py-2.5 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600 hover:bg-gray-50 hover:border-indigo-200 transition-colors"
                                    >
                                        Start new email
                                    </button>

                                </div>


                                {/* Subject */}
                                <ResultCard
                                    title="Subject Line"
                                    content={result.subject}
                                    type="subject"
                                    icon={EnvelopeIcon}
                                />


                                {/* Main Email */}
                                <ResultCard
                                    title="Email"
                                    content={result.emailBody}
                                    type="email"
                                    icon={PaperAirplaneIcon}
                                    large
                                />


                                {/* LinkedIn */}
                                {result.linkedInDM &&
                                    result.linkedInDM.trim() !== '' && (
                                        <ResultCard
                                            title="LinkedIn DM"
                                            content={result.linkedInDM}
                                            type="linkedin"
                                            icon={ChatBubbleLeftRightIcon}
                                        />
                                    )}


                                {/* Follow Up */}
                                {result.followUpEmail &&
                                    result.followUpEmail.trim() !== '' && (
                                        <ResultCard
                                            title="Follow-up Email"
                                            content={result.followUpEmail}
                                            type="followup"
                                            icon={ClockIcon}
                                        />
                                    )}


                                {/* Bottom Note */}
                                <div className="mt-5 px-5 py-4 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-start gap-3">

                                    <SparklesIcon className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />

                                    <p className="text-xs leading-5 text-gray-500">
                                        Review the generated email before sending.
                                        AI-generated content can contain assumptions
                                        that should be checked and personalized.
                                    </p>

                                </div>

                            </div>
                        )}

                    </section>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;