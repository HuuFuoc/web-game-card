import React, { useState } from 'react';
import Footer from "../components/MyFooter";
import Navbar from "../components/MyNavbar";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Gửi dữ liệu tới backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const communityLinks = [
    {
      name: 'Facebook',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      url: 'https://facebook.com/gamecard',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      name: 'Discord',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
      ),
      url: 'https://discord.gg/gamecard',
      color: 'bg-indigo-600 hover:bg-indigo-700'
    },
    {
      name: 'YouTube',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      url: 'https://youtube.com/gamecard',
      color: 'bg-red-600 hover:bg-red-700'
    },
    {
      name: 'TikTok',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      ),
      url: 'https://tiktok.com/@gamecard',
      color: 'bg-black hover:bg-gray-800'
    }
  ];

  const faqs = [
    {
      question: "Tôi bị mất mật khẩu thì làm sao?",
      answer: "Bạn có thể click vào 'Quên mật khẩu' ở trang đăng nhập, nhập email và chúng tôi sẽ gửi link đặt lại mật khẩu cho bạn."
    },
    {
      question: "Nạp tiền không vào thì báo ở đâu?",
      answer: "Vui lòng gửi thông tin giao dịch (mã giao dịch, số tiền, thời gian) qua form liên hệ hoặc email support@gamecard.com. Chúng tôi sẽ xử lý trong 24h."
    },
    {
      question: "Làm sao để report bug trong game?",
      answer: "Chọn chủ đề 'Bug Report' trong form liên hệ, mô tả chi tiết lỗi, thiết bị bạn đang dùng và cách tái hiện lỗi để chúng tôi xử lý nhanh nhất."
    },
    {
      question: "Tôi có thể hoàn tiền không?",
      answer: "Chúng tôi có chính sách hoàn tiền trong 7 ngày với các điều kiện nhất định. Vui lòng liên hệ qua form để được hỗ trợ cụ thể."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />

      {/* Header Section */}
      <section className="relative bg-gradient-to-r from-purple-800 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Liên Hệ Với Chúng Tôi</h1>
          <p className="text-xl opacity-90">Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 bg-gray-900 text-white">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cột trái - Thông tin liên hệ */}
          <div className="lg:col-span-1">
            {/* 1. Thông tin liên hệ cơ bản */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-pink-400 mb-6 flex items-center">
                <span className="bg-pink-500 p-2 rounded-lg mr-3 text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                Thông Tin Liên Hệ
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="bg-green-500 p-2 rounded-lg text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-semibold text-gray-300">Email hỗ trợ</p>
                    <a href="mailto:support@gamecard.com" className="text-pink-400 hover:underline">
                      support@gamecard.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="bg-yellow-500 p-2 rounded-lg text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-semibold text-gray-300">Hotline</p>
                    <a href="tel:1900123456" className="text-pink-400 hover:underline">
                      1900 123 456
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="bg-red-500 p-2 rounded-lg text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-semibold text-gray-300">Địa chỉ</p>
                    <p className="text-gray-400">123 Đường Game Studio<br />Quận 1, TP. Hồ Chí Minh</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="bg-purple-500 p-2 rounded-lg text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-semibold text-gray-300">Giờ làm việc</p>
                    <p className="text-gray-400">24/7 - Hỗ trợ online</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Kênh cộng đồng */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
              <h2 className="text-2xl font-bold text-pink-400 mb-6 flex items-center">
                <span className="bg-purple-500 p-2 rounded-lg mr-3 text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </span>
                Kênh Cộng Đồng
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {communityLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${link.color} text-white p-4 rounded-lg text-center transition-all duration-300 transform hover:scale-105 shadow-lg border border-gray-600`}
                  >
                    <div className="flex justify-center mb-2">{link.icon}</div>
                    <div className="font-semibold">{link.name}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Cột phải - Form liên hệ và FAQ */}
          <div className="lg:col-span-2">
            {/* 2. Form liên hệ */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 mb-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-pink-400 mb-6 flex items-center">
                <span className="bg-green-500 p-2 rounded-lg mr-3 text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                Gửi Thắc Mắc / Góp Ý
              </h2>
              
              {submitted && (
                <div className="bg-green-800 border border-green-600 text-green-300 px-4 py-3 rounded-lg mb-6">
                  ✅ Cảm ơn bạn đã gửi liên hệ! Chúng tôi sẽ phản hồi trong vòng 24 giờ.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Họ và tên / Username *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-white"
                      placeholder="Nhập họ tên của bạn"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Email liên hệ *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-white"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Chủ đề *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-white"
                  >
                    <option value="">Chọn chủ đề</option>
                    <option value="Bug Report">🐛 Bug Report</option>
                    <option value="Account Issue">👤 Account Issue</option>
                    <option value="Payment Issue">💳 Payment Issue</option>
                    <option value="Feedback">💭 Feedback</option>
                    <option value="Other">❓ Khác</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Nội dung tin nhắn *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none text-white"
                    placeholder="Mô tả chi tiết vấn đề hoặc góp ý của bạn..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 px-6 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Gửi Tin Nhắn
                </button>
              </form>
            </div>

            {/* 4. FAQ */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-pink-400 mb-6 flex items-center">
                <span className="bg-yellow-500 p-2 rounded-lg mr-3 text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                FAQ - Câu Hỏi Thường Gặp
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-600 rounded-lg bg-gray-700">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full text-left p-4 hover:bg-gray-600 transition-colors flex justify-between items-center text-white"
                    >
                      <span className="font-semibold">{faq.question}</span>
                      <span className={`transform transition-transform ${openFaq === index ? 'rotate-180' : ''}`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </button>
                    {openFaq === index && (
                      <div className="p-4 border-t border-gray-600 bg-gray-800">
                        <p className="text-gray-300">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 5. Thông tin bản quyền & pháp lý */}
        <footer className="mt-16 bg-gray-800 text-white rounded-xl p-8 border border-gray-700">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="font-bold text-lg mb-4 text-pink-400">Công ty</h3>
              <p className="text-gray-300">Công ty TNHH GameCard Studio</p>
              <p className="text-gray-300">Mã số thuế: 0123456789</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-pink-400">Pháp lý</h3>
              <div className="space-y-2">
                <a href="/terms" className="block text-pink-400 hover:text-pink-300 transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Điều khoản dịch vụ
                </a>
                <a href="/privacy" className="block text-pink-400 hover:text-pink-300 transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Chính sách bảo mật
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-pink-400">Bản quyền</h3>
              <p className="text-gray-300">© 2025 GameCard Studio</p>
              <p className="text-gray-300">All rights reserved</p>
            </div>
          </div>
        </footer>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
