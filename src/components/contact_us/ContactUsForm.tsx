import { postSuggestion } from "@/lib/api/suggestions";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const ContactUsForm = () => {
  const { t } = useTranslation("contact");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await postSuggestion({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });

      toast.success(t("form.success"));
      setFormData({ name: "", email: "", message: "" });
    } catch (err: any) {
      toast.error(err?.message || t("form.error"));
    } finally {
      setLoading(false);
    }
  };

    return (
        <section className="container md:mt-14.5 mt-6 mb-12">
          <form
              onSubmit={handleSubmit}
              className="w-full h-full bg-[#F6F6F6] md:rounded-[44px] p-8"
            >
                <div>
                    <label className="text-[#0B0B0B] text-base font-semibold">
                        {t("form.name")}
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full h-14 border border-[#DEDDDD] rounded-4xl mt-3 px-4"
                        placeholder={t("form.name_placeholder")}
                    />
                </div>

                <div className="mt-6">
                    <label className="text-[#0B0B0B] text-base font-semibold">
                        {t("form.email")}
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full h-14 border border-[#DEDDDD] rounded-4xl mt-3 px-4"
                        placeholder={t("form.email_placeholder")}
                    />
                </div>

                <div className="mt-6">
                    <label className="text-[#0B0B0B] text-base font-semibold">
                        {t("form.message")}
                    </label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full h-44 border border-[#DEDDDD] rounded-4xl mt-3 px-4"
                        placeholder={t("form.message_placeholder")}
                    ></textarea>
                </div>

              {error && (
                <p className="mt-4 text-sm text-red-600">
                  {error}
                </p>
              )}

              {success && (
                <p className="mt-4 text-sm text-green-600">
                  {t("form.success")}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 bg-[#018884] rounded-4xl mt-6 text-[#FEFEFE] text-lg font-bold disabled:opacity-60"
              >
                {loading ? t("form.sending") : t("form.send")}
                </button>
            </form>
        </section>
    )
}

export default ContactUsForm
