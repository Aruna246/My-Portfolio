import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { Mail, MapPin, Github, Linkedin, Send, CheckCircle2, Phone, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ContactSection: React.FC = () => {
  const { data, addMessage } = useCMS();
  const { profile } = data;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    setIsSubmitting(true);

    // Format WhatsApp message
    const rawPhone = profile.socials.phone ? profile.socials.phone.replace(/[^0-9]/g, '') : '919363649788';
    const whatsappText = encodeURIComponent(
      `Hello ${profile.name},\n\n` +
      `*Name:* ${formData.name.trim()}\n` +
      `*Email:* ${formData.email.trim()}\n` +
      (formData.subject.trim() ? `*Subject:* ${formData.subject.trim()}\n\n` : '\n') +
      `*Message:*\n${formData.message.trim()}`
    );

    const whatsappUrl = `https://wa.me/${rawPhone}?text=${whatsappText}`;

    setTimeout(() => {
      addMessage(formData);
      setIsSubmitting(false);
      setSubmitted(true);

      // Open WhatsApp chat in a new tab/window
      try {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      } catch (err) {
        window.location.href = whatsappUrl;
      }

      try {
        confetti({
          particleCount: 55,
          spread: 70,
          origin: { y: 0.8 }
        });
      } catch (err) {
        // Safe fallback
      }

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      setTimeout(() => {
        setSubmitted(false);
      }, 6000);
    }, 400);
  };

  return (
    <section id="contact" className="py-20 sm:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Tag */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-xs font-bold tracking-widest text-amber-800 uppercase shadow-2xs backdrop-blur-md">
            <Mail className="w-3.5 h-3.5 text-amber-700" />
            <span>GET IN TOUCH</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
              Let's connect & build{' '}
              <span className="text-amber-700">
                impactful software
              </span>
            </h2>
            <p className="text-base text-stone-600 leading-relaxed font-normal">
              Whether you have a Software Development opening, MERN Stack internship opportunity, or an exciting project idea, I'd love to hear from you.
            </p>

            <div className="space-y-4 pt-2">
              {profile.socials.phone && (
                <a
                  href={`tel:${profile.socials.phone}`}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white/85 backdrop-blur-md border border-[#E7E2D6] shadow-xs hover:border-amber-400 hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-700 shrink-0 group-hover:scale-110 group-hover:bg-amber-600 group-hover:text-white transition-all">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-400 block uppercase tracking-wider">
                      Phone Number
                    </span>
                    <span className="text-sm sm:text-base font-bold text-stone-800 group-hover:text-amber-700 transition-colors">
                      {profile.socials.phone}
                    </span>
                  </div>
                </a>
              )}

              <a
                href={`mailto:${profile.socials.email}`}
                className="flex items-center gap-4 p-5 rounded-2xl bg-white/85 backdrop-blur-md border border-[#E7E2D6] shadow-xs hover:border-amber-400 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-700 shrink-0 group-hover:scale-110 group-hover:bg-amber-600 group-hover:text-white transition-all">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-stone-400 block uppercase tracking-wider">
                    Direct Email
                  </span>
                  <span className="text-sm sm:text-base font-bold text-stone-800 group-hover:text-amber-700 transition-colors">
                    {profile.socials.email}
                  </span>
                </div>
              </a>

              {profile.socials.location && (
                <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/85 backdrop-blur-md border border-[#E7E2D6] shadow-xs">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-700 shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-400 block uppercase tracking-wider">
                      Location
                    </span>
                    <span className="text-sm sm:text-base font-bold text-stone-800">
                      {profile.socials.location}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {profile.socials.github && (
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white border border-[#E7E2D6] hover:border-amber-400 text-stone-700 hover:text-stone-900 transition-all shadow-xs hover:scale-105 font-bold text-xs"
                  title="GitHub Profile"
                >
                  <Github className="w-4 h-4 text-stone-700" />
                  <span>GitHub</span>
                </a>
              )}
              {profile.socials.linkedin && (
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white border border-[#E7E2D6] hover:border-amber-400 text-amber-800 hover:text-amber-900 transition-all shadow-xs hover:scale-105 font-bold text-xs"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4 text-amber-700" />
                  <span>LinkedIn</span>
                </a>
              )}
            </div>
          </div>

          {/* Right Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-7 sm:p-9 border border-[#E7E2D6] shadow-xl">
              <h3 className="text-2xl font-bold text-stone-900 mb-2">Send a Direct Message</h3>
              <p className="text-sm text-stone-500 mb-7 font-normal">
                Drop your message below and I will respond promptly to your email.
              </p>

              {submitted ? (
                <div className="p-7 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-in fade-in">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-lg font-bold text-emerald-800">Message Sent Successfully!</h4>
                  <p className="text-sm text-emerald-700 max-w-md mx-auto">
                    Thank you for reaching out! Your message has been safely delivered to my inbox.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                        Your Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 text-sm bg-[#FBF9F5] border border-[#E7E2D6] rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/25 focus:border-amber-500 focus:bg-white transition-all text-stone-800 placeholder-stone-400"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                        Your Email <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 text-sm bg-[#FBF9F5] border border-[#E7E2D6] rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/25 focus:border-amber-500 focus:bg-white transition-all text-stone-800 placeholder-stone-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 text-sm bg-[#FBF9F5] border border-[#E7E2D6] rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/25 focus:border-amber-500 focus:bg-white transition-all text-stone-800 placeholder-stone-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                      Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 text-sm bg-[#FBF9F5] border border-[#E7E2D6] rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/25 focus:border-amber-500 focus:bg-white transition-all text-stone-800 placeholder-stone-400 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-white font-bold bg-gradient-to-r from-amber-600 via-amber-500 to-orange-600 hover:from-amber-500 hover:to-orange-500 shadow-xl shadow-amber-600/25 active:scale-98 transition-all disabled:opacity-70 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
