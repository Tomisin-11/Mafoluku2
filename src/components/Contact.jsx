"use client";
import Map from "../pages/map";
import React, { useRef, useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaUser,
  FaStar,
  FaPen,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";

function Contactmain() {
  const form = useRef(null);
  const [mapLoading, setMapLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ type: "", message: "" });
  const [content, setContent] = useState(null);

  useEffect(() => {
    fetch("/api/content/contactPage")
      .then((res) => res.text()).then((t) => { if (!t||!t.trim()) throw new Error("empty"); return JSON.parse(t); })
      .then((data) => setContent(data))
      .catch((err) => console.error("Failed to load contact page content:", err));
  }, []);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast({ type: "", message: "" }), 4000);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_ta9eudo",
        "template_5m927yt",
        form.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log("EMAIL SENT:", result.text);
          setLoading(false);
          form.current.reset();
          showToast("success", content?.successMessage || "Message sent successfully!");
        },
        (error) => {
          console.error("EMAILJS ERROR:", error);
          setLoading(false);
          showToast(
            "error",
            content?.errorMessage || error?.text || "Failed to send message. Try again later."
          );
        }
      );
  };

  return (
    <>
      {/* HERO */}
    <section
        className="relative h-[150px] mt-25 bg-center bg-cover"
        style={{ backgroundImage: "url('/Versebg.webp')" }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 h-full px-8 md:px-16 flex items-center justify-between text-white">
          <h1 className="text-4xl md:text-5xl font-serif">{content?.heroTitle || "Events"}</h1>
          <div className="bg-black px-5 py-2 text-sm flex gap-2">
            <span className="text-gray-300">{content?.breadcrumbHome || "Home"}</span>
            <span className="text-gray-400">›</span>
            <span className="text-yellow-500">{content?.breadcrumbCurrent || "Events"}</span>
          </div>
        </div>
      </section>

      {/* MAP + INFO */}
           <Map/>

      {/* CONTACT FORM */}
      <section className="max-w-6xl mt-120 mx-auto mt-24 px-8 py-20    ">
        <div className="text-center mb-14">
          <p className="text-yellow-500 italic mb-2">{content?.sectionLabel || "Contact Us?"}</p>
          <h2 className="text-4xl font-serif text-blue-900">{content?.sectionHeading || "Get in Touch"}</h2>
          <div className="w-20 h-[2px] bg-yellow-500 mx-auto mt-4" />
        </div>

        <form ref={form} onSubmit={sendEmail} className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <input
                name="user_name"
                placeholder={content?.formNamePlaceholder || "Full Name*"}
                required
                className="w-full border border-gray-300 px-6 py-4 pr-12 text-sm
                focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200
                outline-none transition"
              />
              <FaUser className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <div className="relative">
              <input
                name="user_email"
                type="email"
                placeholder={content?.formEmailPlaceholder || "Email*"}
                required
                className="w-full border border-gray-300 px-6 py-4 pr-12 text-sm
                focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200
                outline-none transition"
              />
              <FaEnvelope className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <div className="relative">
              <input
                name="subject"
                placeholder={content?.formSubjectPlaceholder || "Subject"}
                className="w-full border border-gray-300 px-6 py-4 pr-12 text-sm
                focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200
                outline-none transition"
              />
              <FaStar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="relative">
            <textarea
              name="message"
              placeholder={content?.formMessagePlaceholder || "Message"}
              className="w-full h-48 border border-gray-300 px-6 py-4 pr-12 text-sm resize-none
              focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200
              outline-none transition"
            />
            <FaPen className="absolute right-4 top-5 text-gray-400" />
          </div>

          <div className="flex -mb-140 lg:-mb-110 justify-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#E3AF4E] text-white font-semibold px-14 py-4 rounded-full
              flex items-center gap-3 hover:bg-yellow-600 transition disabled:opacity-70"
            >
              {loading && (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {content?.submitButtonText || "SEND NOW!"}
            </button>
          </div>
        </form>
      </section>

      {/* TOAST */}
      {toast.message && (
        <div
          className={`fixed bottom-6  right-6 px-6 py-4 rounded shadow-lg text-white z-50
          ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
        >
          {toast.message}
        </div>
      )}
    </>
  );
}

export default Contactmain;
