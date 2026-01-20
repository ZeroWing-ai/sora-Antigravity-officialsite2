import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [isError, setIsError] = useState(false);

    const handleSubmit = (e) => {
        // Note: In a real React app, you might want to handle submission via API route
        // or keep the default form action behavior.
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            e.preventDefault();
            setIsError(true);
        } else {
            setIsError(false);
            // Let the form submit naturally to the external URL
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-[#0f0f0f] text-white font-sans overflow-hidden relative">
            {/* Background Mesh */}
            <div
                className="fixed top-0 left-0 w-full h-full -z-10 opacity-30"
                style={{
                    background: `
            radial-gradient(circle at 15% 50%, rgba(76, 140, 100, 0.15), transparent 25%),
            radial-gradient(circle at 85% 30%, rgba(50, 50, 80, 0.2), transparent 25%)
          `
                }}
            />

            {/* Navigation */}
            <nav className="w-full p-6 flex justify-between items-center z-10 max-w-6xl">
                <a href="/" className="text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity">そら</a>
                <a href="/" className="text-sm text-gray-400 hover:text-white transition-colors">← Portfolio</a>
            </nav>

            {/* Main Content */}
            <main className="w-full max-w-4xl px-4 py-12 flex flex-col items-center text-center z-10">

                {/* Hero Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <span className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wider text-[#4C8C64] uppercase bg-[#4C8C64]/10 rounded-full border border-[#4C8C64]/20">
                        Official Newsletter
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
                        未来の<br className="md:hidden" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-br from-[#4C8C64] to-[#a8e063]">
                            創造性
                        </span>を、<br />
                        あなたの<br className="md:hidden" />受信箱へ。
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        AI、デザイン、そして「バイブコーディング」の裏側。<br />
                        日々進化するテクノロジーと遊び心をミックスした、<br className="hidden md:block" />
                        ここだけのインサイトをお届けします。
                    </p>
                </motion.section>

                {/* Social Proof */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="mb-12 flex items-center justify-center space-x-2 text-sm text-gray-500"
                >
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="w-6 h-6 rounded-full bg-gray-700 border border-[#0f0f0f]" />
                        ))}
                    </div>
                    <span>すでに <span className="text-white font-bold">150名</span> 以上が購読中</span>
                </motion.div>

                {/* Subscription Form */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="w-full max-w-md mx-auto relative group"
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#4C8C64] to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8 shadow-2xl">
                        <h3 className="text-xl font-bold mb-2">ニュースレターに登録</h3>
                        <p className="text-sm text-gray-400 mb-6">スパムは送りません。解除はいつでも可能です。</p>

                        <form
                            action="https://mail.os7.biz/add/dKmu"
                            method="post"
                            className="space-y-4"
                            onSubmit={handleSubmit}
                        >
                            <div className="text-left">
                                <label htmlFor="email" className="sr-only">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    placeholder="example@email.com"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setIsError(false);
                                    }}
                                    className={`w-full px-4 py-3 bg-[#0f0f0f]/50 border rounded-lg focus:outline-none focus:border-[#4C8C64] focus:ring-1 focus:ring-[#4C8C64] transition-colors text-white placeholder-gray-600 ${isError ? 'border-red-500' : 'border-gray-700'}`}
                                />
                                {isError && (
                                    <p className="text-red-500 text-xs mt-1">有効なメールアドレスを入力してください。</p>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="w-full px-4 py-3 bg-[#4C8C64] hover:bg-[#3d7a53] text-white font-bold rounded-lg transition-all transform hover:scale-[1.02] shadow-lg shadow-[#4C8C64]/20"
                            >
                                無料で登録する
                            </button>
                        </form>
                    </div>
                </motion.div>

                {/* Features / About */}
                <section className="mt-24 grid md:grid-cols-3 gap-6 text-left w-full">
                    {[
                        { icon: "🤖", title: "AI & Tech", desc: "最新の生成AIツールや、実際の開発フローでの活用事例をシェア。" },
                        { icon: "🎨", title: "Design", desc: "UI/UXのトレンドや、エンジニア視点でのデザイン思考について。" },
                        { icon: "💭", title: "Vibe Coding", desc: "「どう書くか」より「どう感じるか」。直感的な開発スタイルの裏側。" },
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + (index * 0.1) }}
                            className="bg-white/5 backdrop-blur border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-colors"
                        >
                            <div className="text-2xl mb-4">{item.icon}</div>
                            <h3 className="font-bold mb-2 text-white">{item.title}</h3>
                            <p className="text-sm text-gray-400">{item.desc}</p>
                        </motion.div>
                    ))}
                </section>

            </main>

            <footer className="w-full p-8 text-center text-gray-600 text-xs z-10 mt-auto">
                &copy; 2025 Sora. All rights reserved.
            </footer>
        </div>
    );
};

export default Newsletter;
