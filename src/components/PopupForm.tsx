import React, { useState, useRef, useEffect } from "react";
import { api } from "../api";
import { useMutation } from "@tanstack/react-query";
import { IoClose } from "react-icons/io5";
import { AiOutlineLoading } from "react-icons/ai";
import { useTranslation } from "react-i18next";

interface PopupFormProps {
  closePopup: () => void;
}

const PopupForm: React.FC<PopupFormProps> = ({ closePopup }) => {
  const [formData, setFormData] = useState({
    username: "",
    gmail: "",
    comment: "",
    verification_code: "",
  });

  const { t } = useTranslation();

  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string>("");

  const verificationCodeRef = useRef<HTMLInputElement | null>(null);

  const sendContactForm = async (data: {
    username: string;
    gmail: string;
    comment: string;
  }) => {
    const response = await api.post("/contacts/", data);
    return response.data;
  };

  // Verify user code
  const verifyCode = async ({
    verification_code,
    gmail,
  }: {
    verification_code: string;
    gmail: string;
  }) => {
    try {
      const response = await api.post("/contacts/verify-email/", {
        gmail,
        verification_code,
      });

      if (response.data.message) {
        alert(t("verifycode.alertRight"));
        setIsCodeSent(true);
        setIsSending(false);
        closePopup();
        return response.data;
      } else {
        alert(t("verifycode.alertWrong"));
        setError(
          response.data.message || "Verification code is incorrect or expired."
        );
        setIsSending(false);
        return null;
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
      alert(t("verifycode.error"));
      setIsSending(false);
      return null;
    }
  };

  const mutation = useMutation({
    mutationFn: sendContactForm,
    onSuccess: () => {
      setFormData({
        username: "",
        gmail: "",
        comment: "",
        verification_code: "",
      });
      setIsSending(false);
      closePopup();
      alert("Form sent successfully!");
    },
    onError: (error: any) => {
      setError("There was an issue with the submission. Please try again.");
      setIsSending(false);
      console.log(error);
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.username || !formData.gmail || !formData.comment) {
      setError(t("verifycode.fillForms"));
      return;
    }

    setIsSending(true);

    if (!isCodeSent) {
      const result = await sendContactForm(formData);
      if (result) {
        setIsCodeSent(true);
        alert(t("verifycode.codeSent"));
        setIsSending(false);
      }
    } else {
      if (!formData.verification_code) {
        setError(t("verifycode.enterCode"));
        setIsSending(false);
        return;
      }

      const result = await verifyCode(formData);
      if (result && result.success) {
        mutation.mutate(formData);
      } else {
        setIsSending(false);
      }
    }
  };

  useEffect(() => {
    if (isCodeSent && verificationCodeRef.current) {
      verificationCodeRef.current.focus();
    }
  }, [isCodeSent]);
  return (
    <>
      {!isCodeSent && (
        <div className="fixed inset-0 flex items-center justify-center  font-jakarta bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[400px] relative">
            <IoClose
              onClick={closePopup}
              className="absolute top-3 right-3 text-xl text-gray-600 cursor-pointer"
            />
            <h3 className="text-xl font-semibold mb-4 text-black">
              {t("verifycode.formTitle")}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <input
                  type="text"
                  name="username"
                  placeholder={t("verifycode.name")}
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg border border-gray-300  text-black"
                />
                <input
                  type="email"
                  name="gmail"
                  placeholder={t("verifycode.gmail")}
                  value={formData.gmail}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg border border-gray-300 mb-4 text-black"
                />
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  placeholder={t("verifycode.comment")}
                  className="w-full p-3 rounded-lg border border-gray-300 mb-4 resize-none text-black"
                />
                {error && <p className="text-red-500">{error}</p>}{" "}
                {/* Error Message */}
                <button
                  type="submit"
                  disabled={isSending}
                  className={`w-full py-3 text-white rounded-lg flex items-center justify-center space-x-2 
                    ${
                      isSending
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600"
                    } 
                    transition-colors duration-200`}
                >
                  {isSending ? (
                    <>
                      <AiOutlineLoading className="animate-spin mr-2" />
                      <span>{t("verifycode.sending")}</span>
                    </>
                  ) : (
                    <span>{t("verifycode.send")}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isCodeSent && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[400px] relative">
            {/* Close icon */}
            <IoClose
              onClick={closePopup}
              className="absolute top-3 right-3 text-xl text-gray-600 cursor-pointer"
            />
            <h3 className="text-xl font-semibold mb-4 text-black">
              {t("verifycode.verificationTitle")}
            </h3>
            <input
              ref={verificationCodeRef} // Add ref for focusing
              type="text"
              name="verification_code"
              value={formData.verification_code}
              onChange={handleInputChange}
              placeholder="enter..."
              className="w-full p-3 rounded-lg border border-gray-300 mb-4 text-black"
            />
            <button
              onClick={handleSubmit}
              className="w-full py-3 bg-blue-500 text-white rounded-lg"
            >
              {t("verifycode.verifyButton")}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupForm;
